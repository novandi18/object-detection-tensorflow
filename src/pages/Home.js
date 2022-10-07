import { Link, Outlet, useLocation } from "react-router-dom";
import { CameraIcon, PhotoIcon } from "@heroicons/react/20/solid";

const Home = () => {
  const location = useLocation();

  return (
    <main className="min-h-screen bg-indigo-800">
      <section className="flex items-center justify-center text-sm font-medium text-indigo-900">
        <Link
          className={`flex items-center gap-2 rounded-l-full px-6 py-2 ${
            location.pathname === "/" ? "bg-yellow-500" : "bg-yellow-400"
          }`}
          to="/"
        >
          <CameraIcon className="h-5 w-5" />
          CAMERA
        </Link>
        <Link
          className={`flex items-center gap-2 rounded-r-full px-6 py-2 ${
            location.pathname === "/images" ? "bg-yellow-500" : "bg-yellow-400"
          }`}
          to="/images"
        >
          <PhotoIcon className="h-5 w-5" />
          IMAGES
        </Link>
      </section>

      <section className="h-full px-5 md:flex md:justify-center md:px-0">
        <Outlet />
      </section>
    </main>
  );
};

export default Home;
