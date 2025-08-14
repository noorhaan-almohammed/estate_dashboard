import { useState } from "react";

type ImageSliderProps = {
  images: string[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden mb-4 ">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="w-[80%] mx-auto h-full object-contain transition duration-300"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute cursor-pointer border border-mainPurple text-mainPurple bg-bg aspect-square w-10 h-10 top-1/2 left-2 transform -translate-y-1/2 flex items-center justify-center p-2 rounded-full shadow hover:shadow-md hover:shadow-mainPurple"
          >
          <img src="/assets/images/leftArrow.svg" alt="left"/>{}  
          </button>
          <button
            onClick={nextImage}
            className="absolute cursor-pointer border border-mainPurple text-mainPurple bg-bg aspect-square w-10 h-10 top-1/2 right-2 transform -translate-y-1/2  flex items-center justify-center p-2 rounded-full shadow hover:shadow-md hover:shadow-mainPurple "
          >
            <img src="/assets/images/rightArrow.svg" alt="right" />{} 
          </button>
        </>
      )}

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-mainPurple" : "bg-secText"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
