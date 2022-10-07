import { useState } from "react";
import Dropzone from "../components/Dropzone";

const ImagePredict = () => {
  const [title, setTitle] = useState("");
  const [hasImage, setHasImage] = useState(false);

  return (
    <div className="flex w-full flex-col gap-6 py-10">
      {hasImage ? (
        title !== "" ? (
          <div className="flex justify-center text-white">
            <div className="text-4xl">
              It's <span className="font-bold">{title}</span>!
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-14 w-64 animate-pulse rounded-xl bg-indigo-700"></div>
          </div>
        )
      ) : (
        ""
      )}
      <Dropzone setTitle={setTitle} setHasImage={setHasImage} />
    </div>
  );
};

export default ImagePredict;
