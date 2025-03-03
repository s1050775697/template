import React from "react";
import Button from "@/components/ui/Button";
import { APP_ROUTES } from "@/typescript/enum";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useMapsStore from "@/store/maps.store";
import { TLocationDetails } from "@/types/maps";

const ReviewTripModal = ({ isOpen, onClose, locationDetails, onShowRecommendations }: { isOpen: boolean, onClose: () => void, locationDetails: TLocationDetails, onShowRecommendations: () => void }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const buildingName = Array.isArray(locationDetails.addressComponent.building.name) 
    ? locationDetails.addressComponent.building.name.join(', ') 
    : locationDetails.addressComponent.building.name;

  const displayName = buildingName || locationDetails.formatted_address;

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">{locationDetails.formatted_address}</h1>
          <section className="bg-gray-500/10 backdrop-blur-[20px] shadow-lg rounded-[30px] w-[90%] max-w-[550px] h-auto p-4 absolute bottom-8 left-1/2 -translate-x-1/2 z-[999999] flex flex-row gap-3 items-center">
            <Image
              src="/svgs/close.svg"
              alt="Close"
              width={24}
              height={24}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={onClose}
              style={{ marginRight: '1rem', marginTop: '0.5rem' }}
            />
            {locationDetails.imageUrl ? (
              <img 
                src={locationDetails.imageUrl} 
                alt="City" 
                className="city-image bg-gray-300 rounded-md flex items-center justify-center" 
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            ) : (
              <div className="bg-gray-300 rounded-md w-[120px] h-[120px] flex items-center justify-center">
                <span className="text-gray-500 center" style={{ textAlign: 'center' }}>No Image Available</span>
              </div>
            )}
            <div className="inline-flex flex-col gap-4 flex-1" style={{ width: '45%' }}>
              <h4
                className="font-bold text-xl text-white"
                style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                title={locationDetails.formatted_address}
              >
                {displayName}
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
                <Image src="/svgs/recommend.svg" alt="City" width={16} height={16} />
                <span className="font-medium text-sm text-white cursor-pointer" onClick={onShowRecommendations} > view recommendations</span>
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
    </div>
  );
};

export default ReviewTripModal;
