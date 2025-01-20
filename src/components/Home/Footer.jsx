import { BsCoin, BsGithub, BsMessenger } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary p-2">
      <div className="flex flex-col md:flex-row justify-between items-center container mx-auto">
        <aside>
          <p className="flex gap-2 items-center justify-center">
            <BsCoin />
            <span className="font-bold text-2xl">Earnify</span>
          </p>
        </aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        <nav>
          <div className="flex justify-center gap-2">
            <h6 className="footer-title text-center">Scoial</h6>
            <div className="flex justify-center gap-2">
              <a
                href="https://github.com/adnansyed101"
                target="_blank"
                className="text-2xl"
              >
                <BsGithub />
              </a>
              <a
                href="https://m.me/adnansyed101"
                target="_blank"
                className="text-2xl"
              >
                <BsMessenger />
              </a>
              <a
                href="https://www.linkedin.com/in/adnansyed101/"
                target="_blank"
                className="text-2xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
