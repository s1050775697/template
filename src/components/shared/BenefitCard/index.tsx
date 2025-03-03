import Image from "next/image";
import React, { FC } from "react";

type IBenefitCard = {
  icon: string;
  heading: string;
  sub: string;
  width: number;
};

const BenefitCard: FC<IBenefitCard> = ({ icon, heading, sub, width }) => {
  return (
    <aside className="inline-flex flex-col items-center bg-[#4B66E3]/20 border border-[#4B66E3] backdrop-blur-[70px] rounded-[60px] w-[370px] 1024:w-56 768:!w-full h-[500px] 1024:h-96 p-[40px] 1024:p-5">
      <Image
        src={`/svgs/${icon}`}
        width={width}
        height={160}
        alt={heading}
      />
      <h4 className="text-white text-[32px] 1024:text-xl 1024:leading-[20px] leading-[44px] font-bold py-[28px] 1024:py-5">
        {heading}
      </h4>
      <p className="text-white text-[18px] 1024:text-sm leading-[26px] font-normal">{sub}</p>
    </aside>
  );
};

export default BenefitCard;
