import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

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
        "https://images.pexels.com/photos/7470752/pexels-photo-7470752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "Who we are",
      description:
        "Welcome to 'Sahaara', your trusted online community dedicated to the rescue and adoption of animals. We serve as a dynamic platform where individuals passionate about animal welfare can connect, collaborate, and make a real difference in the lives of animals in need. Our platform bridges the gap between animal rescuers, organizations, and potential adopters. We provide a space where users can easily find and adopt pets looking for loving homes. We collaborate with various animal rescue organizations, providing them with tools to manage their operations, promote animals in need, and engage with a broader audience. Our interactive forums and social features allow users to share stories, seek advice, and support one another in their animal rescue and adoption journeys. Whether you’re a seasoned rescuer or a first-time adopter, you’ll find a supportive community here.",
    },
    {
      image:
        "https://images.pexels.com/photos/12661995/pexels-photo-12661995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      headings: ["Mission", "Vision"],
      descriptions: [
        {
          heading: "Mission",
          text: "Our mission is to connect compassionate individuals and reputable animal rescue organizations through a user-friendly platform, facilitating the rescue and adoption of animals in need by providing resources, information, and communication tools.",
        },
        {
          heading: "Vision",
          text: "Our vision is to become the leading online platform where communities collaborate to ensure every animal finds a loving home, promoting responsible pet adoption and fostering a network of support for animal welfare initiatives.",
        },
      ],
    },
    {
      image:
        "https://images.pexels.com/photos/5519502/pexels-photo-5519502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "Join Us",
      description:
        "There are many ways to get involved with 'Sahaara'. Whether you choose to adopt, volunteer, or donate, your support is crucial to our mission. Together, we can create a community where every animal is treated with the love and respect they deserve. Thank you for visiting Sahaara. We invite you to explore our website, learn more about our work, and join us in our mission to give every animal a chance at a better life.",
    },
  ];

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-full border-t-2"
          >
            <div className="flex flex-row w-full">
              <div className="w-full flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={`Slide ${index}`}
                  className="w-full h-[100%] object-cover"
                />
              </div>
              <div className="flex flex-col md:w-2/3 h-full p-4">
                {slide.headings ? (
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ">
                    {slide.descriptions.map((desc, i) => (
                      <div key={i} className="flex flex-col flex-1">
                        <div className="font-bold text-2xl p-2 text-center text-secondary font-roboto">
                          {desc.heading}
                        </div>
                        <div className="text-center text-btnHover p-5 text-md font-roboto">
                          {desc.text}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex-auto font-bold text-2xl p-2 text-center text-secondary font-roboto">
                      {slide.heading}
                    </div>
                    <div className="flex-auto text-center text-btnHover p-5 text-md font-roboto ">
                      {slide.description}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <button
        className="absolute bottom-7 left-4 transform -translate-y-1/2 bg-btnColor text-white border-none p-3 cursor-pointer text-2xl rounded-full z-10 hover:bg-btnHover"
        onClick={handlePrevClick}
      >
        <MdNavigateBefore />
      </button>
      <button
        className="absolute bottom-7 right-4 transform -translate-y-1/2 bg-btnColor text-white border-none p-3 cursor-pointer text-2xl rounded-full z-10 hover:bg-btnHover"
        onClick={handleNextClick}
      >
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default SliderComponent;
