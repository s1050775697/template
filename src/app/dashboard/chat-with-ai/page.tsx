"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import Button from "@/components/ui/Button";
import UserIcon from "@/components/svgs/UserIcon";
import useAppStore from "@/store/app.store";
import useChatWithAi from "@/hooks/useChatWithAi";

const data = {
  assistant_id: "",
  checkpoint: {
    thread_id: "",
    checkpoint_ns: "",
    checkpoint_id: "",
    checkpoint_map: {},
  },
  input: {},
  command: {
    update: {},
    resume: null,
    goto: {
      node: "",
      input: {},
    },
  },
  metadata: {},
  config: {
    tags: [""],
    recursion_limit: 1,
    configurable: {},
  },
  webhook: "",
  interrupt_before: "*",
  interrupt_after: "*",
  stream_mode: ["values"],
  stream_subgraphs: false,
  on_disconnect: "cancel",
  feedback_keys: [""],
  multitask_strategy: "reject",
  if_not_exists: "reject",
  after_seconds: 1,
};

const ChatWithAIPage = () => {
  const lastMessageRef: any = useRef<HTMLDivElement | null>(null);
  const { responses, isAccessingChat, onChatWithAI } = useChatWithAi();
  const { isSidebarToggled } = useAppStore((state) => state);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responses]);

  return (
    <aside
      // className={`inline-block align-top bg-travel-black h-full relative overflow-y-auto py-10 px-8 ${
      //   isSidebarToggled ? "w-[calc(100%-375px)]" : "w-[calc(100%-108px)]"
      // }`}

      className={`inline-block align-top bg-travel-black h-full relative overflow-y-auto py-10 px-8 w-full`}
    >
      <aside className="w-full h-full flex flex-col gap-10">
        <section className="w-full inline-flex items-center justify-between bg-gray-500/10 backdrop-blur-[20px] rounded-[50px] py-[14px] px-6 h-[82px]">
          <p className="text-white text-lg font-bold">5-day trip to Shanghai</p>
          <div className="inline-flex items-center gap-2">
            <Button
              onClick={() => {}}
              className="h-[54px] w-[54px] !p-0 flex items-center justify-center "
            >
              <Image
                src="/svgs/three-dots.svg"
                alt="Left"
                width={4}
                height={8}
              />
            </Button>
            <Button
              onClick={() => {}}
              className="bg-secondary flex items-center justify-center text-white"
            >
              Explore nearby
            </Button>
          </div>
        </section>

        <section className="inline-flex items-center justify-between py-[14px] h-[calc(100%-100px)] overflow-y-auto">
          <ul className="h-full w-full mx-auto flex flex-col">
            {responses.length > 0 &&
              React.Children.toArray(
                responses.map((res: any, index: number) => (
                  <li
                    ref={index === responses.length - 1 ? lastMessageRef : null}
                    className={`mb-10 bg-[#2B2A2A]/40 backdrop-blur-[30] rounded-[20px] px-3 py-6 max-w-[300px] inline-flex items-start gap-3 w-full ${
                      res?.user === "ai" ? "mr-auto" : "ml-auto"
                    }`}
                  >
                    <Button
                      onClick={() => {}}
                      className="h-[40px] w-[40px] !p-0 flex items-center justify-center bg-secondary"
                    >
                      <UserIcon color="#fff" />
                    </Button>
                    <div className="text-white font-medium text-sm w-[calc(100%-60px)]">
                      {res?.text}
                    </div>
                  </li>
                ))
              )}
            {isAccessingChat ? (
              <li className="mb-10 bg-[#2B2A2A]/40 backdrop-blur-[30] rounded-[40px] p-6 min-h-[102px] w-[300px] inline-flex items-start gap-3 ai">
                <Button
                  onClick={() => {}}
                  className="h-[40px] w-[40px] !p-0 flex items-center justify-center bg-secondary"
                >
                  <SkeletonCircle size="10" />
                </Button>
                <div className="text-white font-medium text-sm text-justify w-[calc(100%-60px)]">
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onChatWithAI(input);
            setInput("");
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
      </aside>
    </aside>
  );
};

export default ChatWithAIPage;
