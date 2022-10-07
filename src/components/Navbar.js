import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <header>
      <nav className="flex h-14 items-center justify-end gap-2 px-2 md:px-14">
        <Link
          to="/"
          className={`mr-2 rounded-full text-sm font-semibold text-white duration-100 ${
            location.pathname !== "/about"
              ? "text-white"
              : "text-indigo-300 hover:text-indigo-200"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`mr-2 rounded-full text-sm font-semibold text-white duration-100 ${
            location.pathname !== "/about"
              ? "text-indigo-300 hover:text-indigo-200"
              : "text-white"
          }`}
        >
          About
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
