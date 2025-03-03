import { TLocation, TLocationDetails } from "@/types/maps";
import { Timestamp } from "firebase/firestore";

export interface ITrips {
  id: string | number;
  locations: TLocationDetails[];
  markers: TLocation[];
  likes: [];
  createdAt: Timestamp;
}
