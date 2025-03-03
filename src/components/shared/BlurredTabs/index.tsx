import React, { FC } from "react";

type IBlurredTabs = {
  tabs: string[];
};

const BlurredTabs: FC<IBlurredTabs> = ({ tabs }) => {
  return (
    <ul className="bg-gray-500/20 backdrop-blur-[20px] p-2 rounded-full h-[60px] w-[380px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-around gap-1">
      {tabs.map((tab, i: number) => (
        <React.Fragment key={tab}>
          <li key={tab} className="text-sm font-bold text-white">
            {tab}
          </li>
          {i < tabs.length - 1 && (
            <div className="h-[90%] rounded-xl border-[0.5px] border-white border-opacity-30"></div>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default BlurredTabs;
