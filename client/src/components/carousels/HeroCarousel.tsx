import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
interface CarouselSlideProps {
  slide: Slide;
  isActive: boolean;
}
interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
}
interface DotsIndicatorProps {
  slides: Slide[];
  currentSlide: number;
  onDotClick: (index: number) => void;
}
interface CarouselProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  height?: string;
}
const sampleSlides:Slide[] = [
  {
    id: 1,
    image: '/home/banner_31_.avif',
   
    buttonLink: '#'
  },
  {
    id: 2,
    image: '/home/banner_32_.avif',
  
    buttonLink: '#'
  },
  {
    id: 3,
    image: '/home/banner-3_2__1.avif',
  
    buttonLink: '#'
  },
  {
    id: 4,
    image: '/home/banner_33_.avif',
  
    buttonLink: '#'
  },
  
];

// Carousel Slide Component
const CarouselSlide = ({ slide, isActive }:CarouselSlideProps) => (
  <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
    <div className="relative w-full h-full">
      <Image
        src={slide.image}
        alt={""}
        width={7000}
        height={700}
        className='h-full w-full object-cover'
      />
    

    </div>
  </div>
);

// Navigation Arrows Component
const NavigationArrows = ({ onPrevious, onNext }:NavigationArrowsProps) => (
  <>
    <button
      onClick={onPrevious}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200 z-10"
    >
      <ChevronLeft className="h-6 w-6 text-gray-800" />
    </button>
    <button
      onClick={onNext}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200 z-10"
    >
      <ChevronRight className="h-6 w-6 text-gray-800" />
    </button>
  </>
);

// Dots Indicator Component
const DotsIndicator = ({ slides, currentSlide, onDotClick }:DotsIndicatorProps) => (
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={`w-3 h-3 rounded-full transition-all duration-200 ${
          index === currentSlide
            ? 'bg-white scale-110'
            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
        }`}
      />
    ))}
  </div>
);

// Main Carousel Component
const Carousel = ({ 
  slides = sampleSlides, 
  autoPlay = true, 
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  height = 'h-96'
}:CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, autoPlayInterval, slides.length]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index:number) => {
    setCurrentSlide(index);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(autoPlay);
  };

  return (
    <div 
      className={`relative ${height} overflow-hidden rounded-lg shadow-lg bg-gray-200`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <CarouselSlide
          key={slide.id}
          slide={slide}
          isActive={index === currentSlide}
        />
      ))}

      {/* Navigation Arrows */}
      {showArrows && (
        <NavigationArrows
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}

      {/* Dots Indicator */}
      {showDots && (
        <DotsIndicator
          slides={slides}
          currentSlide={currentSlide}
          onDotClick={goToSlide}
        />
      )}

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

// Usage Example Component
const HeroCarousel = () => {
  return (
    <div className="w-full h-[33rem] bg-amber-400">
     
      {/* Full-featured carousel */}
      <Carousel 
        slides={sampleSlides}
        autoPlay={true}
        autoPlayInterval={4000}
        showArrows={true}
        showDots={true}
        height="h-full"
      />
      
    </div>
  );
};

export default HeroCarousel;