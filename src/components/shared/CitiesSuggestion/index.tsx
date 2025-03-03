"use client";
import React, { useState } from "react";
import Image from "next/image";
import { chineseCities } from "@/typescript/data";
import { TCities } from "@/types/maps";
import useMapsStore from "@/store/maps.store";
import { fetchPlacesCity } from "@/utils/helpers";
import { CityBoundary, fetchCityBoundaries } from "@/utils/fetachPolygonsData";

interface CitiesSuggestionProps {
  onSearchChange?: (value: string) => void;
}

const CitiesSuggestion = ({ onSearchChange }: CitiesSuggestionProps) => {
  const {
    selectedCities,
    setPlaces,
    setCenter,
    addCity,
    removeCity,
    removeCityPolygon,
    addCityPolygon,
  } = useMapsStore((state) => state);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<TCities[]>(chineseCities);
  const [filteredCities, setFilteredCities] =
    useState<TCities[]>(chineseCities);
  const [search, setSearch] = useState<string>("");

  // const handleCityRemove = (city: TCities) => {
  //   console.log("removing");
  //   const filtered = markers.filter(
  //     (mark) =>
  //       mark.position.latitude !== city.latitude && // Change && to ||
  //       mark.position.longitude !== city.longitude
  //   );
  //   console.log(filtered, "filtered");
  //   setMarkers(filtered);

  //   setCities((prev) => {
  //     const _cities = [...prev, city];
  //     return _cities.sort();
  //   });
  //   removeCity(city);
  // };

  const handleCityRemove = (city: TCities) => {
    console.log("Removing city:", city.name);
    removeCity(city);
    removeCityPolygon(city.name);
    console.log("Updated selectedCities after removal:", selectedCities);
  };

  // const handleCityClick = async (city: TCities) => {
  //   try {
  //     setLoading(true);
  //     setCenter({
  //       longitude: city.longitude,
  //       latitude: city.latitude,
  //     });
  //     const foundCity = markers
  //       .slice()
  //       .find(
  //         (mark) =>
  //           mark.position.latitude === city.latitude &&
  //           mark.position.longitude === city.longitude
  //       );
  //     let filtered = [];
  //     if (foundCity) {
  //       filtered = markers
  //         .slice()
  //         .filter(
  //           (mark) =>
  //             mark.position.latitude !== city.latitude &&
  //             mark.position.longitude !== city.longitude
  //         );
  //     } else {
  //       filtered = [
  //         ...markers,
  //         {
  //           position: {
  //             longitude: city.longitude,
  //             latitude: city.latitude,
  //           },
  //         },
  //       ];
  //     }

  //     const response = await fetchPlacesCity(city.name, "all");

  //     setPlaces(response?.pois);

  //     setMarkers(filtered);
  //     setCities((prev) => {
  //       return prev.filter((c) => c !== city);
  //     });
  //     addCity(city);
  //     setSearch("");
  //     setFilteredCities([]);
  //   } catch (error) {
  //     console.log("Error while fetching restaurants");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCityClick = async (city: TCities) => {
    try {
      setLoading(true);

      // Set map center to clicked city
      setCenter({
        longitude: city.longitude,
        latitude: city.latitude,
      });

      // Check if the city is already in selectedCities
      const cityExists = selectedCities.some(
        (selected) => selected.name === city.name
      );

      if (!cityExists) {
        const response = await fetchPlacesCity(city.name, "all");
        setPlaces(response?.pois);
        addCity(city);
        const cityPolygon = await fetchCityBoundaries(city.name);
        if (cityPolygon) addCityPolygon(cityPolygon as CityBoundary);
        setCities((prev) => prev.filter((c) => c !== city));
      }

      setSearch("");
      setFilteredCities([]);
    } catch (error) {
      console.log("Error while fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-[80%] flex flex-row items-center">
      {selectedCities.length > 0 && (
        <h2 className="font-bold text-2xl text-white m-0">
          {selectedCities.length > 0 && selectedCities.length < 2
            ? "Single City"
            : "Multiple Cities"}
        </h2>
      )}

      {selectedCities.length > 0 && (
        <ul className="mx-2 flex flex-row gap-3 flex-wrap max-w-[300px]">
          {selectedCities.map((city) => (
            <li
              key={city.name}
              className="border-[1px] border-secondary border-opacity-10 rounded-full py-2 px-4 text-white text-sm inline-flex items-center gap-1"
            >
              <span>{city.name}</span>
              <Image
                src="/svgs/cross.svg"
                alt="Remove"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => handleCityRemove(city)}
              />
            </li>
          ))}
        </ul>
      )}

      <div
        className={`relative ${
          selectedCities.length > 0 ? "w-auto" : "w-[65%]"
        }`}
      >
        <input
          value={search}
          onChange={(e) => {
            setFilteredCities((prev) => {
              return cities
                .slice()
                .filter((c) =>
                  c.name.toLocaleLowerCase().includes(e.target.value)
                );
            });
            setSearch(e.target.value);
            onSearchChange?.(e.target.value);
          }}
          type="text"
          placeholder={
            selectedCities?.length === 0
              ? "Ready to start your next travel adventure?"
              : ""
          }
          className="bg-transparent border-none outline-none w-full text-white placeholder:font-bold placeholder:text-2xl placeholder:text-white"
        />

        {filteredCities.length > 0 && search && (
          <ul className="absolute left-0 top-7 w-2/3 bg-white rounded-lg shadow-sm px-2 py-1 z-[9999] max-h-[300px] overflow-y-auto">
            {filteredCities.map((city) => (
              <li
                key={city.name}
                className="text-sm text-travel-black p-1 rounded-sm cursor-pointer hover:bg-[rgba(0,0,0,0.076)]"
                onClick={() => handleCityClick(city)}
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default CitiesSuggestion;
