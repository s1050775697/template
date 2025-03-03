import { firestore } from "@/firebase";
import useShowToast from "./useShowToast";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FIREBASE_COLLECTION } from "@/typescript/enum";
import useMapsStore from "@/store/maps.store";
import { GENERATE_UID } from "@/utils/helpers";
import useAuthStore from "@/store/auth.store";
import { ITrips } from "@/typescript/interfaces/trips.interface";

const useTrips = () => {
  const showToast = useShowToast();
  const { markers, locations, setLocations, setMarkers } = useMapsStore(
    (state) => state
  );

  const { user } = useAuthStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [trips, setTrips] = useState<ITrips[]>([]);

  useEffect(() => {
    if (user && user?.uid) getTrips();
  }, []);

  const placeNewTrip = async () => {
    if (!locations.length) {
      showToast("Error", "Please enter your locations", "error");
      return;
    }
    setIsLoading(true);
    const id = await GENERATE_UID(FIREBASE_COLLECTION.TRIPS);

    const data = {
      id,
      locations,
      markers,
      likes: [],
      createdAt: Date.now(),
      user: doc(firestore, FIREBASE_COLLECTION.USERS, String(user?.uid)),
    };

    await setDoc(doc(firestore, FIREBASE_COLLECTION.TRIPS, String(id)), data);
    showToast("Success", "Trip has been added to your collection", "success");
    setMarkers([]);
    setLocations([]);
    try {
    } catch (error: any) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
      getTrips();
    }
  };

  const getTrips = async () => {
    try {
      setIsLoading(true);
      const collections = collection(firestore, FIREBASE_COLLECTION.TRIPS);
      const existingData = query(
        collections,
        where(
          "user",
          "==",
          doc(firestore, FIREBASE_COLLECTION.USERS, String(user?.uid))
        )
      );
      const querySnapshot = await getDocs(existingData);
      const tripsDocs = querySnapshot.docs;

      const _trips = [];
      for (const data of tripsDocs) {
        const trip = data.data() as ITrips;
        _trips.push(trip);
      }
      setTrips(_trips);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    placeNewTrip,
    trips,
    isLoading: isLoading,
  };
};
export default useTrips;
