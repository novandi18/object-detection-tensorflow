import github from "../assets/icon/github.svg";

const About = () => {
  return (
    <main className="flex flex-col gap-7 px-4 text-white md:px-14">
      <div>
        <h2 className="text-5xl font-bold">About</h2>
        <p className="py-5 text-xl">
          <span className="font-semibold italic">Let You Know!</span> allows you
          to be able to detect / find out the object you want to know just by
          uploading an image or by showing it directly via a webcam. This
          application is intended for all users and is very suitable for use by
          children who are new to the world.
        </p>
      </div>
      <div className="flex flex-col">
        <h2 className="py-3 text-3xl font-bold">Want to be a contributor?</h2>
        <span>
          Feel free to pull request for fixing bugs, new features and many more
        </span>
        <a
          href="https://github.com/novandi18/object-detection-tensorflow"
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex items-center self-start rounded-full bg-gray-900 py-1 pl-4 pr-5 transition-all duration-150 hover:bg-gray-800 hover:shadow-xl"
        >
          <img src={github} alt="Github" className="h-10 w-10" />
          <span>object-detection-tensorflow</span>
        </a>
      </div>
    </main>
  );
};

export default About;
