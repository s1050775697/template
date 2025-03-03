"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useQuizStore from "@/store/quiz.store";
import { APP_ROUTES } from "@/typescript/enum";
import useAppStore from "@/store/app.store";
import Button from "@/components/ui/Button";
import PlanTrip from "@/components/shared/PlanTrip";
import useAuthStore from "@/store/auth.store";
import Image from "next/image";

const PlanJourneyPage = () => {
  const router = useRouter();
  const { isSidebarToggled, toggleSidebar } = useAppStore((state) => state);
  const { quiz } = useQuizStore((state) => state);
  const { user } = useAuthStore((state) => state);
  const [searchInput, setSearchInput] = useState("");

  useLayoutEffect(() => {
    const quizAnswered = quiz.every((q) =>
      q.options.some((opt) => opt.selected)
    );

    if (quizAnswered) toggleSidebar(true);
    // if (!quizAnswered && !user?.hasAnsweredQuiz) router.push(APP_ROUTES.DASHBOARD_TRAVEL_QUIZ);
  }, []);

  return (
    <aside
      // className={`inline-block align-top bg-travel-black h-full overflow-y-auto py-10 px-8 ${
      //   isSidebarToggled ? "w-[calc(100%-375px)]" : "w-[calc(100%-108px)]"
      // }`}

      className={`inline-block align-top bg-travel-black h-full overflow-y-auto py-10 px-8 w-full`}
    >
      {/* Route Header */}
      <section className="w-full flex items-center justify-between">
        <div className="inline-flex flex-col">
          {/* <h2 className="text-white text-3xl font-bold">
            Plans for your journey
          </h2>
          <p className="text-lg font-normal text-travel-gray-3">
            If you want to create another journey tap “Plan a new trip”. Or pass
            a Quiz for detailed experience.
          </p> */}
          <h2 className="text-white font-bold text-[32px]">Plan a new trip</h2>
          <small className="text-travel-gray-3 font-normal text-lg">
            If you want to bring more details to your trip experience you can
            plan a new trip here.
          </small>
        </div>

        <Button onClick={() => router.push(APP_ROUTES.QUIZ_STEP_1)}>
          Pass a Quiz
        </Button>
      </section>

      <PlanTrip />
    </aside>
  );
};

export default PlanJourneyPage;
