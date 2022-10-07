import PropTypes from "prop-types";

const Spinner = ({ color = "#312e81", size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-2 -2 45 45"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="5">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
};

Spinner.propTypes = {
  color: PropTypes.string, // Default color is bg-indigo-800
  size: PropTypes.number,
};

export default Spinner;
