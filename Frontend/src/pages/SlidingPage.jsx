import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";

// Import local images
import image1 from "../assets/slidingPhotos/image1.jpg";
import image2 from "../assets/slidingPhotos/image2.jpg";
import image3 from "../assets/slidingPhotos/image3.jpg";
import image4 from "../assets/slidingPhotos/image4.jpg";

const SlidingPage = () => {
  const [imageNum, setImageNum] = useState(1); // State to track current image number

  // Array of image objects with URLs
  const sliderImages = [
    { url: image1 },
    { url: image2 },
    { url: image3 },
    { url: image4 }
  ];

  return (
    <div className="image-slider-container px-40 py-6 mx-auto text-center text-primaryColor">
      {/* SimpleImageSlider component */}
      <SimpleImageSlider
        width={1400}
        height={500}
        images={sliderImages} // Pass the array of image objects
        showBullets={true}
        showNavs={true}
        autoPlay={true}
        autoPlayDelay={3}
        onStartSlide={(index, length) => {
          setImageNum(index + 1); // Update imageNum state when slide changes
        }}
      />
      {/* Optional: Additional content below the slider */}
      <h3 className="py-20 text-xl font-bold mb-4">...Keep Your Good Health At Your Fingertips...</h3>
    </div>
  );
};

export default SlidingPage;
