import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";


// Define props type
interface ImageComponentProps {
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  fallbackSrc?: string;
  isLoading?: boolean;
  isTable?: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src = "https://example.com",
  alt = "#",
  className = "",
  imgClassName = "",
  fallbackSrc = "",
  isLoading,
  isTable = false,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (src && src.trim() !== "") {
      setImageSrc(src);
    }

    const img = new Image();
    img.onload = () => {
      setIsImageLoaded(true);
    };
    img.src = src;

    if (!isLoading && !src) {
      setIsImageLoaded(true);
      // setImageSrc(fallbackSrc);
    }
  }, [src, fallbackSrc, isLoading]);

  const handleError = () => {
    if (imageSrc !== fallbackSrc) {
      // setImageSrc(fallbackSrc as string); // ⬅️ using `as` here for type assertion
      setIsImageLoaded(true);
    }
  };
  return (
    <div
      className={twMerge(
        `relative h-full w-full bg-table-head-primary rounded-md p-[5px] animate-scale-up ${isTable ? "size-16" : ""
        }`,
        className
      )}
    >
      {!isImageLoaded && (
        <div className="image-loader h-full w-full flex items-center justify-center">
          <img
            // src={searchingHorse}
            alt="Loading..."
            className="w-full h-full animate-[pulse_1s_ease-in-out_infinite]"
          />
        </div>
      )}

      {/* {isImageLoaded && ( */}
      <img
        src={
          imageSrc || (isLoading ? undefined : "https://example.com")
        }
        alt={alt}
        className={twMerge(
          `object-contains h-full w-full rounded-md animate-scale-up ${isTable ? "object-contain" : "object-contains"
          }`,
          imgClassName
        )}
        onError={handleError}
        loading="lazy"
      />
      {/* )} */}
    </div>
  );
};

export default ImageComponent;