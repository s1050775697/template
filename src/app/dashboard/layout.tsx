import Sidebar from "@/components/shared/Sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard - Travel AI",
  description: "This is Travel AI",
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="h-full flex bg-travel-black">
      <Sidebar />
      <div className="flex-1 h-full overflow-auto">{children}</div>
    </main>
  );
};

export default DashboardLayout;
