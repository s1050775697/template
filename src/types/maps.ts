export type TGoogleMaps = {
  multipleMarkers?: boolean;
  center?: number[];
  zoom?: number;
  height?: string;
  placeType?: string;
  selectedCities?: TCities[];
  setSelectedCities?: React.Dispatch<React.SetStateAction<TCities[]>>;
};

export type TRestaurants = {
  id: string;
  name: string;
  address: string;
  rating?: number;
};

export type TLocation = {
  position: TPosition;
};

export type TPosition = {
  latitude: number;
  longitude: number;
};

export type TStreetNumber = {
  number: string;
  location: string;
  direction: string;
  distance: string;
  street: string;
};

export type TBusinessArea = {
  location: string;
  name: string;
  id: string;
};

export type TAddressComponent = {
  city: string[]; // Assuming city can be an array
  province: string;
  adcode: string;
  district: string;
  towncode: string;
  streetNumber: TStreetNumber;
  country: string;
  township: string[]; // Assuming township can be an array
  businessAreas: TBusinessArea[];
  building: {
    name: string;
    type: string[];
  };
  neighborhood: {
    name: string[];
    type: string[];
  };
  citycode: string;
};

export type TLocationDetails = {
  formatted_address: string;
  addressComponent: {
    building: {
      name: string | string[];
    };
  };
  imageUrl?: string;
  place_id?: number;
  licence?: string;
  osm_type?: string;
  osm_id?: number;
  lat?: string;
  lon?: string;
  category?: string;
  type?: string;
  place_rank?: number;
  importance?: number;
  addresstype?: string;
  name?: string;
  display_name?: string;
  address?: {
    road?: string;
    suburb?: string;
    city_district?: string;
    city?: string;
    state?: string;
    "ISO3166-2-lvl4": string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox?: string[];
};

export type TCities = {
  name: string;
  latitude: number;
  longitude: number;
};

interface BizExt {
  rating: string;
  cost: string;
  meal_ordering: string;
  open_time: string;
  opentime2?: string; // opentime2 is optional
}

interface Photo {
  title: string[];
  url: string;
}

export interface TPlaces {
  id: string;
  name: string;
  address: string;
  type?: string;
  photos?: { url: string }[]; // 确保有照片属性
  images?: { url: string }[];
  formatted_address?: string; // 确保这是必需的
  addressComponent?: {
    building: {
      name: string | string[];
    };
    // 其他属性...
  }; // 添加此属性
  biz_type?: string;
  biz_ext?: BizExt;
  tags?: string[];
  area?: string;
}

export interface SearchResult {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  longitude: number;
  latitude: number;
}
