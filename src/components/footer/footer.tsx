import ContainerWrapper from "../containerWrapper";
import { navlinks } from "../navbar/navbar";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-2 mt-10">
      <ContainerWrapper>
        <div className="md:flex justify-between items-center py-5 ">
          <h1>
            © {new Date().getFullYear()}
            Horro Stories . All rights reserved.
          </h1>
          <div>
            <ul className="flex justify-start items-center gap-4">
              {navlinks.map((data, index) => (
                <Link to={data.href} key={index}>
                  <li>{data.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </ContainerWrapper>
    </footer>
  );
};

export default Footer;
