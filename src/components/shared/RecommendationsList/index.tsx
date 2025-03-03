import React, { useEffect, useState } from "react";
import { TPlaces } from "@/types/maps";
import Image from "next/image";
import { useRouter } from "next/navigation";
import './RecommendationsList.css'; 
import ReviewTripModal from "../ReviewTripModal";
import Button from "@/components/ui/Button";
import { APP_ROUTES } from "@/typescript/enum";

const RecommendationsList = ({ recommendations, buildingName, onClose, onRefresh }: { recommendations: TPlaces[], buildingName: string, onClose: () => void, onRefresh: () => void }) => {
  const [places, setPlaces] = useState<TPlaces[]>([]);
  const [displayedPlaces, setDisplayedPlaces] = useState<TPlaces[]>([]);
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_gaode_api_key;
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlacesData = async () => {
      const keyword = buildingName;
      const response = await fetch(
        `https://restapi.amap.com/v3/place/text?key=${apiKey}&keywords=${encodeURIComponent(keyword)}&types=风景名胜&language=en&extensions=all`
      );
      const data = await response.json();
      console.log("data111", data)
      if (data.status === "1" && data.pois) {
        const formattedPlaces = data.pois.map((place: any) => ({
          ...place,
          formatted_address: place.address || "",
          addressComponent: place.adcode || "",
        }));
        setPlaces(formattedPlaces);
        setDisplayedPlaces(getRandomPlaces(formattedPlaces, 4)); // 初始显示4个地点、
        console.log("displayedPlaces111", displayedPlaces)
      }
    };

    fetchPlacesData();
  }, [buildingName]);

  const getRandomPlaces = (places: TPlaces[], count: number) => {
    const shuffled = places.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleRefresh = () => {
    setDisplayedPlaces(getRandomPlaces(places, 4)); // 刷新时随机选择4个地点
  };

  return (
    <div className="absolute right-10 top-[57px] w-2/5 h-full p-4 overflow-y-scroll flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Image
            src="/svgs/refresh.svg"
            alt="Refresh"
            width={24}
            height={24}
            className="cursor-pointer mr-2 z-[9999999]" 
            onClick={handleRefresh}
          />
          <h4 className="font-bold text-lg text-gray-800">{buildingName}</h4>
        </div>
        <Image
          src="/svgs/close.svg"
          alt="Close"
          width={24}
          height={24}
          className="cursor-pointer z-[9999999]"
          onClick={onClose}
        />
      </div>
      <div className="flex-1">
        {displayedPlaces.length === 0 ? (
          <p className="text-center text-gray-600">There are no recommendations</p>
        ) : (
          displayedPlaces.map((place, index) => (
            <div
                key={index}
                className="w-[100%] max-w-[550px] h-auto p-4 bottom-8 z-[999999] gap-3 items-center"
                style={{ marginTop: index === 0 ? '0px' : '120px' }}
            >
            {/* <div className={`modal ${isOpen ? "is-active" : ""}`}> */}
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content">
                <div className="box">
                {/* <h1 className="title">{place.formatted_address}</h1> */}
                <section className="bg-gray-500/10 backdrop-blur-[20px] shadow-lg rounded-[30px] w-[90%] max-w-[550px] h-auto p-4 absolute left-1/2 -translate-x-1/2 z-[999999] flex flex-row gap-3 items-center">
                    <Image
                    src="/svgs/close.svg"
                    alt="Close"
                    width={24}
                    height={24}
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={onClose}
                    style={{ marginRight: '1rem', marginTop: '0.5rem' }}
                    />
                    {place.photos && place.photos.length > 0 ? (
                    <img 
                        src={place.photos[0].url} 
                        alt={place.name} 
                        className="w-full h-auto rounded-md w-[120px] h-[120px]"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                    />
                    ) : (
                    <div className="bg-gray-300 rounded-md w-[120px] h-[120px] flex items-center justify-center">
                        <span className="text-gray-500" style={{ textAlign: 'center' }}>No Image Available</span>
                    </div>
                    )}
                    <div className="inline-flex flex-col gap-4 flex-1" style={{ width: '45%' }}>
                    <h4
                        className="font-bold text-xl text-white"
                        style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        title={place.name}
                    >
                        {/* {buildingName} */}
                        {place.name}
                    </h4>
                    <span className="inline-flex items-center gap-2">
                        <Image src="/svgs/clock.svg" alt="City" width={16} height={16} />
                        <span className="font-medium text-sm text-white">
                        Dec 12, 2024 - Dec 15, 2024
                        </span>
                    </span>
                    {/* <span className="inline-flex items-center gap-2">
                        <Image src="/svgs/dollar.svg" alt="City" width={16} height={16} />
                        <span className="font-medium text-sm text-white">3000</span>
                    </span> */}
                    <span className="inline-flex items-center gap-2">
                        <Image src="/svgs/type.svg" alt="City" width={16} height={16} />
                        <span className="font-medium text-sm text-white">
                            {place?.type?.split(';').slice(0, 2).join(', ')}
                        </span>
                    </span>
                    </div> 
                    <Button
                    onClick={() => {
                        onClose();
                        router.push(APP_ROUTES.REVIEW_TRIP);
                    }}
                    className="text-sm w-36 px-1"
                    >
                    Review trip
                    </Button>
                </section>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
            {/* </div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendationsList; 