import * as React from "react";
import { SVGProps } from "react";

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill={props.color}
      d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0ZM5.35 16.5C6.66 15.56 8.26 15 10 15c1.74 0 3.34.56 4.65 1.5-1.31.94-2.91 1.5-4.65 1.5-1.74 0-3.34-.56-4.65-1.5Zm10.79-1.38a9.947 9.947 0 0 0-12.28 0A7.957 7.957 0 0 1 2 10c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12Z"
    />
    <path
      fill={props.color}
      d="M10 4C8.07 4 6.5 5.57 6.5 7.5S8.07 11 10 11s3.5-1.57 3.5-3.5S11.93 4 10 4Zm0 5c-.83 0-1.5-.67-1.5-1.5S9.17 6 10 6s1.5.67 1.5 1.5S10.83 9 10 9Z"
    />
  </svg>
);
export default UserIcon;
