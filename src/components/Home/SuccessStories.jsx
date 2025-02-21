import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const successStories = [
  {
    id: 1,
    name: "Alice Johnson",
    earnings: "$500+ earned",
    message: "This platform changed my life! I can now earn from home easily.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Mark Smith",
    earnings: "$1,200+ earned",
    message: "Completing tasks here has been a great side hustle for me!",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 3,
    name: "Sophia Lee",
    earnings: "$750+ earned",
    message: "Fast payments and easy tasks! Highly recommended.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 4,
    name: "James Carter",
    earnings: "$300+ earned",
    message: "I love the flexibility and variety of tasks available!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-12 bg-gray-100 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-primary mb-6">
          Success Stories
        </h2>
        <p className="text-gray-600 mb-8">
          See how our users are earning and thriving with us.
        </p>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-4xl mx-auto"
        >
          {successStories.map((story) => (
            <SwiperSlide key={story.id}>
              <div className="card bg-white shadow-lg p-6 rounded-lg text-center">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-primary"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {story.name}
                </h3>
                <p className="text-primary font-bold">{story.earnings}</p>
                <p className="text-gray-600 mt-2">
                  &quot;{story.message}&quot;
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;
