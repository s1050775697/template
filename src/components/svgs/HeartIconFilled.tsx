import * as React from "react";
import { SVGProps } from "react";
const HeartIconFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill={props.color}
      d="M14.5.825c-1.74 0-3.41.81-4.5 2.09C8.91 1.635 7.24.825 5.5.825c-3.08 0-5.5 2.42-5.5 5.5 0 3.78 3.4 6.86 8.55 11.54l1.45 1.31 1.45-1.32c5.15-4.67 8.55-7.75 8.55-11.53 0-3.08-2.42-5.5-5.5-5.5Z"
    />
  </svg>
);
export default HeartIconFilled;
