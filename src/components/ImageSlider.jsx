import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ImageSlider({ images = [], alt = 'Property photo' }) {
  const [index, setIndex] = useState(0);
  const slides = images.length ? images : [];

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) {
    return (
      <div className="flex h-[42vh] min-h-[280px] items-center justify-center bg-fog text-ink/50 sm:h-[52vh]">
        No images available
      </div>
    );
  }

  const go = (dir) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden bg-ink">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt={`${alt} ${i + 1}`}
            className="h-[42vh] min-h-[280px] w-full shrink-0 object-cover sm:h-[52vh]"
          />
        ))}
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-canvas/90 p-2 text-ink shadow transition hover:bg-canvas"
          >
            <FiChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-canvas/90 p-2 text-ink shadow transition hover:bg-canvas"
          >
            <FiChevronRight size={22} />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index ? 'bg-accent' : 'bg-canvas/70'
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
