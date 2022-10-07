import { useDropzone } from "react-dropzone";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as mobilenet from "@tensorflow-models/mobilenet";
import Alert from "./Alert";

const Dropzone = ({ setTitle, setHasImage }) => {
  const [image, setImage] = useState("");
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const img = useRef(null);
  const [bbox, setBbox] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image !== "") {
      setLoading(true);
      setHasImage(true);
      setTitle("");
      setBbox([]);
      predictCocossd();
      predictMobilenet();
    }
  }, [image, setHasImage, setTitle]);

  const predictCocossd = async () => {
    const model = await cocoSsd.load();
    const predictions = await model.detect(img.current);
    if (predictions.length) {
      const data = predictions[0];
      setBbox(data["bbox"]);
    }
  };

  const predictMobilenet = async () => {
    const model = await mobilenet.load();
    const predictions = await model.classify(img.current);
    if (predictions.length) {
      const name = predictions[0].className.split(", ")[0];
      setTitle(name.charAt(0).toUpperCase() + name.slice(1));
    } else {
      setError("Failed to detect image, try again with another image.");
      setBbox([0, 0, 0, 0]);
    }
    setLoading(false);
  };

  const dropImage = useCallback((acceptedFiles, fileRejections) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setError("");
      reader.onload = () => {
        setImage(reader.result);
      };
    });

    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === "file-too-large") setError("File is larger than 2MB");
        if (err.code === "file-invalid-type")
          setError("File type must be PNG/JPG/JPEG");
      });
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false, // Only one image
    maxSize: 2097152, // Max file is 2MB
    maxFiles: 1,
    onDrop: dropImage,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    noClick: loading,
  });

  return (
    <>
      <div className="grid place-content-center">
        <div
          {...getRootProps({ className: "dropzone" })}
          className={`flex ${
            image === "" ? "h-72 w-full lg:w-[500px]" : ""
          } scale-100 select-none items-center justify-center overflow-hidden rounded-md bg-white outline outline-0 outline-indigo-700 transition-all duration-150 ${
            loading
              ? ""
              : "cursor-pointer hover:scale-95 hover:outline-[16px] hover:brightness-90 active:scale-90 active:bg-gray-200 active:outline-[32px]"
          } ${drag ? "scale-95 outline-[16px] brightness-90" : ""}`}
          onDragOver={() => setDrag(true)}
          onDragLeave={() => setDrag(false)}
        >
          <input {...getInputProps()} />
          {image === "" ? (
            <div className="text-center text-gray-600">
              <div className="flex flex-col justify-center">
                <div className="flex justify-center">
                  <CloudArrowUpIcon className="self-centers mb-2 h-12 w-12 animate-bounce" />
                </div>
                <span className="px-5">
                  Drag 'n' drop single image here, or click to select image
                </span>
                <span className="text-sm text-gray-400">
                  {"(Max. 2MB & File types PNG/JPG/JPEG)"}
                </span>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`absolute border-2 border-white`}
                style={{
                  left: `${Math.ceil(bbox[0])}px`,
                  top: `${Math.ceil(bbox[1])}px`,
                  width: `${Math.ceil(bbox[2])}px`,
                  height: `${Math.ceil(bbox[3])}px`,
                }}
              ></div>
              <img
                src={image}
                alt="Foto"
                className="max-h-full md:max-h-80"
                ref={img}
                crossOrigin="anonymous"
              />
            </>
          )}
        </div>

        {image === "" ? (
          ""
        ) : loading ? (
          ""
        ) : (
          <div className="mt-2 grid place-content-center text-center text-sm text-white">
            Click the image to change
          </div>
        )}
      </div>

      <Alert error={error} />
    </>
  );
};
export default Dropzone;
