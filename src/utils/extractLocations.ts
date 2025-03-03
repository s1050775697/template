import axios from 'axios';
import nlp from 'compromise';
import { cityArr, ICity } from '@/app/dashboard/favorites/config'

// 使用 compromise提取地点（地名和地标）
export function extractLocations(text: string): string[] {
  // 使用 compromise 处理文本
  const doc = nlp(text);

  // 提取地点（地名和地标）
  const places = doc.places().out('array') as string[];
  console.log("places: ", places);
  
  // 返回文本中找到的唯一地点
  return [...new Set(places)];
}

// 使用 compromise提取摘要
export function simpText(text: string): string {
  // 解析文本
  const doc = nlp(text);

  // 提取所有名词和动词
  let keyNouns = doc.nouns().out('array');
  let keyVerbs = doc.verbs().out('array');

  // 人称代词列表
  const pronouns = new Set([
    'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'me', 'him', 'her', 'us', 'them', 'my', 'your', 
    'his', 'hers', 'its', 'our', 'their', 'mine', 
    'yours', 'ours', 'theirs'
  ]);

  // 助动词列表
  const auxiliaryVerbs = new Set([
    'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did',
    'shall', 'will', 'should', 'would', 'may', 'might', 'must',
    'can', 'could'
  ]);

  // 过滤掉人称代词
  keyNouns = keyNouns.filter((word: string) => !pronouns.has(word.toLowerCase()));
  // 过滤掉助动词
  keyVerbs = keyVerbs.filter((word: string) => !auxiliaryVerbs.has(word.toLowerCase()));

  // 组合动词 + 重要名词，并去重
  const summaryWords = [...new Set([...keyVerbs, ...keyNouns])];

  // 返回最多 3 个关键词
  return summaryWords.slice(0, 2).join(' ');
}

// 获取gpt总结摘要
export const getOpenAIS = async (text: string) => {
  console.log("text: ", text);
  const apiKey = process.env.NEXT_PUBLIC_openai_api_key;

  if (!apiKey) {
    throw new Error('API key is missing');
  }

  try {
    const response = await axios.post(
      'https://api.openai-hk.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',  
        messages: [{"role": "user", "content": `Please help me summarize the summary of the following passage within 3 words: ${text}`}]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // 返回嵌入向量
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error getting embeddings:', error);
    throw new Error('Failed to fetch embeddings');
  }
};

// 获取gpt提取地点
export const getOpenAIEmbedding = async (text: string) => {
  console.log("text: ", text);
  const apiKey = process.env.NEXT_PUBLIC_openai_api_key;

  if (!apiKey) {
    throw new Error('API key is missing');
  }

  try {
    const response = await axios.post(
      'https://api.openai-hk.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',  
        messages: [{"role": "user", "content": `Please help me extract each location after '# # #' from the following paragraphs and answer in Chinese: ${text}`}]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const regex = /\d+\.\s(.+)/g;
    const locations = [];
    let match;
  
    // 逐个匹配地点
    while ((match = regex.exec(response.data.choices[0].message.content)) !== null) {
      const location = match[1].trim(); // 提取地点名称并去除多余空格
      locations.push(location);
    }

    console.log("locations: ", locations);

    // 返回嵌入向量
    return locations;
  } catch (error) {
    console.error('Error getting embeddings:', error);
    throw new Error('Failed to fetch embeddings');
  }
};

function amapSearch (name: string, longitude: number, latitude: number) {
  return new Promise((resolve, reject) => {
    if(typeof window === 'undefined')return
    var geocoder = new window.AMap.Geocoder();
    geocoder.getAddress([longitude, latitude], function (status: string, result: any) {
      if (status === "complete" && result.info === "OK") {
        var placeSearch = new window.AMap.PlaceSearch({
          extensions: 'all',
          lang: 'en',
          city: result.regeocode.addressComponent.citycode,
        });
        placeSearch.search(name, function (status: any, placeResult: any) {
          //查询成功时，result 即为对应的 POI 详情
          resolve(placeResult);
        });
      }
    });
  })
}

// 解析行程，获取地址名称和经纬度（无gpt版，可以处理经纬度）
export async function parseItinerary(text: string) {
  const regex = /###\s+(\d+)\.\s+([^\n]+)\s+.*?Location:.*?position=([0-9.-]+),([0-9.-]+)/gs;
  const locations = [];
  
  let match;
  const days = []
  const daysText = text.split(/## Day \d/gi);
  daysText.shift()
  for (const dayText of daysText) {
    while ((match = regex.exec(dayText)) !== null) {
      const index = parseInt(match[1], 10);
      const name = match[2].trim();
      const longitude = parseFloat(match[3]); // 经度是第一个数值
      const latitude = parseFloat(match[4]);  // 纬度是第二个数值
      const res:any = await amapSearch(name, longitude, latitude);
      let poiInfo: any
      if (res.info === 'OK') {
        poiInfo = res.poiList.pois[0];
        const city = cityArr.find((v: ICity) => poiInfo.cityname.includes(v.name))
        poiInfo.cityname = city?.pinyin || poiInfo.cityname
        // poiInfo.type = [...new Set(poiInfo.type.split(';'))].join(';')
      }

      locations.push({
        index,
        name,
        latitude,
        longitude,
        poiInfo
      });
    }
    days.push(locations);
  }

  return days;
}