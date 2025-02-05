import PropTypes from "prop-types";

const Slide = ({ content }) => {
  const { imgURL, heading, subheading, buttonText } = content;
  return (
    <div
      className="hero text-white min-h-[calc(100vh-100px)]"
      style={{
        backgroundImage: `url(${imgURL})`,
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center py-36">
        <div className="max-w-xl">
          <h1 className="mb-5 text-2xl md:text-6xl font-bold">{heading}</h1>
          <p className="mb-5 text-sm md:text-base">{subheading}</p>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

Slide.propTypes = {
  content: PropTypes.object,
};

export default Slide;
