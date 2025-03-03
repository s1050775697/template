import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useTrips from "@/hooks/useTrips";
import useAuthStore from "@/store/auth.store";
import Button from "@/components/ui/Button";
import ReviewTripModal from "../ReviewTripModal";
import CitiesSuggestion from "../CitiesSuggestion";
import Tabs, { ITab } from "../Tabs";
import GoogleMaps from "../GoogleMaps";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { APP_ROUTES } from "@/typescript/enum";
import Image from "next/image";
import useTripPlanningStore from "@/store/trip-planing.store";

const tabs = [
  { id: 1, name: "Plan a new Trip" },
  { id: 2, name: " Check history trips" },
];
const PlanTrip = () => {
  const router = useRouter();
  const { placeNewTrip, trips, isLoading } = useTrips();
  const { user } = useAuthStore((state) => state);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [tab, setTab] = useState<ITab>(tabs[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);


  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [travelers, setTravelers] = useState<number | undefined>(1);
  const [budgetMin, setBudgetMin] = useState<number | undefined>(0);
  const [budgetMax, setBudgetMax] = useState<number | undefined>(0);
  const [searchValue, setSearchValue] = useState<string>("");


  const onConfirm = async () => {
    setShowConfirmModal(false);
    await placeNewTrip();
  };

  const handlePlanTrip = () => {
    const params = new URLSearchParams({
      startDate: startDate || '',
      endDate: endDate || '',
      travelers: travelers?.toString() || '',
      budgetMin: budgetMin?.toString() || '',
      budgetMax: budgetMax?.toString() || '',
      searchCity: searchValue || ''
    });

    router.push(`${APP_ROUTES.REVIEW_MAP_WITH_AI}?${params.toString()}`);
  };

  return (
    <>
      <Tabs tabs={tabs} onChangeTab={(_) => setTab(_)} />

      {/* New trip section */}
      {tab?.id === 1 && (
        <>
          <div className="py-6">
            {/* <h2 className="text-white font-bold text-[32px]">
              Plan a new trip
            </h2>
            <small className="text-travel-gray-3 font-normal text-lg">
              If you want to bring more details to your trip experience you can
              plan a new trip here.
            </small> */}

            <section className="flex items-center gap-10 mt-10">
              <div className="inline-flex items-center gap-3">
                <div className="inline-flex items-center">
                  <Image
                    src="/svgs/calendar.svg"
                    width={24}
                    height={24}
                    alt="Calendar"
                  />
                  <small className="text-travel-gray-3 text-lg">From</small>
                </div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-10 w-40 min-w-[160px] px-4 appearance-none"
                />
                <small className="text-travel-gray-3 text-lg">to</small>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-10 w-40 min-w-[160px] px-4"
                />
              </div>

              <div className="inline-flex items-center gap-2 w-[250px]">
                <small className="text-travel-gray-3 text-lg">Travelers</small>
                <input
                  type="number"
                  value={travelers ?? ""}
                  onChange={(e) =>
                    setTravelers(
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  className="bg-travel-gray-2 w-full rounded-[30px] text-white text-base font-bold h-10 px-4 appearance-none"
                />
              </div>

              <div className="inline-flex items-center gap-3">
                <div className="inline-flex items-center">
                  <Image
                    src="/svgs/dollar.svg"
                    width={24}
                    height={24}
                    alt="Calendar"
                  />
                  <small className="text-travel-gray-3 text-lg">From</small>
                </div>
                <span className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
                    $
                  </span>
                  <input
                    type="number"
                    value={budgetMin ?? ""}
                    onChange={(e) =>
                      setBudgetMin(
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                    className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-10 w-24 pl-7 pr-4 appearance-none"
                  />
                </span>
                <small className="text-travel-gray-3 text-lg">to</small>
                <span className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
                    $
                  </span>
                  <input
                    type="number"
                    value={budgetMax ?? ""}
                    onChange={(e) =>
                      setBudgetMax(
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                    className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-10 w-24 pl-7 pr-4 appearance-none"
                  />
                </span>
              </div>
            </section>
          </div>
        </>
      )}

      {/* city suggesion section */}
      {tab?.id === 1 ? (
        <>
          <section className="border-[1px] border-secondary rounded-[30px] py-6 px-4 flex justify-between items-center my-9">
            <CitiesSuggestion onSearchChange={setSearchValue} />

            {/* <Button
              onClick={() =>
                // user?.uid
                //   ? setShowConfirmModal(true)
                //   : router.push(APP_ROUTES.SIGN_IN)

                router.push(APP_ROUTES.REVIEW_MAP_WITH_AI)
              }
              className="bg-[#CDFF6B] text-black hover:bg-[#CDFF6B]/90 px-6 ml-4 whitespace-nowrap"

            >
              Plan a new trip
            </Button>  */}
            <Button onClick={handlePlanTrip}
              className="bg-[#CDFF6B] text-black hover:bg-[#CDFF6B]/90 px-6 ml-4 whitespace-nowrap"
            >
              Plan a new trip</Button>
          </section>

          <section className="w-full relative">
            <GoogleMaps />

            {/* <Map/> */}
            {/* <Amap multipleMarkers={false} />
            {selectedLocation && (
              <ReviewTripModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                locationDetails={selectedLocation}
                onShowRecommendations={() => console.log("Show recommendations")}
              />
            )} */}
          </section>

          <ConfirmDialog
            isOpen={showConfirmModal}
            heading="Are you sure?"
            body="You want to place a new trip?"
            onClose={() => setShowConfirmModal(false)}
            onConfirm={onConfirm}
          />
        </>
      ) : (
        <>
          <section className="border-[1px] border-secondary rounded-[30px] py-6 px-4 flex justify-between items-center my-9">
            <Text className="text-white">You have {trips?.length} trip(s)</Text>
          </section>

          <section className="w-full relative">
            {trips?.map((trip) => (
              <div key={trip.id}></div>
            ))}
          </section>
        </>
      )}
    </>
  );
};

export default PlanTrip;
