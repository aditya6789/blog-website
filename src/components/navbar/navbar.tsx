import ContainerWrapper from "../containerWrapper";
import { Link , useLocation } from "react-router-dom";

export const navlinks = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "blog",
    href: "/blog",
  },
  {
    name: "contact",
    href: "/contact",
  },
];

const Navbar = () => {
    const location = useLocation();
  return (
    <nav>
      <ContainerWrapper>
        <div className="flex justify-between item-center py-10">
          <Link to={"/"}>
          <h1 className="text-black font-bold text-3xl">Horror Stories</h1>
          </Link>
          <div>
            <ul className="flex justify-start items-center gap-4">
              {navlinks.map((data, index) => (
                <Link to={data.href} key={index} className={`${location.pathname===data.href?"text-black":"text-gray-500  hover:text-black"} text-md font-medium`}>
                  <li>{data.name}</li>
                </Link>
              ))}
            </ul>

          </div>
        </div>
      </ContainerWrapper>
    </nav>
  );
};

export default Navbar;
