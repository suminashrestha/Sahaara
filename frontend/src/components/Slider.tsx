import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";

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
        "https://cdn.pixabay.com/photo/2017/09/16/01/38/shelter-cat-2754333_1280.jpg",
      description: "Description for image 1",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/02/05/19/54/dog-7770426_960_720.jpg",
      description: "Description for image 2",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/01/01/02/16/animal-welfare-1116215_1280.jpg",
      description: "Description for image 3",
    },
  ];

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <div className="slide-content">
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className="slide-image"
              />
              <div className="slide-description">{slide.description}</div>
            </div>
          </div>
        ))}
      </Slider>
      <button className="next-button bg-" onClick={handleNextClick}>
        {">"}
      </button>
    </div>
  );
};

export default SliderComponent;
