import { BsCoin, BsGithub, BsMessenger } from "react-icons/bs";
import { IoMail } from "react-icons/io5";

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
              <p className="flex gap-2">
                <IoMail className="text-2xl" />
                Earnify@gmail.com
              </p>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
