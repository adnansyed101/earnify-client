import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 text-center">
      <h1 className="text-4xl font-semibold">
        Oops Error 404. Something went wrong. 
      </h1>
      <Link to="/" className="btn btn-primary">
        Go Back To Home
      </Link>
    </div>
  );
};

export default Error;
