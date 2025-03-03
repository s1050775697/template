"use client";

import React, { ReactNode, useLayoutEffect } from "react";
import useAuthenticate from "@/hooks/useAuthenticate";

const APPWrapper = (props: { children: ReactNode }) => {
  // const { refetchUser } = useAuthenticate();

  const loadGoogleSdk = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBpP2_9c-Rm8oyVw3gOqccpGlBGppDCxIg&loading=async`;
    script.async = true;
    script.onload = () => {
      console.log("Google Map has been loaded");
    };
    script.onerror = () => {
      console.error("Failed to load Google Map");
    };
    document.body.appendChild(script);
  }

  useLayoutEffect(() => {
    const loadAMapSDK = async () => {
      // await refetchUser();
      const script = document.createElement("script");
      script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${process.env.NEXT_PUBLIC_gaode_api_key}&language=en&plugin=AMap.PlaceSearch`;
      script.async = true;
      script.onload = () => {
        console.log("AMap has been loaded");
      };
      script.onerror = () => {
        console.error("Failed to load AMap SDK");
      };
      document.body.appendChild(script);
    };
    if(typeof window === "undefined")return
    window._AMapSecurityConfig = {
      securityJsCode: "1aa93535be0ef9676fd3b376afc67230",
    };

    // loadAMapSDK();
  }, []);
  return <>{props.children}</>;
};

export default APPWrapper;
