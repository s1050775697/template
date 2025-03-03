"use client";
import {
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import useAppStore from "@/store/app.store";
import Button from "@/components/ui/Button";
import { APP_ROUTES } from "@/typescript/enum";
import { useRouter } from "next/navigation";

const mockTrips = [
  {
    id: 1,
    title: "Sigiriya Travel Tips",
    location: "Sigiriya",
    date: "Mar 18-22",
    travelers: "2 travelers",
    image: "/sigiriya.jpg",
  },
];

const AccountPage = () => {
  const { isSidebarToggled } = useAppStore((state) => state);

  const router = useRouter();

  return (
    <aside
      className={`inline-block align-top bg-travel-black h-full overflow-y-auto py-10 px-8 w-full`}
    >
      {/* Profile Header */}
      <div className="flex justify-between items-start mb-8 ">
        <div className="flex items-start gap-6">
          <Avatar
            size="xl"
            name="Chanaka Prasanna"
            src="/profile-image.jpg"
            className="w-24 h-24"
          />
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Chanaka Prasanna
            </h1>
            <p className="text-travel-gray-3 mb-4">@chanaka-prasanna</p>
            <div className="flex gap-6 text-white">
              <div>
                <span className="font-bold">0</span> following
              </div>
              <div>
                <span className="font-bold">0</span> followers
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push(APP_ROUTES.SETTINGS)}
          className="px-4 py-2 border rounded-full bg-primary text-travel-black hover:bg-primary/90"
        >
          Edit profile
        </button>
      </div>

      {/* Tabs Section */}
      <div className="bg-travel-black">
        <Tabs variant="unstyled">
          <TabList className="border-b border-travel-gray-2 mb-6">
            <Tab
              className="mr-8 pb-4 font-medium text-white"
              _selected={{
                color: "var(--primary)",
                borderBottom: "2px solid var(--primary)",
              }}
            >
              Trips <span className="ml-2">1</span>
            </Tab>
            <Tab
              className="mr-8 pb-4 font-medium text-white"
              _selected={{
                color: "var(--primary)",
                borderBottom: "2px solid var(--primary)",
              }}
            >
              Saved <span className="ml-2">1</span>
            </Tab>
            <Tab
              className="pb-4 font-medium text-white"
              _selected={{
                color: "var(--primary)",
                borderBottom: "2px solid var(--primary)",
              }}
            >
              Guides <span className="ml-2">1</span>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="rounded-lg overflow-hidden bg-travel-gray"
                  >
                    <div className="relative h-48">
                      <Image
                        src={trip.image}
                        alt={trip.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-white">
                        {trip.title}
                      </h3>
                      <div className="text-sm text-travel-gray-3">
                        <p>{trip.location}</p>
                        <p>
                          {trip.date} • {trip.travelers}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </aside>
  );
};

export default AccountPage;
