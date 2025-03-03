"use client";

import React, { useEffect, useState } from "react";
import useAppStore from "@/store/app.store";
import Image from "next/image";
import BlurredTabs from "@/components/shared/BlurredTabs";
import Tabs from "@/components/shared/Tabs";
import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import FavCard from "@/components/shared/FavCard";
import useRestaurants from "@/hooks/useRestaurants";
import { TPlaces } from "@/types/maps";

const tabs = [
  { id: 1, name: "Itinerary" },
  { id: 2, name: "Calendar" },
  { id: 3, name: "Chat with AI" },
];
const days = [
  { id: 1, name: "Day 1" },
  { id: 2, name: "Day 2" },
  { id: 3, name: "Day 3" },
  { id: 4, name: "Day 4" },
];
const ReviewTrip = () => {
  const { onGetPlaces } = useRestaurants();
  const { isSidebarToggled } = useAppStore((state) => state);
  const [selectedDay, setSelectedDay] = useState(0);
  const [places, setPlaces] = useState<TPlaces[]>([]);

  useEffect(() => {
    const getPlaces = async () => {
      const responseArray = await onGetPlaces("restaurant");

      setPlaces(responseArray);
    };

    getPlaces();
  }, []);

  return (
    <aside
      // className={`inline-block align-top bg-travel-black h-full overflow-y-auto py-10 px-8 ${
      //   isSidebarToggled ? "w-[calc(100%-375px)]" : "w-[calc(100%-108px)]"
      // }`}

      className={`inline-block align-top bg-travel-black h-full relative overflow-y-auto py-10 px-8 w-full`}
    >
      <section className="relative">
        <div className="h-80 w-full overflow-hidden border-[1px] border-[#EAEAEC] rounded-3xl">
          <Image
            src="/svgs/travel-city-cover.svg"
            alt="Cover"
            width={0}
            height={0}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-black/10 backdrop-blur-[20px] w-[calc(100%-40px)] p-2 rounded-2xl h-[102px] absolute top-[20px] left-1/2 -translate-x-1/2 inline-flex items-center justify-center flex-col gap-1">
          <h2 className="text-white font-bold text-4xl m-0 p-0">
            Shanghai in 3 days Your Ultimate City Itinerary
          </h2>
          <small className="text-white font-bold text-lg">
            Your Ultimate City Itinerary
          </small>
        </div>

        <BlurredTabs tabs={["Shanghai", "3 days", "2 travelers", "Budget"]} />
        <div className="absolute bottom-9 left-10">
          <Tabs tabs={tabs} onChangeTab={(_) => {}} />
        </div>
      </section>

      <section className="mt-5 w-full flex justify-between items-center">
        <div className="inline-flex items-center gap-10">
          <h3 className="font-bold text-[32px] text-white">
            Itinerary for 3 days
          </h3>
          <ul className="bg-gray-500/20 backdrop-blur-[20px] p-2 rounded-full h-[54px] w-[380px] inline-flex items-center justify-around gap-1">
            {days.map((tab, i) => (
              <React.Fragment key={tab.id}>
                <div className="inline-flex items-center gap-1">
                  {selectedDay === tab.id && (
                    <Image
                      src="/svgs/check-yellow.svg"
                      alt="Checked"
                      width={24}
                      height={24}
                    />
                  )}
                  <li
                    className={`text-sm cursor-pointer font-bold ${
                      selectedDay === tab.id ? "text-primary" : "text-white"
                    }`}
                    onClick={() => setSelectedDay(tab.id)}
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
        </div>

        <div className="inline-flex items-center gap-4">
          <Button onClick={() => {}} className="bg-secondary text-white">
            Hide cards
          </Button>
          <span className="inline-flex items-center gap-3">
            <p className="text-white text-sm font-bold">Distances</p>
            <Switch />
          </span>
        </div>
      </section>

      <section className="mt-5 w-full flex items-center gap-2">
        <Image src="/svgs/flag.svg" alt="Flag" width={16} height={20} />
        <ul className="inline-flex items-center gap-1">
          <li className="text-primary text-lg">Plan my journey</li>
          <small className="text-white text-lg">/</small>
          <li className="text-white text-lg">City exploration - Shanghai</li>
        </ul>
      </section>

      <section className="mt-5 w-full flex items-center flex-col">
        {/* <span className="relative">
          <GoogleMaps />
        </span> */}
        {places?.length > 0 ? (
          <div className="w-full flex gap-4 flex-wrap">
            {places?.map((place) => (
              <FavCard key={place.id} {...place} />
            ))}
          </div>
        ) : (
          <p className="text-white">No places in the area</p>
        )}
      </section>
    </aside>
  );
};

export default ReviewTrip;
