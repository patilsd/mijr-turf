import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BackgroundSliderProps {
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const BackgroundSlider: React.FC<BackgroundSliderProps> = ({
  images,
  currentIndex,
  onPrevious,
  onNext,
}) => {
  return (
    <>
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-30' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
    </>
  );
};