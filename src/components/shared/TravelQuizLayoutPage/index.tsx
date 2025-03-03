"use client";
import useAppStore from "@/store/app.store";
import React, { ReactNode } from "react";

const TravelQuizLayoutPage = (props: { children: ReactNode }) => {
  const { children } = props;
  const { isSidebarToggled } = useAppStore((state) => state);

  return (
    <aside
      className={`inline-block align-top bg-travel-black h-full overflow-y-auto ${
        isSidebarToggled ? "w-[calc(100%-375px)]" : "w-[calc(100%-108px)]"
      }`}
    >
      {children}
    </aside>
  );
};

export default TravelQuizLayoutPage;
