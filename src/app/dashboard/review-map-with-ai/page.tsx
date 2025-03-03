"use client";
import React, { useState, useRef, useEffect } from "react";
import useAppStore from "@/store/app.store";
import AIChat from "@/components/shared/AIChat";
import GoogleMaps from "@/components/shared/GoogleMaps";
import Amap from "@/components/shared/Aamp";
import ReviewTripModal from "@/components/shared/ReviewTripModal";
import NavBar from "@/components/shared/NavBar";
import AmapTools from "@/components/shared/AampTools";
import Image from "next/image";
import { chineseCities } from "@/typescript/data";
import { SearchResult, TCities } from "@/types/maps";
import { fetchPlacesCity, fetchPlacesOnSearch } from "@/utils/helpers";
import useMapsStore from "@/store/maps.store";
import useClickOutside from "@/hooks/useClickOutside";
import Button from "@/components/ui/Button";
import PoiCard from "@/app/dashboard/review-map-with-ai/poiCard";
import "./page.css";
import { SAVE_ITEM,GET_ITEM } from '@/utils/storage'
import axios from "axios";
import MyAmap from '@/components/shared/Aamp/myAmap'
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const ReviewMapWithAIpage = () => {
  const { selectedCities, setPlaces, setCenter, addCity } = useMapsStore(
    (state) => state
  );

  const { isSidebarToggled } = useAppStore((state) => state);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currPoi, setCurrPoi] = useState<any>(null);
  const poiInfoRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isAmapToolsVisible, setIsAmapToolsVisible] = useState(false);
  const amapRef = useRef<any>(null);
  const [cities, setCities] = useState<TCities[]>(chineseCities);
  const [filteredCities, setFilteredCities] =
    useState<TCities[]>(chineseCities);
  const [search, setSearch] = useState<string>("");

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const searchParams = typeof window !== 'undefined' ? useSearchParams() : null;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for search
    const timeout = setTimeout(async () => {
      if (value) {
        const results = await fetchPlacesOnSearch(value);
        // Transform the API results to match our SearchResult type
        const formattedResults: SearchResult[] = results.map((result: any) => ({
          id: result.id || result._id || result.uid || String(Math.random()),
          name: result.name,
          location: {
            lat: parseFloat(result.location?.split(",")[1] || "0"),
            lng: parseFloat(result.location?.split(",")[0] || "0"),
          },
          longitude: parseFloat(result.location?.split(",")[0] || "0"),
          latitude: parseFloat(result.location?.split(",")[1] || "0"),
        }));
        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
      }
    }, 300);

    setSearchTimeout(timeout);
  };

  const handleAIResponse = (locations: number[], location: string) => {
    console.log("AI response location:", location, locations);
    if (amapRef.current) {
      SAVE_ITEM('aitrip', JSON.stringify(locations))
      amapRef.current.jumpToLocation(locations.flat(), location);
    }
  };

  const handleMakerClick = async (poi: any) => {
    let token = GET_ITEM("token") as string;
    if (token.startsWith('"')) {
      token = JSON.parse(token);
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/favorite/status`,
      {
        poiId: poi.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is correct
        },
      }
    );
    console.log(res.data);
    setCurrPoi({ ...poi, isLike: res.data.data });
  };

  const toggleAIChat = () => {
    setIsAIChatOpen((prev) => !prev);
    setIsAmapToolsVisible((prev) => !prev);
  };

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value.toLowerCase();
  //   setSearch(value);
  //   setFilteredCities(
  //     cities.filter((city) => city.name.toLowerCase().includes(value))
  //   );
  // };

  const handleCityClick = async (place: SearchResult) => {
    try {
      setCenter({
        longitude: place.longitude,
        latitude: place.latitude,
      });
    } catch (error) {
      console.log("Error while fetching places:", error);
    }
  };

  // const handleSearchClick = () => {
  //   console.log("Search button clicked");
  // };

  const getUrlParamsAsText = () => {
    const paramPairs: string[] = [];
    if(!searchParams)return ''
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const travelers = searchParams.get("travelers");
    const budgetMin = searchParams.get("budgetMin");
    const budgetMax = searchParams.get("budgetMax");
    const destination = searchParams.get("searchCity");
    if (startDate && endDate) {
      paramPairs.push(`📅 Dates: ${startDate} - ${endDate}`);
    }
    if (travelers) {
      paramPairs.push(`👥 Travelers: ${travelers}`);
    }
    if (budgetMin && budgetMax) {
      paramPairs.push(`💰 Budget: ${budgetMin} - ${budgetMax}`);
    }
    if (destination) {
      paramPairs.push(`📍 Destination: ${destination}`);
    }
    if (paramPairs.length === 0) {
      return "";
    }
    console.log("获取url参数", paramPairs);
    return `Looking for an itinerary\r\n${paramPairs.join("\r\n")}`;
  };

  useClickOutside(poiInfoRef, () => {
    setCurrPoi(null)
  })

  useEffect(() => {
    getUrlParamsAsText()
    setIsAIChatOpen(true);
    setIsAmapToolsVisible(true);
  }, []);
  return (
    <aside
      className={`inline-block align-top bg-travel-black h-full relative overflow-y-auto overflow-x-hidden py-10 px-8 min-h-screen w-full`}
    >
      <NavBar onToggleAIChat={toggleAIChat} isAIChatOpen={isAIChatOpen} />

      <div className="flex justify-between ">
        {isAmapToolsVisible && <AmapTools />}

        {/* Seach bar */}
        <div className="fixed z-50 top-12 right-10 h-[82px] flex items-center">
          <div className="flex relative items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-500/10 backdrop-blur-[20px] text-white pl-4 pr-10 py-1 rounded-[50px] h-[40px] w-[300px] text-lg font-bold focus:outline-none focus:ring-1 focus:ring-primary placeholder-white"
              value={search}
              onChange={handleSearchChange}
            />
            <Image
              src="/svgs/magnifying.svg"
              alt="Search"
              width={23}
              height={23}
              className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
            />
          </div>

          {filteredCities.length > 0 && search && (
            <ul className="absolute right-0 top-full mt-0.5 w-[300px] bg-gray-100 rounded-lg shadow-md px-2 py-1 z-[9999] max-h-[300px] overflow-y-auto">
              {filteredCities.map((city: any) => (
                <li
                  key={city.name}
                  className="text-sm text-black text-travel-black p-1 rounded-sm cursor-pointer hover:bg-[rgba(0,0,0,0.076)]"
                  onClick={() => handleCityClick(city)}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <MyAmap ref={amapRef} makerClick={handleMakerClick} />
      {currPoi && (
        <div className="poi-info backdrop-blur-[20px]" ref={poiInfoRef}>
          <PoiCard data={currPoi} isLike={currPoi.isLike} />
        </div>
      )}

      {/*<div className="itinerary-generate">*/}
      {/*  <span>Help me generate based on what we have now</span>*/}
      {/*  <div className='generate-btn'>Generate Itinerary</div>*/}
      {/*</div>*/}
      <section className="absolute z-40 bottom-16 right-10 inline-flex items-center justify-between bg-gray-500/10 backdrop-blur-[20px] rounded-[50px] py-[14px] px-6 h-[82px]">
        <p className="text-white text-lg font-bold mr-10">
          Help me generate based on what we have now
        </p>

        <Button className="h-[54px] w-[191px] !p-0 flex items-center justify-center">
          Generate Itinerary
        </Button>
      </section>

      {selectedLocation && (
        <ReviewTripModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          locationDetails={selectedLocation}
          onShowRecommendations={() => console.log("Show recommendations")}
        />
      )}

      <aside className="absolute z-50 h-[85%] w-[400px] top-14 left-14">
        {isAIChatOpen && (
          <AIChat
            userSearch={getUrlParamsAsText()}
            onApply={(input) => {
              console.log("User input:", input);
            }}
            onAIResponse={handleAIResponse}
          />
        )}
      </aside>
    </aside>
  );
};

export default ReviewMapWithAIpage;
