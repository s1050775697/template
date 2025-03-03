import { Metadata } from "next";
import React from "react";
import TravelQuizLayoutPage from "../../../../components/shared/TravelQuizLayoutPage";

export const metadata: Metadata = {
  title: "Dashboard - Travel AI",
  description: "This is Travel AI",
};

const TravelQuizLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return <TravelQuizLayoutPage>{children}</TravelQuizLayoutPage>;
};

export default TravelQuizLayout;
