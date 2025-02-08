import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    image:
      "https://img.freepik.com/free-photo/photo-cheerful-curly-haired-woman-feels-like-winner-clenches-fists-makes-victory-gesture-exclaims-with-happiness-wears-yellow-jumper-achieves-goal-gets-triumph-poses-indoor-yes-i-did-it_273609-37571.jpg?semt=ais_hybrid",
    role: "Freelancer",
    feedback:
      "This platform has completely transformed how I utilize my spare time. The tasks are simple, and the earnings are great!",
  },
  {
    id: 2,
    name: "Bob Smith",
    image:
      "https://cdn.tinybuddha.com/wp-content/uploads/2016/01/Happy-Guy.jpg",
    role: "Graphic Designer",
    feedback:
      "I love how flexible this platform is. I can work whenever I want and still make a decent income.",
  },
  {
    id: 3,
    name: "Catherine Brown",
    image:
      "https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg",
    role: "Student",
    feedback:
      "As a student, this platform helps me earn extra pocket money without affecting my studies. Highly recommend it!",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonial</h2>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          loop={true}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="card bg-neutral shadow-lg p-6 rounded-lg text-center">
                <div className="avatar">
                  <div className="w-24 h-24 rounded-full mx-auto ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-4">
                  {testimonial.name}
                </h3>
                <p className="text-sm">{testimonial.role}</p>
                <p className="mt-4 italic">
                  &quot;{testimonial.feedback}&quot;
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
