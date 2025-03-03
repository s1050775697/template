import React, { FC, useEffect, useState } from "react";
import { Map, Markers, Polygon } from "react-amap";
import useMapsStore from "@/store/maps.store";
import { TGoogleMaps, TLocation } from "@/types/maps";
import Loader from "@/components/ui/Loader";
import { CityBoundary, fetchCityBoundaries } from "@/utils/fetachPolygonsData";

const apiKey = process.env.NEXT_PUBLIC_gaode_api_key;
const randomPosition = () => ({
  longitude: 116.397428,
  latitude: 39.90923,
});

const GoogleMaps: FC<TGoogleMaps> = ({
  multipleMarkers = true,
  zoom = 5,
  height = "650px",
}) => {
  const {
    marker,
    markers,
    locations,
    center,
    cityPolygons,
    selectedCities,
    setMarker,
    setMarkers,
    setLocations,
    setCenter,
    addCity,
    addCityPolygon,
  } = useMapsStore((state) => state);

  const [loading, setLoading] = useState<boolean>(false);
  const [mapKey,setMapKey] = useState<string>('');
  const [language, setLanguage] = useState<'zh-CN' | 'en'>('en');

  const handleMapClick = async (e: any) => {
    // setLoading(true);
    try {
      const { lnglat } = e;
      const location = {
        longitude: lnglat.lng,
        latitude: lnglat.lat,
      };

      const reverseGeocodeResponse = await fetch(
        `https://restapi.amap.com/v3/geocode/regeo?key=${process.env.NEXT_PUBLIC_gaode_api_key}&location=${location.longitude},${location.latitude}&radius=1000&extensions=all&language=${language}`
      );

      if (!reverseGeocodeResponse.ok) {
        throw new Error(`HTTP error! status: ${reverseGeocodeResponse.status}`);
      }

      const reverseGeocodeData = await reverseGeocodeResponse.json();
      console.log("reverseGeocodeData-----", reverseGeocodeData);
      const cityData = reverseGeocodeData.regeocode?.addressComponent?.city;
      const provinceData = reverseGeocodeData.regeocode?.addressComponent?.province;
      
      // 处理省份数据
      const provinceName = (Array.isArray(provinceData) 
        ? provinceData[0]?.name ?? provinceData[0]
        : provinceData);
      
      // 处理城市数据
      const cityName = (Array.isArray(cityData) 
        ? cityData[0]?.name ?? cityData[0]
        : cityData);

      // 优先使用城市名称，没有城市时使用省份名称
      const locationName = cityName || provinceName;
      
      if (!locationName) {
        alert("No province or city data found.");
        return;
      }
      
      const cityLatitude = location.latitude;
      const cityLongitude = location.longitude;
      if (locationName) {
        const cityExists = selectedCities.some((c) => c.name === locationName);

        if (!cityExists) {
          const newCity = {
            name: locationName,  // 使用合并后的名称
            latitude: cityLatitude,
            longitude: cityLongitude,
          };

          // Add the city only if it's not already in the list
          addCity(newCity);

          // Fetch city boundary and store it
          const results = await fetchCityBoundaries(newCity.name);
          if (results) addCityPolygon(results as CityBoundary);
        } else {
          console.log(`City ${locationName} is already selected.`);
          alert(`City ${locationName} is already selected.`);
        }
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      // setLoading(true);
    }
  };

  useEffect(() => {
    // fetchAllCities();
    setCenter(randomPosition());
  }, []);

  useEffect(() => {
    setLoading(true);
    if(selectedCities.length > 0) {
      setCenter({
        longitude: selectedCities[selectedCities.length - 1].longitude,
        latitude: selectedCities[selectedCities.length - 1].latitude,
      });
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    setMapKey(+new Date()+'');

    return () => clearTimeout(timer);
  }, [selectedCities, cityPolygons.length,language]);

  return (
    <div style={{ 
      height, 
      width: "100%", 
      position: 'relative',
      transition: 'opacity 0.3s ease'
    }}>
      <Map
        amapkey={apiKey}
        plugins={["ToolBar"]}
        center={center}
        zoom={zoom}
        key={mapKey}
        limitBounds={{
          southWest: { longitude: 73.55, latitude: 18.15 },
          northEast: { longitude: 135.05, latitude: 53.55 }
        }}
        zooms={[5, 18]}
        events={{
          click: handleMapClick,
        }}
        features={["bg", "point", "road"]}
        //@ts-ignore
        lang={language}
        mapStyle="dark"
      >
        {/* <Markers
          key={`markers-${markers.length}`}
          markers={multipleMarkers ? markers : marker}
        /> */}

        {selectedCities.length > 0 && (
          <Markers
            key={`cities-${selectedCities.length}`}
            markers={selectedCities.map((city) => ({
              position: {
                longitude: city.longitude,
                latitude: city.latitude,
              },
            }))}
          />
        )}
        {cityPolygons.map((polygon, index) => (
          <Polygon
            key={`${polygon.name}-${index}`}
            path={polygon.path}
            style={{
              strokeColor: "#4A90E2",
              strokeWeight: 1,
              strokeOpacity: 0.5,
              fillColor: "#4A90E2",
              fillOpacity: 0.2,
            }}
          />
        ))}
      </Map>
      
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <Loader />
        </div>
      )}

      <div style={{ 
        position: 'absolute', 
        top: 10, 
        right: 10, 
        zIndex: 1000 
      }}>
        <button 
          onClick={() => setLanguage(prev => prev === 'en' ? 'zh-CN' : 'en')}
          style={{ 
            padding: '8px 15px',
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {language === 'en' ? 'Chinese' : 'English'}
        </button>
      </div>
    </div>
  );
};

export default GoogleMaps;
