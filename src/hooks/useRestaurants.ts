import { useState } from "react";
import { firestore } from "@/firebase";
import useShowToast from "./useShowToast";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_COLLECTION } from "@/typescript/enum";
import useAuthStore from "@/store/auth.store";
import { IUser } from "@/typescript/interfaces/authentication.interface";
import { SAVE_ITEM } from "@/utils/storage";
import { TPlaces } from "@/types/maps";
import { fetchPlacesCity } from "@/utils/helpers";
import useMapsStore from "@/store/maps.store";

const useRestaurants = () => {
  const showToast = useShowToast();

  const { locations } = useMapsStore((state) => state);
  const { user, loginUser } = useAuthStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const toggleRestaurantAsFav = async (restaurant: TPlaces) => {
    try {
      if (!user)
        return showToast(
          "Hey Wait!",
          "Please login to perform this action",
          "warning"
        );
      let flag: boolean = false;

      const _user = user as IUser;
      setIsLoading(true);
      const userReference = doc(
        firestore,
        FIREBASE_COLLECTION.USERS,
        user?.uid as string
      );

      const collections = collection(
        firestore,
        FIREBASE_COLLECTION.FAV_RESTAURANTS
      );
      const existingData = query(
        collections,
        where(
          "user",
          "==",
          doc(firestore, FIREBASE_COLLECTION.USERS, String(user?.uid))
        )
      );
      const querySnapshot = await getDocs(existingData);

      if (querySnapshot.empty) {
        await createNewDocForRestaurant(user?.uid as string, restaurant);
      } else {
        const favResReference = doc(
          firestore,
          FIREBASE_COLLECTION.FAV_RESTAURANTS,
          user?.uid as string
        );

        console.log(
          "favRestaurants :: ",
          (await getDoc(favResReference)).exists()
        );
        const favRestaurants: any = (await getDoc(favResReference)).data();
        let favRestaurantsArray = [...favRestaurants.restaurants];
        if (favRestaurantsArray.find((r) => r.id === restaurant.id)) {
          favRestaurantsArray = favRestaurants.restaurants.filter(
            (res: TPlaces) => res.id !== restaurant.id
          );
        } else {
          favRestaurantsArray.push(restaurant);
        }
        await updateDoc(favResReference, {
          restaurants: favRestaurantsArray,
        });
      }
      const updatedUser = (await getDoc(userReference)).data() as IUser;
      const hasMarkedFav = updatedUser.likes.find(
        (resId) => resId === restaurant.id
      );
      let updatedList = [...updatedUser.likes];

      if (hasMarkedFav) {
        flag = false;
        updatedList = updatedUser.likes
          .slice()
          .filter((resId) => resId !== restaurant.id);
      } else {
        flag = true;
        updatedList.push(restaurant.id);
      }
      await updateDoc(userReference, { likes: updatedList });

      loginUser({ ..._user, likes: [...updatedList] });
      SAVE_ITEM("user", { ..._user, likes: [...updatedList] });
      showToast(
        "",
        flag
          ? "Restaurant added as favourite"
          : "Restaurant removed as favourite",
        "success"
      );
    } catch (error: any) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllUserFavouriteRestaurants = async () => {
    try {
      if (!user)
        return showToast(
          "Hey Wait!",
          "Please login to view your liked restaurants",
          "warning"
        );

      const _user = user as IUser;
      setIsLoading(true);
      const collections = collection(
        firestore,
        FIREBASE_COLLECTION.FAV_RESTAURANTS
      );
      const existingData = query(
        collections,
        where(
          "user",
          "==",
          doc(firestore, FIREBASE_COLLECTION.USERS, String(user?.uid))
        )
      );
      const querySnapshot = await getDocs(existingData);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const createNewDocForRestaurant = async (
    docId: string,
    restaurant: TPlaces
  ) => {
    const data = {
      id: String(docId),
      restaurants: [restaurant],
      createdAt: Date.now(),
      user: doc(firestore, FIREBASE_COLLECTION.USERS, String(user?.uid)),
    };

    await setDoc(
      doc(firestore, FIREBASE_COLLECTION.FAV_RESTAURANTS, String(docId)),
      data
    );
  };

  const onGetPlaces = async (placeType: string) => {
    if (!locations.length) return;
    const places: any = [];
    for await (const location of locations) {
      const response = await fetchPlacesCity(location?.address?.city || "", placeType);
      console.log("response :: ", response);
      if (response?.info === "OK") places.push(...response.pois);
    }
    return places;
  };

  return {
    toggleRestaurantAsFav,
    getAllUserFavouriteRestaurants,
    onGetPlaces,
    isLoading: isLoading,
  };
};
export default useRestaurants;
