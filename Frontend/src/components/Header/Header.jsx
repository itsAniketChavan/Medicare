import { useEffect, useRef, useContext } from "react";

import logo from "../../assets/images/logo.png";
import { BiMenu } from "react-icons/bi";
import { NavLink, Link } from "react-router-dom";
import headerImage from "../../assets/images/header-bg.png";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "services",
  },
  {
    path: "/contact",
    display: "contact",
  },
  {
    path: "/AiChat",
    display: "AI Help",
  },
];

const Header = () => {
  const headerStyle = {
    backgroundImage: `url(${headerImage})`, // Use the imported image as a background
    backgroundSize: "cover",
  };

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header
      className="header flex items-center"
      style={headerStyle}
      ref={headerRef}
    >
      <div className="container">
        <div className="flex items-center justify-between ">
          {/* -------logo------ */}

          <Link to="/home">
            <div>
              <img src={logo} alt="" />
            </div>
          </Link>
          {/* =======menu===== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? " text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor "
                    }
                    style={{ fontSize: "20px" }}
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ----- Nav Right--- */}

          <div className="flex items-center gap-4">
  {token && user ? (
  <div>
    <Link to={`${role === 'doctor' ? "/doctors/profile/me" : role === 'admin' ? "/admin/profile" : "/users/profile/me"}`}>
      <div className="flex items-center gap-4">
        <h2 className="font-bold hover:text-primaryColor">{user?.name}</h2>
        <figure className="w-[35px] h-[35px] rounded-full cursor-pointer border border-black">
          <img src={user?.photo} className="w-full rounded-full" alt="" />
        </figure>
      </div>
    </Link>
  </div>
) : (
  <Link to="/login">
    <button className="bg-primaryColor w-[100px] h-[40px] text-white font-[600] flex items-center justify-center rounded-[100px] hover:bg-blue-800">
      Login
    </button>
  </Link>
)}

  <span className="md:hidden" onClick={toggleMenu}>
    <BiMenu className="w-6 h-6 cursor-pointer" />
  </span>
</div>

        </div>
      </div>
    </header>
  );
};

export default Header;
