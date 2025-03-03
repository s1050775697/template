"use client";

import { useRouter } from "next/navigation";
import BenefitCard from "@/components/shared/BenefitCard";
import Header from "@/components/shared/Header";
import Button from "@/components/ui/Button";
import { benefitCards } from "@/typescript/data";
import { APP_ROUTES } from "@/typescript/enum";
import { Divider, Image } from "@chakra-ui/react";
import CardSlider from "@/components/shared/CardSlider";
import Footer from "@/components/shared/Footer";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <main className="h-full overflow-y-auto bg-[#1F2227]">
        <section className="h-[600px] 992:h-[400px] w-full overflow-hidden relative bg-gradient-to-r from-[#1F2227] via-[#333] to-[#555]">
          <Header />
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              src="/landing-page-cover.jpeg"
              alt="Landing Page Cover Image"
              w="100%"
              className="object-contain z-40 absolute left-0 top-0 h-auto"
            />
            <div className="w-full h-[600px] 992:h-full bg-[#1F22274D]/30 relative z-[49]"></div>
            <aside className="w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex flex-col items-center justify-center z-50 max-w-[300px] mx-auto text-white">
              <h2 className="font-MM text-[88px] font-normal leading-[88px] mb-4">
                Lucia
              </h2>
              <p className="text-nowrap text-[40px] 992:text-xl font-bold leading-[64px]">
                Go Beyond, Forge Connections, Live the Moment
              </p>
              <p className="text-nowrap text-[24px] font-semibold leading-[24px] my-4">
                Light the way in China, with Lucia
              </p>
              <Button
                onClick={() => router.push(APP_ROUTES.PLAN_JOURNEY)}
                className="mt-2"
              >
                Start your China adventure{" "}
              </Button>
            </aside>
          </div>
        </section>

        {/* Section 2 */}
        <section className="w-full py-20 relative px-5">
          <h2 className="mb-[48px] text-center font-semibold text-[48px] leading-[48px] text-white">
            User Benefits
          </h2>
          <Image
            src="/shadow.png"
            w="50%"
            h="full"
            className="absolute"
            left={0}
          />
          <div className="flex items-center justify-center gap-5 768:flex-col">
            {benefitCards.map((card, cardIndex) => (
              <BenefitCard key={cardIndex} {...card} />
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="w-full py-20 relative">
          {/* Sub section 1 */}
          <h2 className="mb-[48px] text-center font-semibold text-[48px] leading-[48px] text-white px-5">
            Discover the Best of Your Destination{" "}
          </h2>
          <Image
            src="/shadow.png"
            w="50%"
            h="full"
            className="absolute"
            right={0}
            transform="rotateY(180deg)"
          />
          <div className="flex flex-col items-center justify-center gap-5 relative z-50 px-5">
            <Image src="/group_1.png" h="full" className="w-1/2 992:w-full" />
            <Divider mt={-5} w="60%" />
          </div>
          <span className="flex justify-center gap-12 mt-10 relative z-50 w-full px-5">
            <aside className="w-[60%] 1024:w-full flex 992:flex-col gap-5">
              <div className="inline-flex flex-col">
                <h4 className="text-white font-bold text-3xl mb-3">
                  Comprehensive
                  <br /> Local Data
                </h4>
                <p className="text-white text-lg font-normal">
                  Access the most detailed and authentic database of must-see
                  landmarks, local favorites, and hidden gems, covering food,
                  attractions, and cultural events.
                </p>
              </div>
              <div className="inline-flex flex-col">
                <h4 className="text-white font-bold text-3xl mb-3">
                  Explore
                  <br /> Nearby
                </h4>
                <p className="text-white text-lg font-normal">
                  Discover surprises around you during your trip, from charming
                  streets to unexpected local spots.
                </p>
              </div>
              <div className="inline-flex flex-col">
                <h4 className="text-white font-bold text-3xl mb-3">
                  Personalized
                  <br /> Recommendations
                </h4>
                <p className="text-white text-lg font-normal">
                  Lucia acts like a local friend, tailoring suggestions based on
                  your preferences to help you make the most of your limited
                  travel time.
                </p>
              </div>
            </aside>
          </span>
          {/* Sub section 2 */}
          <h2 className="mb-[48px] text-center font-semibold text-[48px] leading-[48px] text-white mt-48 relative z-50 px-5">
            Stress-Free Trip Planning{" "}
          </h2>
          <div className="flex flex-row items-center justify-center gap-5 relative z-50 1024:flex-col px-5">
            <Image src="/group_2.png" className="w-1/2 992:w-full" h="full" />
            <aside className="max-w-[340px] 1024:max-w-full 1024:flex 1024:flex-row gap-5">
              <div className="inline-flex flex-col mb-16 w-[90%]">
                <h4 className="text-white font-bold text-3xl mb-3">
                  All-in-One Booking
                </h4>
                <p className="text-white text-lg font-normal">
                  Simplify your travel with one-stop access to tickets,
                  accommodations, and other travel essentials—no more juggling
                  multiple platforms.
                </p>
              </div>
              <div className="inline-flex flex-col w-[90%]">
                <h4 className="text-white font-bold text-3xl mb-3">
                  Smart Itinerary Design
                </h4>
                <p className="text-white text-lg font-normal">
                  Whether it’s visa-free travel or multi-city adventures, Lucia
                  creates a seamless, well-optimized itinerary tailored to your
                  needs and preferences.
                </p>
              </div>
            </aside>
          </div>{" "}
          {/* Sub section 3 */}
          <h2 className="mb-[48px] text-center font-semibold text-[48px] leading-[48px] text-white mt-32 relative z-50 px-5">
            Dive Into China’s Rich Cultural Heritage{" "}
          </h2>
          <div className="flex flex-row items-center justify-center gap-5 relative z-50 1024:flex-col-reverse px-5">
            <aside className="max-w-[340px] 1024:max-w-full 1024:flex 1024:flex-row gap-5">
              <div className="inline-flex flex-col mb-16 w-[90%]">
                <h4 className="text-white font-bold text-3xl mb-3">
                  Interactive Cultural Insights
                </h4>
                <p className="text-white text-lg font-normal">
                  Engage with Lucia throughout your journey to uncover the
                  stories, traditions, and customs of China’s 54 ethnic groups
                  and its rich 5,000-year history.
                </p>
              </div>
              <div className="inline-flex flex-col w-[90%]">
                <h4 className="text-white font-bold text-3xl mb-3">
                  Immersive Experience{" "}
                </h4>
                <p className="text-white text-lg font-normal">
                  Learn about local festivals, historical landmarks, and
                  culinary traditions to create a meaningful connection with
                  this extraordinary civilization.
                </p>
              </div>
            </aside>
            <Image src="/group_3.png" className="w-1/2 992:w-full" h="full" />
          </div>{" "}
          {/* Sub section 4 */}
          <CardSlider />
          <aside className="w-full flex justify-center relative">
            <Image
              src="/shadow.png"
              w="50%"
              h="900px"
              className="absolute"
              right={0}
              bottom="-60px"
              transform="rotateY(180deg)"
            />
            <div className="mt-24 w-[60%] 992:w-full h-[260px] 768:h-36 bg-[#4B66E3]/20 border border-[#4B66E3] backdrop-blur-[70px] rounded-[40px] inline-flex items-center justify-between px-14 relative z-50 mx-5 768:flex-col 768:justify-center 768:gap-4">
              <h3 className="font-bold text-white text-5xl 768:text-xl">
                Start Your Adventure Now
              </h3>
              <Button onClick={() => {}}>Start exploring</Button>
            </div>
          </aside>
        </section>

        <aside className="w-full flex justify-center">
          <Footer />
        </aside>
      </main>
    </>
  );
}
