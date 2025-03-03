"use client";
import React from "react";
import useAppStore from "@/store/app.store";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/typescript/enum";

const TravelQuizPage = () => {
  const router = useRouter();
  const { isSidebarToggled } = useAppStore((state) => state);

  return (
    <aside
      // className={`inline-block align-top bg-travel-black h-full ${
      //   isSidebarToggled ? "w-[calc(100%-375px)]" : "w-[calc(100%-108px)]"
      // }`}

      className={`inline-block align-top bg-travel-black h-full w-full`}
    >
      <section className="flex justify-center h-full">
        <div className="max-w-[500px] h-full inline-flex flex-col justify-center items-center gap-8">
          <Image
            src="/start-quiz.png"
            alt="Start Quiz"
            width={320}
            height={320}
          />
          <p className="text-white text-xl font-normal text-center">
            A short travel quiz to help you maximaze your travel experience in
            China
          </p>

          <div>
            <Button
              className="bg-primary text-travel-black border-[1px] border-primary inline-block align-middle py-[6px] w-[160px] mr-1"
              onClick={() => router.push(APP_ROUTES.QUIZ_STEP_1)}
            >
              Start
            </Button>
            <Button
              className="bg-travel-black !text-primary border-[1px] border-primary inline-block align-middle py-[6px] w-[160px] ml-1"
              onClick={() => {}}
            >
              Skip for now
            </Button>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default TravelQuizPage;
