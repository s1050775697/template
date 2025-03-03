import React, { FC, useEffect, useState } from "react";

type ICalendar = {
  numberOfDays?: number;
};

type ICalendarDates = {
  name: string;
  times: string[];
};

const Calendar: FC<ICalendar> = ({ numberOfDays = 5 }) => {
  const [dates, setDates] = useState<ICalendarDates[]>([]);
  const [selectedDate, setSelectedDay] = useState<string>("");
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  useEffect(() => {
    generateFutureDates();
  }, []);

  const generateFutureDates = () => {
    const timeSlots: string[] = [];
    for (let hour = 0; hour <= 24; hour++) {
      const period = hour < 12 ? "am" : "pm";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      timeSlots.push(`${formattedHour} ${period}`);
    }
    for (let i = 0; i < numberOfDays; i++) {
      if (i === 0) {
        setSelectedDay(`Day ${i + 1}`);
        setSelectedDates(timeSlots);
      }
      setDates((p) => [...p, { name: `Day ${i + 1}`, times: timeSlots }]);
    }
  };

  const getCurrentGMT = (): string => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const hoursOffset = Math.abs(offset) / 60;
    const sign = offset > 0 ? "-" : "+";

    return `GMT ${sign}${hoursOffset}`;
  };

  return (
    <aside className="w-full">
      <section className="flex w-full items-center justify-between gap-5">
        <p className="text-white text-lg font-normal w-20">{getCurrentGMT()}</p>
        <ul className="overflow-x-auto whitespace-nowrap w-[calc(100% - 100px)] scrollbar-hide">
          {dates.map((d) => (
            <li
              className={`inline-block align-top mr-3 cursor-pointer border-[1px] backdrop-blur-[20px] py-[14px] px-6 rounded-[30px] h-[54px] w-[240px] text-white transition-all last:mr-0 ${
                selectedDate === d.name
                  ? "bg-secondary border-secondary"
                  : "bg-transparent border-secondary/10"
              }`}
              onClick={() => setSelectedDay(d.name)}
            >
              {d.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[50px] w-full mt-5 bg-gray-50/10 py-5 px-6 overflow-y-auto max-h-[600px] scrollbar-hide">
          {selectedDates.map((time, i) => (
            <div className="w-full inline-flex items-end h-16 gap-5">
              <p className="text-white text-base w-[50px]">{time}</p>
              <div
                className={`w-[calc(100%-70px)] h-full border-t-[1px] border-b-[1px] border-t-[#404348] border-b-[#404348] ${
                  i === 0
                    ? "border-t-0"
                    : i === selectedDates.length - 1
                    ? "border-b-0"
                    : ""
                }`}
              ></div>
            </div>
          ))}
      </section>
    </aside>
  );
};

export default Calendar;
