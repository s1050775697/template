import { Image } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <section className="w-[60%] 768:w-full flex justify-between mt-12 768:px-5 768:flex-col">
      <aside className="flex flex-col gap-5">
        <div>
          <p className="text-lg text-white font-normal">+380 (93) 485-34-34</p>
          <p className="text-lg text-white font-normal">+380 (97) 485-34-34</p>
          <p className="text-lg text-white font-normal">info@lucia.com</p>
        </div>

        <div className="inline-flex items-center justify-start gap-3">
          <Image src="/facebook.png" w="24px" height="24px" />
          <Image src="/insta.png" w="24px" height="24px" />
          <Image src="/twitter.png" w="24px" height="24px" />
        </div>
        <p className="text-lg text-white font-normal">
          © All rights Reserved. Lucia 2024
        </p>
      </aside>

      <aside className="flex flex-col justify-between">
        <div>
          <p className="text-lg text-white font-bold">FAQ</p>
          <p className="text-lg text-white font-bold">MEDIA</p>
          <p className="text-lg text-white font-bold">ACCREDITATION</p>
        </div>

        <div className="inline-flex items-start gap-3">
          <p className="text-lg text-white font-normal">Privacy Policy</p>
          <p className="text-lg text-white font-normal">Terms of Use</p>
        </div>
      </aside>
    </section>
  );
};

export default Footer;
