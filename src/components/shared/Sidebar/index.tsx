"use client";
import React, { useState } from "react";
import useAppStore from "@/store/app.store";
import { usePathname, useRouter } from "next/navigation";
import { APP_ROUTES } from "@/typescript/enum";
import FlagIcon from "@/components/svgs/FlagIcon";
import HeartIcon from "@/components/svgs/HeartIcon";
import UserIcon from "@/components/svgs/UserIcon";
import ChevronLeft from "@/components/svgs/ChevronLeft";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const path = usePathname() as APP_ROUTES;
  const router = useRouter();
  const menuItems = [
    {
      route: APP_ROUTES.PLAN_JOURNEY,
      alternateRoutes: [APP_ROUTES.DASHBOARD_TRAVEL_QUIZ],
      icon: <FlagIcon />,
      title: "Plan my journey",
      description:
        "Create your personalized itineraries with tailored suggestions",
    },
    {
      route: APP_ROUTES.FAVORITES,
      icon: <HeartIcon />,
      title: "Likes",
      description:
        "View your favorite places and get trip advice based on them",
    },
    {
      route: APP_ROUTES.ACCOUNT,
      icon: <UserIcon />,
      title: "Account",
      description: "Make private settings and customizations of your account",
    },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <nav
      className={`inline-block align-top h-full bg-travel-gray pt-10 transition-all duration-300 ${
        isCollapsed ? "w-[108px]" : "w-[375px]"
      }`}
    >
      <aside className="w-full h-full inline-flex flex-col items-center justify-start gap-24">
        <div className="w-full flex justify-between items-center px-6">
          <h4
            className={`text-white text-[18px] leading-[24.5px] font-bold whitespace-nowrap`}
          >
            {isCollapsed ? 'AI' : 'AI Travel China'}
          </h4>
          <button
            onClick={toggleCollapse}
            className="p-2 hover:bg-travel-gray-2 rounded-full transition-colors"
          >
            <ChevronLeft
              className={`transform ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <ul className="inline-flex flex-col items-center gap-6 w-full">
          {menuItems.map((item, index) => {
            const isActive =
              path === item.route ||
              (item.alternateRoutes && item.alternateRoutes.includes(path));

            return (
              <li
                key={index}
                className="flex flex-row items-start gap-5 cursor-pointer px-5 transition-all hover:scale-105"
                onClick={() => router.push(item.route)}
              >
                <div
                  className={`cursor-pointer rounded-full w-[76px] h-[76px] py-1 px-4 inline-flex items-center justify-center transition-all active:scale-90 ${
                    isActive ? "bg-primary" : "bg-travel-gray-2"
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    color: isActive ? "#1F2227" : "#fff",
                  })}
                </div>
                <div
                  className={`w-[calc(100%-110px)] ${
                    isCollapsed ? "hidden" : "inline-flex flex-col gap-2"
                  }`}
                >
                  <h5
                    className={`${
                      isActive ? "text-primary" : "text-white"
                    } text-sm font-bold`}
                  >
                    {item.title}
                  </h5>
                  <p
                    className={`${
                      isActive ? "text-white" : "text-travel-gray-3"
                    } text-sm font-medium`}
                  >
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
    </nav>
  );
};

export default Sidebar;
