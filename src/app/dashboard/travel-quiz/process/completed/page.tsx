"use client";

import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import ProgressBarWrapper from "@/components/shared/ProgressBarWrapper";
import Button from "@/components/ui/Button";
import useQuizStore from "@/store/quiz.store";
import { APP_ROUTES } from "@/typescript/enum";
import Image from "next/image";
import Loader from "@/components/ui/Loader";

const CompletedQuizPage = () => {
  const router = useRouter();
  const { isLoading, toggleLoading } = useQuizStore((state) => state);

  useLayoutEffect(() => {
    let interval = setInterval(() => {
      toggleLoading();
      clearInterval(interval);
    }, 1000);
  }, []);

  if (isLoading)
    return (
      <aside className="flex h-full items-center justify-center flex-col py-10 mx-auto">
        <Loader />
      </aside>
    );

  return (
    <aside className="flex h-full items-center justify-start flex-col py-10 mx-auto">
      <ProgressBarWrapper />

      <section className="text-white font-normal text-2xl mt-20 max-w-[450px] text-center">
        <Image
          src="/quiz-completion.png"
          alt="Quiz Completed"
          width={480}
          height={320}
        />

        <p className="text-white text-2xl font-normal text-center">
          Congrats! You have finished the Quiz. Start the exploration now!
        </p>
      </section>

      <section className="mt-9 pb-10">
        <Button
          className="bg-primary text-travel-black border-[1px] border-primary inline-block align-middle py-[6px] w-[160px] ml-1"
          onClick={() => {
            router.push(APP_ROUTES.PLAN_JOURNEY);
          }}
        >
          Start!
        </Button>
      </section>
    </aside>
  );
};

export default CompletedQuizPage;
