import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    {
      image:
        "https://cdn.pixabay.com/photo/2014/02/15/12/57/not-266530_1280.jpg",
      description: "Description for image 1",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/11/23/00/11/dog-1851378_960_720.jpg",
      description: "Description for image 2",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2017/09/16/01/38/shelter-cat-2754333_1280.jpg",
      description: "Description for image 3",
    },
  ];

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="relative ">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="flex items-center justify-center">
            <div className="flex flex-row w-full ">
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className="w-1/2 h-auto object-cover"
              />
              <div className="bg-gray-200 w-1/2 p-5 text-lg">
                {slide.description}
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-btnColor text-white border-none p-3 cursor-pointer text-2xl rounded-full z-10 hover:bg-btnHover"
        onClick={handleNextClick}
      >
        &gt;
      </button>
    </div>
  );
};

export default SliderComponent;
