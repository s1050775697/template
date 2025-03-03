import { images } from "@/utils/helpers";
import React, { useEffect, useRef, useState } from "react";

const CardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);

    if (sliderRef.current && imageRefs.current[index]) {
      const slider = sliderRef.current;
      const image = imageRefs.current[index];

      const sliderRect = slider.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();

      const scrollLeft =
        image.offsetLeft -
        slider.offsetLeft -
        sliderRect.width / 2 +
        imageRect.width / 2;

      slider.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (sliderRef.current && imageRefs.current[currentIndex]) {
      const slider = sliderRef.current;
      const image = imageRefs.current[currentIndex];

      const sliderRect = slider.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();

      const scrollLeft =
        image.offsetLeft -
        slider.offsetLeft -
        sliderRect.width / 2 +
        imageRect.width / 2;

      slider.scrollTo({ left: scrollLeft });
    }
  }, [currentIndex]);

  return (
    <section className="w-full max-h-[800px] overflow-hidden flex justify-center scrollbar-hide relative z-50">
      <div
        className="flex h-full justify-start duration-300 ease-in-out scroll-smooth transition-all py-24 scrollbar-hide"
        ref={sliderRef}
        style={{
          scrollSnapType: "x mandatory",
          scrollSnapStop: "always",
          overflowX: "scroll",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el: any) => (imageRefs.current[index] = el)} 
            className={`flex-shrink-0 w-[400px] h-[500px] relative transition-transform duration-300 ease-in-out rounded-[30px] overflow-hidden ${
              index === currentIndex ? "scale-[1.2] relative z-[999]" : "scale-90"
            } `}
            style={{ scrollSnapAlign: "center", margin: "0 4px" }}
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardSlider;
