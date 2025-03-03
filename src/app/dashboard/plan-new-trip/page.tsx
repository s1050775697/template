"use client";
import React, { useState } from "react";
import useAppStore from "@/store/app.store";
import Image from "next/image";
import Button from "@/components/ui/Button";

const PlanNewTripPage = () => {
  const { isSidebarToggled } = useAppStore((state) => state);

  return (
    <aside
      // className={`inline-block align-top bg-travel-black h-full relative overflow-y-auto py-10 px-8 ${
      //   isSidebarToggled ? "w-[calc(100%-375px)]" : "w-[calc(100%-108px)]"
      // }`}
      className={`inline-block align-top bg-travel-black h-full relative overflow-y-auto py-10 px-8 w-full`}
    >
      <h2 className="text-white font-bold text-[32px]">Plan a new trip</h2>
      <small className="text-travel-gray-3 font-normal text-lg">
        If you want to bring more details to your trip experience you can plan a
        new trip here.
      </small>

      <section className="flex items-center gap-10 mt-10">
        <div className="inline-flex items-center gap-3">
          <div className="inline-flex items-center">
            <Image
              src="/svgs/calendar.svg"
              width={24}
              height={24}
              alt="Calendar"
            />
            <small className="text-travel-gray-3 text-lg">From</small>
          </div>
          <input
            type="date"
            className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-36 px-2 appearance-none"
          />
          <small className="text-travel-gray-3 text-lg">to</small>
          <input
            type="date"
            className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-36 px-2"
          />
        </div>

        <div className="inline-flex items-center gap-2">
          <small className="text-travel-gray-3 text-lg">Travelers</small>
          <input
            type="number"
            className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-24 px-2 appearance-none"
          />
        </div>

        <div className="inline-flex items-center gap-3">
          <div className="inline-flex items-center">
            <Image
              src="/svgs/dollar.svg"
              width={24}
              height={24}
              alt="Calendar"
            />
            <small className="text-travel-gray-3 text-lg">From</small>
          </div>
          <span className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
              $
            </span>
            <input
              type="number"
              className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-24 pl-7 pr-2 appearance-none"
            />
          </span>
          <small className="text-travel-gray-3 text-lg">to</small>

          <span className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
              $
            </span>{" "}
            <input
              type="number"
              className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-24 pl-7 pr-2 appearance-none"
            />
          </span>
        </div>
      </section>

      <Button onClick={() => {}} className="bg-secondary text-white mt-10">
        Complete
      </Button>
    </aside>
  );
};

export default PlanNewTripPage;
