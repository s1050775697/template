"use client";

import React, { useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import ProgressBarWrapper from "@/components/shared/ProgressBarWrapper";
import Button from "@/components/ui/Button";
import useQuizStore from "@/store/quiz.store";
import { APP_ROUTES } from "@/typescript/enum";
import Image from "next/image";
import Loader from "@/components/ui/Loader";

const QuizStep1Page = () => {
  const router = useRouter();
  const path = usePathname();

  const {
    quiz,
    quizStep,
    isLoading,
    saveQuizInformation,
    incrementQuizSep,
    toggleLoading,
  } = useQuizStore((state) => state);

  useLayoutEffect(() => {
    let interval = setInterval(() => {
      toggleLoading();
      clearInterval(interval);
    }, 1000);
  }, []);

  const quizSplittedPath: number = parseInt(path?.split("-")?.at(-1) as string);
  const currentQuiz = !isNaN(quizSplittedPath)
    ? quiz[quizSplittedPath - 1]
    : quiz?.[quizStep - 1];

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
        {currentQuiz?.question}
      </section>

      <section className="flex flex-row flex-wrap gap-4 justify-center max-w-[700px] mt-9">
        {currentQuiz?.options.map((opt) => (
          <div
            key={opt.id}
            className={`w-80 h-72 rounded-[30px] border-[1px] py-6 px-10 inline-flex justify-center flex-col items-center cursor-pointer transition-all hover:border-[#4B66E3] ${
              opt.selected
                ? "bg-[#4B66E3]/5 border-[#4B66E3]"
                : "bg-travel-gray border-travel-gray"
            }`}
            onClick={() => saveQuizInformation(currentQuiz.id, opt.id)}
          >
            <Image
              src={opt.svg}
              alt={opt.text}
              width={opt.width}
              height={opt.height}
            />
            <p className="mt-3 text-white text-lg text-center">{opt.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-9 pb-10">
        <Button
          className="bg-travel-black !text-primary border-[1px] border-primary inline-block align-middle py-[6px] w-[160px] mr-1 cursor-not-allowed"
          onClick={() => {}}
        >
          Back
        </Button>
        <Button
          className="bg-primary text-travel-black border-[1px] border-primary inline-block align-middle py-[6px] w-[160px] ml-1"
          onClick={() => {
            incrementQuizSep();
            router.push(APP_ROUTES.QUIZ_STEP_2);
          }}
        >
          Next
        </Button>
      </section>
    </aside>
  );
};

export default QuizStep1Page;
