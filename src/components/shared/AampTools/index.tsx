/*
 * @Author: wyy
 * @Date: 2025-02-08 20:53:10
 * @LastEditTime: 2025-02-10 13:56:53
 * @FilePath: \travel-ai-main\src\components\shared\AampTools\index.tsx
 * @Description:
 */
import React from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { background } from "@chakra-ui/react";

const AmapTools = () => {
  const handleLikes = () => {
    // 处理 Likes 功能
    console.log("Likes clicked");
  };

  const handleFilters = () => {
    // 处理 Filters 功能
    console.log("Filters clicked");
  };

  const handleViewOnCalendar = () => {
    // 处理 View on Calendar 功能
    console.log("View on Calendar clicked");
  };

  return (
    <div className="w-full gap-4 absolute top-[57px] left-[465px] right-0 z-10">
      <section className="w-[200px] inline-flex items-center justify-between bg-gray-500/10 backdrop-blur-[20px] rounded-[50px] py-[14px] px-6 h-[82px]">
        <p className="text-white text-lg font-bold">Likes</p>

        <Button
          onClick={handleLikes}
          className="h-[54px] w-[54px] !p-0 flex items-center justify-center"
        >
          <Image src="/svgs/likes.svg" alt="Likes" width={24} height={24} />
        </Button>
      </section>

      <section className="w-[200px] inline-flex items-center justify-between bg-gray-500/10 backdrop-blur-[20px] rounded-[50px] py-[14px] px-6 h-[82px]">
        <p className="text-white text-lg font-bold">Filters</p>
        <Button
          onClick={handleFilters}
          className="h-[54px] w-[54px] !p-0 flex items-center justify-center"
        >
          <Image src="/svgs/filters.svg" alt="Filters" width={24} height={24} />
        </Button>
      </section>

      {/* <section className="w-[165px] inline-flex items-center cursor-pointer justify-between bg-[#d1f561] ml-2 rounded-[50px] py-[14px] px-6 h-[60px]">
        <div
          className="text-white font-bold text-sm"
          style={{ color: "black", textAlign: "center" }}
        >
          View on Calendar
        </div>
      </section> */}
    </div>
  );
};

export default AmapTools;
