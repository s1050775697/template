"use client";
import React, {useEffect, useRef, useState} from 'react';
import './detail.scss'
import axios from "axios";
import dynamic from 'next/dynamic'

import MyAmap from '@/components/shared/Aamp/myAmap'
import HeartIconFilled from "@/components/svgs/HeartIconFilled";
import HeartIcon from "@/components/svgs/HeartIcon";
import request from '@/utils/request'
import Image from "next/image";
import {TeamOutlined} from "@ant-design/icons";
import {StarIcon} from "@chakra-ui/icons";
import dayjs from "dayjs";
import { GET_ITEM } from '@/utils/storage'

let t = {
  "name": "雷峰塔景区",
  "id": "B023B09LKR",
  "location": "120.148849,30.230934",
  "type": "风景名胜;风景名胜;国家级景点",
  "typecode": "110202",
  "pname": "浙江省",
  "cityname": "杭州市",
  "adname": "西湖区",
  "address": "南山路15号",
  "pcode": "330000",
  "citycode": "0571",
  "adcode": "330106",
  "business": {
    "business_area": "西湖",
    "tel": "0571-87982111",
    "tag": "素食,湖南面,西湖醋鱼,红叶,龙井虾仁",
    "rectag": "白娘子的囚禁之所",
    "keytag": "4A景区",
    "rating": "4.8",
    "cost": "40.00",
    "alias": "杭州西湖雷峰塔|西关砖塔|西湖雷峰塔|雷峰塔",
    "opentime_today": "08:00-17:30 08:00-19:00 08:00-20:00 08:00-17:30 08:00-19:00",
    "opentime_week": "11/1-3/15 08:00-17:30开放；3/16-4/30 08:00-19:00开放；5/1-10/31 08:00-20:00开放 11-01至03-15 周一至周日 08:00-17:30；03-16至04-30 周一至周日 08:00-19:00"
  },
  "indoor": {
    "indoor_map": "0"
  },
  "navi": {
    "navi_poiid": "H51F022002_182",
    "entr_location": "120.150574,30.229887",
    "gridcode": "4520217122"
  },
  "photos": [
    {
      "title": "",
      "url": "http://store.is.autonavi.com/showpic/58fbc3bf5460862ef2056ae1aa053754"
    },
    {
      "title": "雷峰塔",
      "url": "http://store.is.autonavi.com/showpic/df5fc383b00d7a4ac2948df8abbb9094"
    },
    {
      "title": "",
      "url": "http://store.is.autonavi.com/showpic/066347d344b0cb6c8c5e305627524037"
    }
  ],
  "distance": "",
  "parent": "B023B13L9M",
  "updateflag": "0"
}

const FavoriteDetail = () => {
  const startDateRef = useRef<any>(null);
  const endDateRef = useRef<any>(null);
  const amapRef = useRef<any>(null);
  const [isLike, setIsLike] = useState(true);
  const [overviewTab, setOverviewTab] = useState(1);
  const [d, setD] = useState<any>(null);
  const [googleData, setGoogleData] = useState<any>({});

  const getPoiInfo = async () => {
    const poiId = new URLSearchParams(location.search).get('poiId') as string;
    const parameters = new URLSearchParams();
    parameters.set('key', '5e0cd259f47c87ee86739a08aeeea1fd')
    parameters.set('language', 'en')
    parameters.set('id', poiId)
    parameters.set('show_fields', 'business,indoor,navi,photos')
    const res = await axios.get('https://restapi.amap.com/v5/place/detail?' + parameters)
    const poi = res.data.pois[0]
    setD(poi);
    findPlaceFromQuery(poi.name)
    setTimeout(() => getNearby(poi), 200)
  }

  const findPlaceFromQuery = async (textQuery: string) => {
    const res = await axios.post('https://places.googleapis.com/v1/places:searchText', {
      textQuery,
      languageCode: 'en'
    }, {
      headers: {
        'X-Goog-FieldMask': '*',
        'X-Goog-Api-Key': 'AIzaSyDKwMuXyy5GgAfb7ruHrbqAG5NwBnH5bF4'
      }
    })
    if (!res.data?.places?.length) return
    setGoogleData(res.data.places[0])
  }

  const getGooDetail = async () => {
    const res = await axios({
      url: 'https://places.googleapis.com/v1/places/ChIJNbvq9xtkSzQRL26HFDUVqm4',
      method: 'get',
      headers: {
        'X-Goog-FieldMask': 'id,displayName,reviews,editorialSummary',
        'X-Goog-Api-Key': 'AIzaSyDKwMuXyy5GgAfb7ruHrbqAG5NwBnH5bF4'
      }
    })
  }

  const onLike = async () => {
    let token = GET_ITEM("token") as string;
    if (token.startsWith('"')) {
      token = JSON.parse(token);
    }
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/favorite/create`, {
      poiInfo: d
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is correct
      },
    });
    setIsLike(true);
  }

  const onDislike = async () => {
    let token = GET_ITEM("token") as string;
    if (token.startsWith('"')) {
      token = JSON.parse(token);
    }
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/favorite/delete`, {
      poiId: d.id
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is correct
      },
    });
    setIsLike(false);
  }

  const getLikeStatus = async () => {
    const poiId = new URLSearchParams(location.search).get('poiId');
    const res = await request({
      url: '/favorite/status',
      method: 'post',
      data: { poiId }
    })
    setIsLike(res.data);
  }
  
  const getNearby = async (poi: any) => {
    const parameters = new URLSearchParams();
    parameters.set('key', '5e0cd259f47c87ee86739a08aeeea1fd')
    parameters.set('language', 'en')
    parameters.set('location', poi.location)
    parameters.set('types', poi.typecode)
    parameters.set('radius', '3000')
    parameters.set('show_fields', 'business,indoor,navi,photos')
    const res = await axios.get('https://restapi.amap.com/v5/place/around?' + parameters)
    amapRef.current.createNearbyMarks(res.data.pois, poi.location)
  }

  const bookTrip = () => {
    if(typeof window === 'undefined')return
    if (!startDateRef.current.value || !endDateRef.current.value) return
    window.open(`https://ctrip.com/?checkin=${startDateRef.current.value}&checkout=${endDateRef.current.value}`, '_blank');
  }

  useEffect(() => {
    getLikeStatus()
    getPoiInfo()
  }, []);

  if (!d) return null;

  return (
    <div className="favorite-detail">
      <h2>
        {d.name}
        <div className='love'>
          {isLike ? <HeartIconFilled color='#e71962' onClick={onDislike}/> :
            <HeartIcon color='#e71962' onClick={onLike}/>}
        </div>
      </h2>
      <h3 className='poi-city'>{d.cityname}</h3>
      <h4 className='poi-type'>{d.type}</h4>
      <div className="imgs">
        {d.photos.map((v: any, i: number) => (
          <img src={v.url} key={i} />
        ))}
      </div>
      <div className="infp">
        <div className="overview">
          <div className="overview-tabs">
            <div onClick={() => setOverviewTab(1)} className={`tab ${overviewTab === 1 ? 'active' : ''}`}>Overview</div>
            <div onClick={() => setOverviewTab(2)} className={`tab ${overviewTab === 2 ? 'active' : ''}`}>Reviews</div>
          </div>
          {overviewTab === 1 && (
            <div className="overview-detail">{googleData.editorialSummary?.text}</div>
          )}
          {overviewTab === 2 && Boolean(googleData.reviews?.length) && (
            <div className="overview-detail">
              {googleData.reviews.map((v: any, i: number) => (
                <div className="comment">
                  <div className="comment-title">
                    <div className="time">{dayjs(v.publishTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                    <div className="star">
                      <StarIcon color="#d1f561"/>
                      <span>{v.rating}</span>
                    </div>
                  </div>
                  <div className="comment-content">{v.text.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="address">
          <div className="address-title">Address</div>
          <p>{d.cityname} {d.adname} {d.address}</p>
        </div>
        <div className="book">
          <div className="flex mb-2 gap-2">
            <div className="inline-flex items-center flex-1">
              <Image
                src="/svgs/calendar.svg"
                width={24}
                height={24}
                alt="Calendar"
              />
              <small className="text-lg">From</small>
            </div>
            <div className="inline-flex items-center flex-1">
              <Image
                src="/svgs/calendar.svg"
                width={24}
                height={24}
                alt="Calendar"
              />
              <small className="text-lg">Till</small>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              ref={startDateRef}
              type="date"
              className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-36 px-2 appearance-none"
            />
            <input
              ref={endDateRef}
              type="date"
              className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-36 px-2 appearance-none"
            />
          </div>
          <div className="mt-2 mb-4">
            <div className="flex gap-1 mb-2">
              <TeamOutlined style={{ color: '#8e8e8e', fontSize: 18 }} />
              <span>People:</span>
            </div>
            <input type="number"
                   className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-full px-2 appearance-none"
            />
          </div>
          <button
            onClick={bookTrip}
            className="border-[1px] border-primary bg-travel-gray-2 rounded-[30px] text-primary text-base font-bold h-12 w-full px-2 appearance-none"
          >Added</button>
        </div>
      </div>
      <div className='map-area'>
        <MyAmap ref={amapRef}/>
      </div>
    </div>
  );
}

export default FavoriteDetail;