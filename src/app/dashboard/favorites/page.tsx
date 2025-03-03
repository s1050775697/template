"use client";
import React, { useEffect, useState, useRef } from "react";
import useAppStore from "@/store/app.store";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { TRestaurants } from "@/types/maps";
import FavCard from "@/components/shared/FavCard";
import { Select, Tag } from 'antd'
import PoiCard from "@/app/dashboard/review-map-with-ai/poiCard";
import './page.css'
import request from "@/utils/request";
import {cityArr, ICity} from "@/app/dashboard/favorites/config";
import {useRouter} from "next/navigation";

const days = [
  { id: 1, name: "All places" },
  { id: 2, name: "Accommodation" },
  { id: 3, name: "Food & Beverages" },
  { id: 5, name: "Shopping" },
  { id: 6, name: "Tourist Attraction" },
  { id: 7, name: "Transportation" },
];

const FavoritesPage = () => {
  const { isSidebarToggled } = useAppStore((state) => state);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedCity, setSelectedCity] = useState<string[]>([]);
  const [list, setList] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fetchAllFavourites = async ({ type, city }: any = {}) => {
    if (type === undefined) {
      type = selectedDay === 1 ? undefined : days.find(v => v.id === selectedDay)!.name;
    }
    if (type === 'All places') type = undefined
    const res = await request({
      url: '/favorite/query',
      method: 'get',
      params: {
        type,
        city: city ? city.toString() : undefined,
        keyword: inputRef.current?.value || '',
        page: 1,
        pageSize: 9999,
      }
    })
    setList(res.data);
  };

  const handleSelectDay = (tab: any) => {
    setSelectedDay(tab.id)
    fetchAllFavourites({ type: tab.name })
  }
  const handleSelectCity = (val: string) => {
    if (selectedCity.includes(val)) return
    const copyArr = [...selectedCity, val]
    setSelectedCity(copyArr)
    fetchAllFavourites({ city: copyArr });
  }

  const handleCloseCity = (city: string) => {
    const index = selectedCity.indexOf(city);
    selectedCity.splice(index, 1);
    setSelectedCity([...selectedCity]);
    fetchAllFavourites({ city: [...selectedCity] });
  }

  const onSearchKeyUp = (e: any) => {
    if (e.key === "Enter") {
      fetchAllFavourites()
    }
  }

  const gotodetail = (poi: any) => {
    router.push(`/dashboard/favorite-detail?poiId=${poi.poiId}`);
  }

  useEffect(() => {
    fetchAllFavourites();
  }, []);

  return (
    <aside
      // className={`inline-block align-top bg-travel-black h-full relative overflow-y-auto py-10 px-8 ${
      //   isSidebarToggled ? "w-[calc(100%-375px)]" : "w-[calc(100%-108px)]"
      // }`}

      className={`inline-block align-top bg-travel-black h-full relative overflow-y-auto py-10 px-8 w-full`}
    >
      <section className="w-full flex items-center justify-between">
        <div className="inline-flex items-center gap-4">
          {" "}
          <h2 className="text-white font-bold text-[32px]">Favorites</h2>
          <small className="text-travel-gray-3 font-normal text-lg">
            8 places <span className="text-white">.</span> 0 guides
          </small>
        </div>

        <div className="h-14 w-[330px] relative overflow-hidden rounded-[30px]">
          <input
            ref={inputRef}
            onKeyUp={onSearchKeyUp}
            type="text"
            placeholder="Search..."
            className="bg-travel-gray-2 placeholder:text-white text-white placeholder:text-bace text-base w-full h-full px-5"
          />
          <Image
            src="/svgs/magnifying.svg"
            alt="Search"
            width={24}
            height={24}
            className="absolute top-1/2 -translate-y-1/2 right-5"
          />
        </div>
      </section>

      <section className="flex items-center justify-between gap-10 mt-10">
        <ul className="bg-gray-500/20 backdrop-blur-[20px] p-2 px-4 rounded-full h-[54px] inline-flex items-center justify-around gap-4">
          {days.map((tab, i) => (
              <React.Fragment key={tab.id}>
                <div className="inline-flex items-center gap-1">
                  {/*{selectedDay === tab.id && (*/}
                  {/*  <Image*/}
                  {/*    src="/svgs/check-yellow.svg"*/}
                  {/*    alt="Checked"*/}
                  {/*    width={24}*/}
                  {/*    height={24}*/}
                  {/*  />*/}
                  {/*)}*/}
                  <li
                      className={`text-sm cursor-pointer font-bold ${
                          selectedDay === tab.id ? "text-primary" : "text-white"
                      }`}
                      onClick={() => handleSelectDay(tab)}
                  >
                    {tab.name}
                  </li>
                </div>
                {i < days.length - 1 && (
                    <div className="h-[90%] rounded-xl border-[0.5px] border-white border-opacity-30"></div>
                )}
              </React.Fragment>
          ))}
        </ul>

        <div className='city-select-wrap'>
          <div className='city-select-label'>City/cities</div>
          <div
              className="flex items-center h-14 w-[180px] text-white bg-travel-gray-2 relative overflow-hidden rounded-[30px]">
            <Select
                showSearch
                className='city-select'
                placeholder="Choose from your list"
                value='Choose from your list'
                variant="borderless"
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                onSelect={handleSelectCity}
                options={cityArr.map((v: ICity) => ({ label: v.pinyin, value: v.pinyin }))}
            />
          </div>
        </div>

        {/*<Button onClick={() => {*/}
        {/*}} className="bg-secondary text-white">*/}
        {/*  Filter*/}
        {/*</Button>*/}
      </section>

      <div className='mt-2'>
        {selectedCity.map((city: string) => (
            <Tag
                key={city}
                closable={true}
                onClose={() => handleCloseCity(city)}
            >
              {city}
            </Tag>
        ))}
      </div>

      <section className="mt-10 flex flex-wrap items-center justify-between gap-8">
        <div className="flex w-full flex-wrap gap-4">
          {Boolean(list.length) ? (
              <>{list.map(k => (
                  <div className='fav-poi-wrap' key={k.poiId} onClick={() => gotodetail(k)}>
                    <PoiCard isLike={true} data={k}/>
                  </div>
              ))}</>
          ) : (
              <p className="text-white text-center">Nothing to show here</p>
          )}
          {/* {restaurants?.length > 0 ? (
            restaurants.map((restaurant) => (
              <FavCard key={restaurant.id} {...restaurant} />
            ))
          ) : (
            <p className="text-white text-center">
              Nothing to show here
            </p>
          )} */}
        </div>
      </section>

      <Button onClick={() => {
      }} className="mt-20 ml-auto float-right">
        Generate itinerary
      </Button>
    </aside>
  );
};

export default FavoritesPage;
