import { firestore } from "@/firebase";
import { FIREBASE_COLLECTION } from "@/typescript/enum";
import axios from "axios";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { TPlaces, TLocationDetails } from "@/types/maps";

export const images = [
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
  "/slider/img-1.jpg",
  "/slider/img-2.jpg",
  "/slider/img-3.jpg",
  "/slider/img-4.jpg",
  "/slider/img-5.jpg",
  "/slider/img-6.jpg",
];

export const GENERATE_UID = async (collectionName: FIREBASE_COLLECTION) => {
  const collectionRef = collection(firestore, collectionName);
  const q = query(collectionRef, orderBy("createdAt", "desc"), limit(1));

  const latestDoc = await getDocs(q);
  let latestID = 0;
  if (!latestDoc?.docs?.length) return 1;
  if (!latestDoc.empty) latestID = parseInt(latestDoc.docs[0].id, 10);

  return latestID + 1;
};

const apiKey = process.env.NEXT_PUBLIC_gaode_api_key;

export const fetchPlacesCity = async (city: string, placeType: string = "") => {
  const url = `${process.env.NEXT_PUBLIC_places_api_url}?key=${process.env.NEXT_PUBLIC_gaode_api_key}&city=${city}&offset=50&page=1&types=餐厅&keywords=${placeType}`;

  const { data, status } = await axios.get(url);
  if (status === 200) return data;
};

export const fetchPlaces = async (
  longitude: number,
  latitude: number
): Promise<TPlaces[]> => {
  const url = `https://restapi.amap.com/v3/place/around?key=${apiKey}&location=${longitude},${latitude}&radius=1000&language=en`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.pois.map((poi: any) => ({
      name: poi.name,
      address: poi.address,
      type: poi.type,
    }));
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};

export const fetchPlacesOnSearch = async (keyword: string) => {
  const apiKey = process.env.NEXT_PUBLIC_gaode_api_key;
  const url = `https://webapi.amap.com/maps?v=1.4.15&key=${apiKey}&keywords=${encodeURIComponent(
    keyword
  )}&lang=en&extensions=all&plugin=AMap.AutoComplete`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "1" && data.pois) {
      console.log(data.pois, "---------");
      return data.pois;
    } else {
      console.error("No results found or invalid response");
      return [];
    }
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};
export const fetchLocationDetails = async (
  longitude: number,
  latitude: number
): Promise<TLocationDetails> => {
  const url = `https://restapi.amap.com/v3/geocode/regeo?key=${apiKey}&location=${longitude},${latitude}&language=en`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.status === "1") {
      return {
        formatted_address: data.regeocode.formatted_address,
        addressComponent: data.regeocode.addressComponent,
      };
    } else {
      console.error("Unable to fetch location details");
      throw new Error(data.info);
    }
  } catch (error) {
    console.error("Error fetching location details:", error);
    throw error;
  }
};

export const fetchLocationByName = async (
  address: string
): Promise<{ longitude: number; latitude: number } | null> => {
  const url = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(
    address
  )}&key=${apiKey}&language=en`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.status === "1" && data.geocodes.length > 0) {
      const location = data.geocodes[0].location.split(",");
      return {
        longitude: parseFloat(location[0]),
        latitude: parseFloat(location[1]),
      };
    } else {
      console.error("Unable to fetch coordinates for the address");
      return null;
    }
  } catch (error) {
    console.error("Error fetching location by name:", error);
    return null;
  }
};
