import { BsCoin, BsGithub, BsMessenger } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary p-2">
      <div className="flex flex-col md:flex-row justify-between items-center container mx-auto">
        <aside>
          <p className="flex gap-2 items-center justify-center">
            <BsCoin />
            <span className="font-bold text-lg md:text-2xl">Earnify</span>
          </p>
        </aside>
        <p className="text-sm md:text-base">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
        <nav>
          <div className="flex items-center gap-2">
            <h6 className="text-lg font-bold">Social</h6>
            <a
              href="https://github.com/adnansyed101"
              target="_blank"
              className="text-lg md:text-2xl"
            >
              <BsGithub />
            </a>
            <a
              href="https://m.me/adnansyed101"
              target="_blank"
              className="text-lg md:text-2xl"
            >
              <BsMessenger />
            </a>
            <a
              href="https://www.linkedin.com/in/adnansyed101/"
              target="_blank"
              className="text-lg md:text-2xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
