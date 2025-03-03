import React, { FC } from "react";

type IProgress = {
  step: number;
  totalSteps: number;
};

const Progress: FC<IProgress> = ({ step, totalSteps }) => {
  const totalItems = Array.from({ length: totalSteps }, (_, i) => i + 1);
  return (
    <section className="max-w-[500px]">
      {totalItems.map((_) => (
        <div
          key={_}
          className={`h-1 w-28 rounded-[10px] inline-block align-middle mr-1 last:mr-0 ${
            _ > step
              ? "bg-travel-gray-2"
              : _ === step
              ? "bg-primary"
              : "bg-secondary"
          }`}
        ></div>
      ))}
    </section>
  );
};

export default Progress;
