'use client'
import React, {
  FC,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Map, Markers } from "react-amap";
import useMapsStore from "@/store/maps.store";
import {
  TGoogleMaps,
  TLocation,
  TLocationDetails,
  TPlaces,
} from "@/types/maps";
import {
  fetchPlaces,
  fetchLocationDetails,
  fetchLocationByName,
} from "@/utils/helpers";
import ReviewTripModal from "@/components/shared/ReviewTripModal";
import RecommendationsList from "@/components/shared/RecommendationsList";
import AIChat from "@/components/shared/AIChat";

const apiKey = process.env.NEXT_PUBLIC_gaode_api_key;
// const securityKey = "1aa93535be0ef9676fd3b376afc67230";
const randomPosition = () => ({
  longitude: 116.397428,
  latitude: 39.90923,
});

const Amap = forwardRef<
  { jumpToLocation: (locations: number[], address: string) => Promise<void> },
  TGoogleMaps
>(({ multipleMarkers = true, zoom = 20, height = "650px" }, ref) => {
  const {
    marker,
    // markers,
    locations,
    center,
    setMarker,
    // setMarkers,
    setLocations,
    setCenter,
    recommendations,
    setRecommendations,
  } = useMapsStore((state) => state);

  const [selectedLocation, setSelectedLocation] =
    useState<TLocationDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [markers, setMarkers] = useState<Array<{ position: [number, number] }>>(
    []
  );

  useEffect(() => {
    setCenter({ longitude: 116.397428, latitude: 39.90923 });
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMarkers([
  //       { position: [116.397428, 39.90923] },
  //       { position: [116.398281, 39.909094] },
  //     ]);
  //     console.log("Markers initialized after map load.");
  //   }, 500); // 延迟 500ms，确保地图加载完成
  // }, [center]); // 依赖于 center，确保地图加载后才初始化 markers

  useEffect(() => {
    console.log("Markers updated:", markers);
  }, [markers]);

  const handleMapClick = async (e: any) => {
    try {
      const { lnglat } = e;
      const location = {
        longitude: lnglat.lng,
        latitude: lnglat.lat,
      };
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        { position: [lnglat.lng, lnglat.lat] },
      ]);
      console.log("Marker set at:", location);

      const data = await fetchLocationDetails(
        location.longitude,
        location.latitude
      );
      setLocations([...locations, data]);
      setSelectedLocation(data);
      setShowRecommendations(true);
      setCenter(location);
      const keyword = data.formatted_address;
      // 获取place_text的图片
      const imageResponse = await fetch(
        `https://restapi.amap.com/v3/place/text?key=${apiKey}&keywords=${encodeURIComponent(
          keyword
        )}&language=en`
      );
      const imageData = await imageResponse.json();

      if (imageData.status === "1" && imageData.pois.length > 0) {
        const firstPoi = imageData.pois[0];
        if (firstPoi && firstPoi.photos && firstPoi.photos.length > 0) {
          const imageUrl = firstPoi.photos[0].url;
          setSelectedLocation((prev) => ({
            ...prev,
            imageUrl,
            formatted_address: data.formatted_address || "",
            addressComponent: {
              building: {
                name: prev?.addressComponent?.building?.name || "",
              },
            },
          }));
        }
      }

      const recommendationsResponse = await fetchPlaces(
        location.longitude,
        location.latitude
      );
      if (recommendationsResponse) {
        setRecommendations(recommendationsResponse);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // 跳转至指定地点，获取地点的经纬度，可以在地图上面标记
  const jumpToLocation = async (locations: any[], address: string) => {
    try {
      if (!locations.length) return
      // const location = await fetchLocationByName(locations[0].name);
      setCenter(locations[0]);
      setTimeout(()=>{
        setMarkers(locations.map(v => ({
          position: [v.longitude, v.latitude],
          extData: {...v}
        })));
      }, 2000)
    } catch (error) {
      console.error("Error jumping to location:", error);
    }
  };

  // const onLocationDetected = (longitude: number, latitude: number) => {
  //   setMarkers([{ position: { longitude, latitude } }]);
  //   console.log(`Marked location at: ${longitude}, ${latitude}`);
  // };

  useImperativeHandle(ref, () => ({
    jumpToLocation,
  }));

  return (
    <div style={{ height, width: "100%" }}>
      <Map
        amapkey={apiKey}
        plugins={["ToolBar"]}
        center={center}
        zoom={zoom}
        events={{
          click: handleMapClick,
        }}
      >
        {/* <Markers markers={multipleMarkers ? markers : marker} /> */}
        <Markers markers={markers} />
      </Map>
      {selectedLocation && (
        <ReviewTripModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          locationDetails={selectedLocation}
          onShowRecommendations={() => setShowRecommendations(true)}
        />
      )}
      {/* 推荐列表 */}
      {showRecommendations && (
        <RecommendationsList
          recommendations={recommendations}
          buildingName={
            // selectedLocation && selectedLocation.addressComponent.building.name.length !== 0
            //   ? selectedLocation?.addressComponent.building.name
            selectedLocation && selectedLocation.addressComponent.building.name
              ? Array.isArray(selectedLocation.addressComponent.building.name)
                ? selectedLocation.addressComponent.building.name.join(", ")
                : selectedLocation.addressComponent.building.name
              : selectedLocation?.formatted_address ?? "Unknown Location"
          }
          onClose={() => setShowRecommendations(false)}
          onRefresh={() => console.log("Refresh recommendations")}
        />
      )}
    </div>
  );
});

export default Amap;
