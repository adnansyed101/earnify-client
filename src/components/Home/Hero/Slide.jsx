import PropTypes from "prop-types";

const Slide = ({ content }) => {
  const { imgURL, heading, subheading } = content;
  return (
    <div
      className="hero min-h-[calc(100vh-50px)] text-white"
      style={{
        backgroundImage: `url(${imgURL})`,
        backgroundPosition: "top",
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center py-36">
        <div className="max-w-xl">
          <h1 className="mb-5 text-2xl md:text-6xl font-bold">{heading}</h1>
          <p className="mb-5 text-sm md:text-base">{subheading}</p>
        </div>
      </div>
    </div>
  );
};

Slide.propTypes = {
  content: PropTypes.object,
};

export default Slide;
