'use client'
import {useEffect, useImperativeHandle, useRef} from "react";
// import AMapLoader from "@amap/amap-jsapi-loader";
import axios from "axios";
import IconRestaurant from './icons/restaurant.svg'
import IconTennis from './icons/tennis.svg'
import IconMuseum from './icons/museum.svg'
import IconSuitcase from './icons/suitcase.svg'
import IconAttraction from './icons/attraction.svg'
import IconAquarium from './icons/aquarium.svg'
import IconMarker from './icons/marker.svg'
import IconCar from './icons/car.svg'
import IconBus from './icons/bus.svg'

const apiKey = process.env.NEXT_PUBLIC_gaode_api_key as string;
let savePoiList: any[] = []
const typeCodes = [
  '050000', // 餐饮
  '080100', // 运动场馆
  '140000', // 文化
  '061000', // 商业
  '110000', // 风景
  '190205', // 湖泊
  '190300', // 交通
  '190100', // 地名
  '150500', // 地铁站
]
const iconMap: any = {
    '050000': {
        icon: IconRestaurant,
        color: '#bb893d',
    },
    '080100': {
        icon: IconTennis,
        color: '#1c5a9f',
    },
    '140000': {
        icon: IconMuseum,
        color: '#1c5a9f',
    },
    '061000': {
        icon: IconSuitcase,
        color: '#bb40ce',
    },
    '110000': {
        icon: IconAttraction,
        color: '#50c960',
    },
    '190205': {
        color: '#50c960',
        icon: IconAquarium,
    },
    '190300': {
        icon: IconCar,
    },
    '190100': {
        icon: IconMarker,
    },
    '150500': {
        color: '#c9505e',
        icon: IconBus,
    },
}

function getParentTypecode (code: string): string {
    let result = ''
    let minus = 999999
    typeCodes.forEach((v: string) => {
        let f = Math.abs((+code - +v))
        if (f < minus) {
            result = v
            minus = f
        }
    })
    return result
}

export default function MapContainer({ ref, makerClick }: any) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const getNearby = async (center: string) => {
        const parameters = new URLSearchParams();
        parameters.set('key', '5e0cd259f47c87ee86739a08aeeea1fd')
        parameters.set('language', 'en')
        parameters.set('location', center)
        parameters.set('types', typeCodes.join('|'))
        parameters.set('radius', '3000')
        parameters.set('pageSize', '25')
        parameters.set('show_fields', 'business,indoor,navi,photos')
        const res = await axios.get('https://restapi.amap.com/v5/place/around?' + parameters)
        return res.data
    }

    const initMakers = async () => {
        if(typeof window === 'undefined')return
        const {lng, lat} = mapInstance.current.getCenter();
        const nearByPoi: any = await getNearby(lng + ',' + lat);
        nearByPoi.pois.forEach((poi: any) => {
            const finalType = getParentTypecode(poi.typecode.slice(0, 6))
            const typeData = iconMap[finalType]
            const marker = new window.AMap.Marker({
                content: `<div class="basic-poi" style="color: ${typeData.color || '#fff'};border-color: ${typeData.color || '#fff'}">
                    <img src=${typeData.icon.src} />
                    <span>${poi.name}</span>
                </div>`, //自定义点标记覆盖物内容
                position: poi.location.split(','),
                offset: new window.AMap.Pixel(-13, -40),
                extData: poi
            });
            mapInstance.current.add(marker);
            marker.on("click", (e: any) => {
                console.log(e)
                const activeItem = document.querySelector('.basic-poi.active')
                if (activeItem) {
                    activeItem.classList.remove('active')
                }
                e.target.dom.children[0].classList.add('active')
                makerClick && makerClick(e.target._opts.extData)
            });
        })
    }
    const initAMap = (AMap:any)=>{
        mapInstance.current = new AMap.Map("aaContainer", {
            zoom: 16, // 初始化地图级别
            features: ['bg', 'point'],
            mapStyle: 'amap://styles/dark'
        });

        var bounds = new AMap.Bounds(
          [73.66, 3.86], // 西南角坐标
          [135.05, 53.55] // 东北角坐标
        );
        mapInstance.current.setLimitBounds(bounds);
        mapInstance.current.on('moveend', () => {
            console.log('moveend');
            const zoom = mapInstance.current.getZoom()
            if (zoom > 15) {
                mapInstance.current.clearMap()
                initMakers()
            } else {
                mapInstance.current.clearMap()
                savePoiList.forEach((pos: any) => {
                    formatMarker(pos.location.split(',').map(Number), pos)
                })
            }
        });
    }
    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            import('@amap/amap-jsapi-loader').then((res) => {
                const AMapLoader = res.default
                AMapLoader.load({
                    key: '0b213b6cb6db97e5b8fb2d3809f5e8c8', // 申请好的Web端开发者Key，首次调用 load 时必填
                    version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    plugins: ['AMap.PlaceSearch', 'AMap.Geocoder'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                })
                  .then((AMap) => {
                    initAMap(AMap)
                  })
                  .catch((e) => {
                      if(typeof window !== 'undefined') {
                        initAMap(window.AMap)
                      }
                  });
            })
        }

        return () => {
            mapInstance.current?.destroy();
        };
    }, [mapRef]);

    const formatMarker = (position: number[], poiInfo: any) => {
        const img = poiInfo?.photos?.length ? poiInfo.photos[0].url : "";
        const content = img ? `<div class="water-drop" title="${poiInfo.name}">
  <div class="water-drop-img">
    <img src="${img}" />
  </div>
  <div class="water-drop-dot"></div>
</div>` : null;
        const marker = new window.AMap.Marker({
            content: content, //自定义点标记覆盖物内容
            position, // [116.397428, 39.90923], //基点位置
            offset: new window.AMap.Pixel(-13, -60), //相对于基点的偏移位置
            extData: poiInfo
        });
        mapInstance.current.add(marker);
        marker.on("click", (e: any) => {
            console.log(e.target._opts.extData)
            makerClick(e.target._opts.extData)
        });
    }

    const jumpToLocation = async (locations: any[], address: string) => {
        if (!locations.length) return
        // const location = await fetchLocationByName(locations[0].name);
        mapInstance.current.setCenter([locations[0].longitude, locations[0].latitude]);
        savePoiList = locations.map((v: any) => v.poiInfo)
        locations.forEach((location: any) => {
            formatMarker([location.longitude, location.latitude], location.poiInfo);
        })
    };

    const createNearbyMarks = (posList: any[], center?: string) => {
        center && mapInstance.current.setCenter(center.split(',').map(Number));
        if (!posList.length) return
        savePoiList = [...posList]
        posList.forEach((pos: any) => {
            formatMarker(pos.location.split(',').map(Number), pos)
        })
    }

    useImperativeHandle(ref, () => ({
        jumpToLocation,
        createNearbyMarks,
    }));

    return (
        <div
          ref={mapRef}
            id="aaContainer"
            style={{ height: "100%", width: "100%" }}
        ></div>
    );
}
