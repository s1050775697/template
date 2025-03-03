import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import useChatWithAi from "@/hooks/useChatWithAi";
import Image from "next/image";
import Button from "@/components/ui/Button";
import UserIcon from "@/components/svgs/UserIcon";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import {extractLocations, simpText, parseItinerary, getOpenAIS} from "@/utils/extractLocations";
import LocationModal from "@/components/shared/LocationModal";
import { TPlaces } from "@/types/maps";
import { fetchLocationDetails } from "@/utils/helpers";
import { getOpenAIEmbedding } from "@/utils/extractLocations";

interface AIChatProps {
  onApply: (input: string) => void;

  onAIResponse: (Location: number[], location: string) => void;
  userSearch: string;

}

const AIChat: React.FC<AIChatProps> = ({ onApply, onAIResponse, userSearch }) => {
  const lastMessageRef: any = useRef<HTMLDivElement | null>(null);
  const { responses, isAccessingChat, onChatWithAI,onCreateNewThread } = useChatWithAi();
  const [input, setInput] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedImageIndices, setSelectedImageIndices] = useState<number[]>([]);
  const [places, setPlaces] = useState<TPlaces[]>([]);
  const [summary , setSummary] = useState('')
  const apiKey = process.env.NEXT_PUBLIC_gaode_api_key;
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responses]);

  useEffect(() => {
    async function init() {
      const lastResponse = responses[responses.length - 1];
      if (lastResponse?.user === "ai") {
        const extractedLocations = extractLocations(lastResponse.text);
        const parseItinerarys = await parseItinerary(lastResponse.text);

        // console.log('lastResponse', lastResponse, parseItinerarys)
        //@ts-ignore
        onAIResponse(parseItinerarys, extractedLocations[0]);
      }
    }
    init()
  }, [responses]);

  // 点击切换图片
  const handleImageClick = (index: number, placeIndex: number) => {
    const newIndices = [...selectedImageIndices];
    newIndices[placeIndex] = index;
    setSelectedImageIndices(newIndices);
  };

  useEffect(() => {
    console.log("userSearch :: ", userSearch);
    onCreateNewThread().then(()=>{
      onChatWithAI(userSearch);
    })
    setInput("");
  }, [])

  return (
    <aside className="w-full h-full flex flex-col gap-5">
      <section className="w-full inline-flex items-center justify-between bg-gray-500/10 backdrop-blur-[20px] rounded-[50px] py-[14px] px-6 h-[82px]">
        <p className="text-white text-lg font-bold">{summary}</p>
        <Button
          onClick={() => {}}
          className="h-[54px] w-[54px] !p-0 bg-secondary flex items-center justify-center"
        >
          <Image src="/svgs/three-dots.svg" alt="Left" width={4} height={8} />
        </Button>
      </section>

      <section className="mt-2 inline-flex items-center justify-between bg-gray-500/10 backdrop-blur-[20px] rounded-[50px] py-[14px] h-[calc(100%-200px)] overflow-y-auto">
        <ul className="h-full w-[90%] mx-auto">
          {responses.length > 0 &&
            responses.map((res: any, index: number) => (
              <li
                key={index}
                ref={index === responses.length - 1 ? lastMessageRef : null}
                className={`block mb-10 bg-[#2B2A2A]/40 backdrop-blur-[30] rounded-[20px] p-2 min-h-[90px] ${
                  res?.user === "ai" ? "ai" : "you"
                }`}
              >
                <div className="inline-flex w-full items-start gap-3">
                  <Button
                    onClick={() => {
                      onAIResponse([] , res.text);
                    }}
                    className="h-[40px] w-[40px] !p-0 flex items-center justify-center bg-secondary"
                  >
                    <UserIcon color="#fff" />
                  </Button>
                  <div className="text-white font-medium text-sm w-[calc(100%-60px)] whitespace-pre-wrap">
                    <ReactMarkdown
                      components={{
                        p: ({children}) => <p className="mb-4">{children}</p>,
                        br: () => <br />,
                      }}
                    >
                      {res?.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </li>
            ))}
          {isAccessingChat ? (
            <li className="mb-10 bg-[#2B2A2A]/40 backdrop-blur-[30] rounded-[20px] p-6 min-h-[90px] w-[300px] inline-flex items-start gap-3 ai">
              <Button
                onClick={() => {}}
                className="h-[40px] w-[40px] !p-0 flex items-center justify-center bg-secondary"
              >
                <SkeletonCircle size="10" />
              </Button>
              <div className="text-white font-medium text-sm text-justify w-[calc(100%-60px)]">
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="2"
                />
              </div>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </section>
      {/* {locations.length > 0 && (
          <div className="flex flex-col">
            <div className="flex flex-row gap-2">
              {locations.slice(0, showMore ? locations.length : 1).map((location, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    onAIResponse(location);
                  }}
                  className="bg-secondary text-white rounded-md p-1 text-sm"
                >
                  {location}
                </Button>
              ))}
              {locations.length > 2 && (
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-secondary text-white rounded-md p-1 text-sm"
              >
                ...
              </Button>
            )}
            </div>
          </div>
        )}
      {isModalOpen && (
        <LocationModal
          locations={locations}
          onClose={() => setIsModalOpen(false)}
          onLocationSelect={(location) => {
            onAIResponse(location);
            setIsModalOpen(false);
          }}
        />
      )} */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChatWithAI(input);
          setInput("");
          // onApply(input);
        }}
        className="w-full inline-flex items-center justify-between bg-gray-500/10 backdrop-blur-[20px] rounded-[50px] py-[14px] px-6 h-[82px]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          className="bg-transparent outline-none border-none h-full placeholder:text-white placeholder:text-base placeholder:font-bold text-white text-base font-bold w-4/5"
        />

        <Button
          type="submit"
          className="h-[54px] w-[54px] !p-0 flex items-center justify-center"
        >
          <Image src="/svgs/send.svg" alt="Left" width={24} height={24} />
        </Button>
      </form>
      {/* 对话框右边推荐列表 */}
      {places.map((place, cardIndex) => (
        <div
          key={cardIndex}
          className="absolute left-[415px] backdrop-blur-[20px] bg-gray-500/10 rounded-[50px] rounded-lg mb-4 w-[300px]"
          style={{ top: cardIndex === 1 ? "127px" : "477px" }}
        >
          <div className="relative w-full h-40 flex justify-center items-center">
            <Image
              src={place.images?.[selectedImageIndices[cardIndex]]?.url || ""}
              alt={`Image ${cardIndex}`}
              width={128}
              height={128}
              className="w-full h-full rounded-lg"
            />
            <div className="absolute bottom-2 left-0 w-full flex justify-center">
              {place.images?.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 mx-1 rounded-full transition-all ${
                    index === selectedImageIndices[cardIndex] ? "bg-white scale-110" : "bg-gray-400"
                  }`}
                  onClick={() => handleImageClick(index, cardIndex)}
                />
              ))}
            </div>
          </div>
          <div className="p-4">
            <h4
              className="text-lg font-bold text-white mt-3 cursor-pointer"
              onClick={() => onAIResponse([], place.name)}
            >
              {place.name}
            </h4>
            <p className="text-sm text-white">Type: {place?.type?.split(';').slice(0, 2).join(', ')}</p>
            {/* <p className="text-sm text-white">Time: {place.type}</p> */}
            <p className="text-sm text-white">Area: {place.area}</p>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default AIChat;
