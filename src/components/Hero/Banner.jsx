import Slide from "./Slide";
import slide1 from "../../assets/BannerImages/slide1.jpg"
import slide2 from "../../assets/BannerImages/slide2.jpg"
import slide3 from "../../assets/BannerImages/slide3.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  const bannerContents = [
    {
      id: 1,
      imgURL: slide1,
      heading: "Complete Tasks. Earn Rewards.",
      subheading:
        "Unlock earning opportunities by completing simple, everyday tasks tailored to your skills.",
      buttonText: "Start Earning",
    },
    {
      id: 2,
      imgURL: slide2,
      heading: "Your Time, Your Earnings.",
      subheading:
        "Join a platform that values your efforts and pays you for every task you complete.",
      buttonText: "Join Now",
    },
    {
      id: 3,
      imgURL: slide3,
      heading: "Effortless Tasks. Real Money.",
      subheading:
        "Make the most of your free time with tasks designed to be easy, fun, and rewarding.",
      buttonText: "Explore Tasks",
    },
  ];

  return (
    <section>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {bannerContents.map((content) => (
          <SwiperSlide key={content.id}>
            <Slide content={content} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
