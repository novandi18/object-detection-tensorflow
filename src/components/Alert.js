import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

const Alert = ({ error }) => {
  return (
    <div className="flex justify-center">
      <div
        className={`w-fit px-4 ${
          error === "" ? "hidden" : "flex"
        } h-10 items-center justify-center rounded-xl bg-red-500 text-sm text-white shadow-sm`}
      >
        <span className="flex items-center text-xs">
          <ExclamationCircleIcon className="mr-1 h-4 w-4" />
          {error}
        </span>
      </div>
    </div>
  );
};

Alert.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Alert;
