/*
 * @Author: wyy
 * @Date: 2025-02-04 17:23:34
 * @LastEditTime: 2025-02-09 23:09:25
 * @FilePath: \travel-ai-main\src\store\maps.store.ts
 * @Description:
 */
import { TLocation, TLocationDetails, TPosition, TPlaces } from "@/types/maps";
import { create } from "zustand";

export type IMapsStore = {
  locations: TLocationDetails[] | [];
  markers: TLocation[] | [];
  marker: TLocation[] | [];
  center: TPosition | undefined;
  places: TPlaces[] | [];
  recommendations: TPlaces[] | [];
  selectedCities: TCities[];
  cityPolygons: CityBoundary[];
  setCenter: (center: TPosition) => void;
  setMarker: (marker: TLocation[]) => void;
  setMarkers: (marker: TLocation[]) => void;
  setLocations: (locations: TLocationDetails[]) => void;
  setPlaces: (places: TPlaces[]) => void;
  setRecommendations: (recommendations: TPlaces[]) => void;
  addCity: (city: TCities) => void;
  removeCity: (city: TCities) => void;
  addCityPolygon: (polygon: CityBoundary) => void;
  removeCityPolygon: (cityName: string) => void;
};

export type TCities = {
  name: string;
  latitude: number;
  longitude: number;
};

interface CityBoundary {
  name: string;
  path: Array<{ longitude: number; latitude: number }>;
  center: { longitude: number; latitude: number };
}

const useMapsStore = create<IMapsStore>((set) => ({
  locations: [],
  markers: [],
  marker: [],
  places: [],
  recommendations: [],
  center: undefined,
  selectedCities: [],
  cityPolygons: [],
  setCenter: (center) => set({ center }),
  setMarker: (marker) => set({ marker }),
  setMarkers: (newMarkers) =>
    set((state) => ({
      markers: [...state.markers, ...newMarkers],
    })),
  setLocations: (locations) => set({ locations }),
  setPlaces: (places) => set({ places }),
  setRecommendations: (recommendations) => set({ recommendations }),
  addCity: (city) =>
    set((state) => ({
      selectedCities: [...state.selectedCities, city],
    })),

  removeCity: (city) =>
    set((state) => ({
      selectedCities: state.selectedCities.filter((c) => c.name !== city.name),
    })),

  addCityPolygon: (polygon) =>
    set((state) => ({ cityPolygons: [...state.cityPolygons, polygon] })),

  removeCityPolygon: (cityName) =>
    set((state) => ({
      cityPolygons: state.cityPolygons.filter(
        (polygon) => polygon.name !== cityName
      ),
    })),
}));

// const useMapsStore = create<IMapsStore>((set) => ({
//   locations: [],
//   markers: [],
//   marker: [],
//   places: [],
//   recommendations: [],
//   center: undefined,
//   setCenter: (center) => set({ center }),
//   setMarker: (marker) => set({ marker }),
//   setMarkers: (markers) => set({ markers }),
//   setLocations: (locations) => set({ locations }),
//   setPlaces: (places) => set({ places }),
//   setRecommendations: (recommendations) => set({ recommendations }),
// }));

export default useMapsStore;
