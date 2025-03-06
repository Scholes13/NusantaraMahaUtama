import React, { useRef, useEffect, useState } from 'react';

interface ScrollGalleryProps {
  images: Array<{
    url: string;
    alt: string;
  }>;
}

export function ScrollGallery({ images }: ScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);

  // Clone images to ensure we have enough for a continuous loop
  const extendedImages = [...images, ...images, ...images, ...images, ...images];

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    
    if (!container || !content || images.length === 0) return;

    let position = 0;
    
    const moveImages = () => {
      if (isHovering) {
        animationRef.current = requestAnimationFrame(moveImages);
        return;
      }
      
      // Kecepatan pergeseran untuk website
      position -= 2;
      
      // Menghitung lebar item pertama
      const firstItem = content.children[0] as HTMLElement;
      const itemWidth = firstItem ? firstItem.offsetWidth : 0;
      
      // Ketika posisi terlalu jauh ke kiri
      if (position <= -itemWidth && itemWidth > 0) {
        // Pindahkan item pertama ke belakang
        position += itemWidth;
        content.appendChild(content.children[0]);
      }

      // Terapkan transformasi
      content.style.transform = `translateX(${position}px)`;
      
      animationRef.current = requestAnimationFrame(moveImages);
    };
    
    animationRef.current = requestAnimationFrame(moveImages);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [images.length, isHovering]);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={contentRef}
        className="flex"
        style={{ transition: 'none', willChange: 'transform' }}
      >
        {extendedImages.map((image, index) => (
          <div
            key={`image-${index}`}
            className="flex-none w-1/4 px-2"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-end justify-center">
                <div className="text-white p-4 translate-y-full hover:translate-y-0 transition-transform duration-300">
                  <p className="text-lg font-semibold text-center">{image.alt}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  );
}