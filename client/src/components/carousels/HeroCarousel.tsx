import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

const images = [
  {
    url: './images/sarees1.PNG',
    title: 'Silk Saree Extravaganza',
    description: 'Discover exquisite traditional silk sarees that celebrate elegance and heritage.',
    color: '#8B4513'
  },
  {
    url: './images/saress2.PNG',
    title: 'Elegant Timeless Designs',
    description: 'Experience the perfect blend of style and sophistication with our curated collection.',
    color: '#C41E3A'
  },
  {
    url: './images/sarees3.PNG',
    title: 'Premium Luxury Fabrics',
    description: 'Indulge in rich textures and intricate patterns, crafted for the modern connoisseur',
    color: '#DAA520'
  }
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setProgress(0);
  }, [isAnimating]);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setProgress(0);
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? 'right' : 'left');
    setIsAnimating(true);
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      goToPrevious();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === ' ') {
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Autoplay with progress bar
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [goToNext, isPaused]);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex
                ? 'opacity-100 translate-x-0 scale-100 rotate-0'
                : direction === 'right'
                ? index < currentIndex
                  ? 'opacity-0 -translate-x-full scale-95 -rotate-2'
                  : 'opacity-0 translate-x-full scale-95 rotate-2'
                : index > currentIndex
                ? 'opacity-0 translate-x-full scale-95 rotate-2'
                : 'opacity-0 -translate-x-full scale-95 -rotate-2'
            }`}
          >
            {/* Image with parallax effect */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className={`w-full h-full object-cover transition-transform duration-[10000ms] ${
                  index === currentIndex ? 'scale-110' : 'scale-100'
                }`}
              />
              <div 
                className="absolute inset-0 transition-colors duration-1000"
                style={{
                  background: `linear-gradient(to top, ${image.color}dd 0%, ${image.color}44 40%, transparent 70%)`
                }}
              />
              
              {/* Animated particles */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 bg-white rounded-full ${
                      index === currentIndex ? 'animate-pulse' : ''
                    }`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 3}s`
                    }}
                  />
                ))}
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
                <div className={`transition-all duration-1000 ${
                  index === currentIndex
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}>
                  <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm">
                    {index + 1} / {images.length}
                  </div>
                  <h2 className="text-4xl md:text-7xl font-bold mb-4 tracking-tight">
                    {image.title}
                  </h2>
                  <p className="text-lg md:text-2xl max-w-2xl">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        disabled={isAnimating}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 group hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      
      <button
        onClick={goToNext}
        disabled={isAnimating}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 group hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePause}
        className="absolute top-4 md:top-8 right-4 md:right-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 z-10 group hover:scale-110"
        aria-label={isPaused ? 'Play' : 'Pause'}
      >
        {isPaused ? (
          <Play className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <Pause className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>

      {/* Progress Indicators with Progress Bars */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className="relative disabled:cursor-not-allowed group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-white/30 w-16 md:w-20 h-3'
                : 'bg-white/50 hover:bg-white/75 w-3 h-3 group-hover:scale-125'
            }`}>
              {index === currentIndex && (
                <div
                  className="absolute inset-0 bg-white rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Keyboard hint */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 text-white/60 text-xs md:text-sm backdrop-blur-sm bg-black/20 px-3 py-2 rounded-lg z-10">
        Use ← → or swipe
      </div>
    </div>
  );
};

export default Carousel;