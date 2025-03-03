"use client";

import { useEffect, useRef, useState } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import Image from "next/image";
import useShowToast from "@/hooks/useShowToast";

interface MapProps {
  height?: string;
  width?: string;
  isSearchBarVisible?: boolean;
}

declare global {
  interface Window {
    _AMapSecurityConfig: {
      securityJsCode: string;
    };
    AMap: any;
  }
}

export default function Map({
  height = "900px",
  width = "100%",
  isSearchBarVisible = false,
}: MapProps) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const placeSearchRef = useRef<any>(null);
  const autoCompleteRef = useRef<any>(null);
  const showToast = useShowToast();

  const [features, setFeatures] = useState<string[]>([
    "bg", // Background
    "point", // POI points
  ]);

  useEffect(() => {
    if(typeof window === 'undefined')return
    // Security configuration
    window._AMapSecurityConfig = {
      securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE || "",
    };

    // Initialize map
    AMapLoader.load({
      key: process.env.NEXT_PUBLIC_gaode_api_key_2 || "",
      version: "2.0",
      plugins: ["AMap.PlaceSearch", "AMap.AutoComplete"],
    })
      .then((AMap) => {
        if (containerRef.current && !mapRef.current) {
          mapRef.current = new AMap.Map(containerRef.current, {
            viewMode: "3D",
            zoom: 15,
            center: [116.397428, 39.90923],
            // mapStyle: "amap://styles/dark",
            lan: "en",
            // features: features,
          });

          //   placeSearchRef.current = new AMap.PlaceSearch({
          //     map: mapRef.current,
          //     pageSize: 10,
          //     autoFitView: true,
          //     extensions: "all",
          //   });

          mapRef.current.on("complete", () => {
            placeSearchRef.current = new AMap.PlaceSearch({
              map: mapRef.current,
              pageSize: 10,
              autoFitView: true,
              lang: "en",
            });
            autoCompleteRef.current = new AMap.AutoComplete({
              input: "searchInput",
              output: "searchResults",
              lang: "en",
            });

            autoCompleteRef.current.on("select", (e: any) => {
              if (placeSearchRef.current) {
                placeSearchRef.current.setCity(e.poi.adcode);
                placeSearchRef.current.search(e.poi.name);
              }
            });
          });
        }
      })
      .catch((e) => {
        console.error("Failed to load AMap:", e);
      });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  const handleSearch = () => {
    if (placeSearchRef.current && searchValue) {
      placeSearchRef.current.search(
        searchValue,
        (status: string, result: any) => {
          if (status === "complete") {
            console.log("Search results:", result);
          } else {
            console.error("Search failed:", result);
            showToast("Error", "No Search Results Found", "error");
          }
        }
      );
    }
    if (!searchValue) {
      showToast("Error", "Please fill all the fields", "error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (autoCompleteRef.current && value) {
      autoCompleteRef.current.search(value, (status: string, result: any) => {
        if (status === "complete") {
          //   setSuggestions(result.tips);
        }
      });
    } else {
      //   setSuggestions([]);
    }
  };

  useEffect(() => {
    console.log(mapRef.current);
  }, [mapRef.current]);

  return (
    <div className="relative h-full">
      {isSearchBarVisible && (
        <div className="bg-travel absolute top-[20px] right-[20px] z-[9999] p-[15px] rounded-lg min-w-[400px]">
          <div className="flex-1 relative bg-travel">
            <div className="flex relative items-center bg-travel">
              <input
                id="searchInput"
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Search locations..."
                className="bg-gray-500/10 backdrop-blur-[20px] text-white pl-4 pr-10 py-1 rounded-[50px] h-[60px] w-[400px] text-lg font-bold focus:outline-none focus:ring-1 focus:ring-primary placeholder-white"
                onFocus={(e) => {
                  e.target.style.borderColor = "#4CAF50";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ddd";
                }}
              />
              <Image
                src="/svgs/magnifying.svg"
                alt="Search"
                width={23}
                height={23}
                className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
                onClick={handleSearch}
              />
            </div>
            {/* {suggestions.length > 0 && (
                <div
                  id="searchResults"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 5px)",
                    left: 0,
                    right: 0,
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    maxHeight: "300px",
                    overflowY: "auto",
                    zIndex: 101,
                  }}
                >
                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSearchValue(item.name);
                        setSuggestions([]);
                        if (placeSearchRef.current) {
                          placeSearchRef.current.search(item.name);
                        }
                      }}
                      style={{
                        padding: "10px 12px",
                        cursor: "pointer",
                        borderBottom:
                          index === suggestions.length - 1
                            ? "none"
                            : "1px solid #eee",
                        transition: "background-color 0.2s",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              )} */}
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          height,
          width,
        }}
      />
    </div>
  );
}
