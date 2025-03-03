import Image from "next/image";
import React, { FC, useState } from "react";

export type ITab = {
  id: number;
  name: string;
};

export type ITabs = {
  tabs: ITab[];
  onChangeTab: (tab: ITab) => void;
};

const Tabs: FC<ITabs> = ({ tabs, onChangeTab }) => {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <section className="mt-10 bg-secondary rounded-[30px] h-[54px] py-[6px] px-5 flex items-center justify-around w-max gap-4">
      {tabs.map((tab) => (
        <React.Fragment key={tab.id}>
          <div
            className={`inline-flex items-center gap-2 text-sm text-white cursor-pointer ${
              selectedTab === tab.id ? "font-bold w-40" : "font-normal w-32"
            }`}
            onClick={() => {
              setSelectedTab(tab.id);
              onChangeTab(tab);
            }}
          >
            {selectedTab === tab.id && (
              <Image
                src="/svgs/check.svg"
                alt="Checked"
                width={18}
                height={14}
              />
            )}
            <span>{tab.name}</span>
          </div>
          <div
            className={`border-[1px] h-[90%] border-white border-opacity-10 ${
              tab.id !== tabs.length ? "block" : "hidden"
            }`}
          ></div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default Tabs;
