import React, { FC } from "react";
import { Image as ChakraImage, Spinner } from "@chakra-ui/react";
import { TPlaces } from "@/types/maps";
import Image from "next/image";
import HeartIcon from "@/components/svgs/HeartIcon";
import useRestaurants from "@/hooks/useRestaurants";
import useAuthStore from "@/store/auth.store";
import HeartIconFilled from "@/components/svgs/HeartIconFilled";

const FavCard: FC<TPlaces> = (props: TPlaces) => {
  const { id, name, photos, address, biz_type, biz_ext } = props
  const { isLoading, toggleRestaurantAsFav } = useRestaurants();
  const { user } = useAuthStore();

  const checkIsFav = () => {
    return user?.likes.find((resId) => resId === id) ? true : false;
  };

  return (
    <section className="w-[240px] h-[312px] rounded-[30px] bg-gray-500/10 backdrop-blur-[20px] overflow-hidden">
      <aside className="w-full h-[160px] relative ">
        <ChakraImage
          src={photos?.[0]?.url || ""}
          alt="Card Image"
          width="full"
          height="full"
        />
        <div
          onClick={() => (!isLoading ? toggleRestaurantAsFav(props) : {})}
          className="w-[54px] h-[54px] rounded-full flex items-center justify-center border-[1px] border-[#000000]/20 bg-[#000000]/20 absolute right-2 top-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Spinner size="sm" />
            </>
          ) : checkIsFav() ? (
            <HeartIconFilled color="#d1f561" />
          ) : (
            <HeartIcon color="white" />
          )}
        </div>
      </aside>

      <aside className="w-full py-[14px] px-4">
        <div className="inline-flex items-center justify-between w-full">
          <p className="text-white text-sm">{name}</p>
          <div className="inline-flex items-center gap-1">
            <Image
              src="/svgs/star.svg"
              alt="Card Image"
              width={19}
              height={19}
            />
            <small className="text-white text-sm">{biz_ext?.rating}</small>
            {/* <small className="text-travel-gray-3 text-sm">(20)</small> */}
          </div>
        </div>

        <div className="inline-flex items-start justify-between w-full flex-col mt-4 gap-2">
          <div className="inline-flex items-center gap-2">
            <Image
              src="/svgs/eat.svg"
              alt="Fork & Knife"
              width={24}
              height={24}
            />
            <small className="text-sm text-travel-gray-3 capitalize">
              {biz_type}
            </small>
          </div>
          <div className="inline-flex items-center gap-2">
            <Image src="/svgs/marker.svg" alt="Marker" width={24} height={24} />
            <small className="text-sm text-travel-gray-3">{address}</small>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default FavCard;
