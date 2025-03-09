import React, { useState, useEffect } from 'react';

const Image = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    
    const loadImage = async () => {
      try {
        
        const cache = await caches.open('images-cache');
        const cachedResponse = await cache.match(src);
        
        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          setImageSrc(URL.createObjectURL(blob));
          setLoading(false);
          return;
        }

        
        img.onload = async () => {
          setImageSrc(src);
          setLoading(false);
          
         
          const response = await fetch(src);
          const responseClone = response.clone();
          await cache.put(src, responseClone);
        };

        img.onerror = () => {
          console.error('Error loading image:', src);
          setLoading(false);
        };
      } catch (error) {
        console.error('Error handling image:', error);
        setLoading(false);
      }
    };

    loadImage();

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [src]);

  if (loading) {
    return (
      <div className={`image-placeholder ${className}`}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

export default Image;
