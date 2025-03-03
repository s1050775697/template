"use client";

import React from "react";
import useAppStore from "@/store/app.store";
import Image from "next/image";
import BlurredTabs from "@/components/shared/BlurredTabs";
import Tabs from "@/components/shared/Tabs";
import Button from "@/components/ui/Button";
import Calendar from "@/components/shared/Calendar";

const tabs = [
  { id: 1, name: "Itinerary" },
  { id: 2, name: "Calendar" },
  { id: 3, name: "Chat with AI" },
];

const CalendarPage = () => {
  const { isSidebarToggled } = useAppStore((state) => state);

  return (
    <aside
      className={`inline-block align-top bg-travel-black h-full overflow-y-auto py-10 px-8 ${
        isSidebarToggled ? "w-[calc(100%-375px)]" : "w-[calc(100%-108px)]"
      }`}
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
          <h3 className="font-bold text-[32px] text-white">Calendar</h3>
        </div>

        <div className="inline-flex items-center gap-4">
          <Button
            onClick={() => {}}
            className="h-[54px] w-[54px] !p-0 flex items-center justify-center"
          >
            <Image
              src="/svgs/arrow-left.svg"
              alt="Left"
              width={16}
              height={8}
            />
          </Button>
          <Button
            onClick={() => {}}
            className="h-[54px] w-[54px] !p-0 flex items-center justify-center"
          >
            <Image
              src="/svgs/arrow-left.svg"
              alt="Left"
              width={16}
              height={8}
              className="rotate-180"
            />
          </Button>
        </div>
      </section>

      <section className="mt-5 w-full flex items-center gap-2">
        <Image src="/svgs/flag.svg" alt="Flag" width={16} height={20} />
        <ul className="inline-flex items-center gap-1">
          <li className="text-primary text-lg">Plan my journey</li>
          <small className="text-primary text-lg">/</small>
          <li className="text-primary text-lg">City exploration - Shanghai</li>
          <small className="text-white text-lg">/</small>
          <li className="text-white text-lg">Calendar</li>
        </ul>
      </section>

      <section className="mt-5 w-full flex items-center flex-col">
        <Calendar />
      </section>
    </aside>
  );
};

export default CalendarPage;
