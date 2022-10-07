import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { drawRect } from "../utils/drawUtil";
import {
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/20/solid";

const CamPredict = () => {
  const [cam, setCam] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (cam) coco();
  }, [cam]);

  const webcamController = () => setCam(!cam);

  const coco = async () => {
    const net = await cocossd.load();
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    } else {
      console.log("OK");
    }
  };

  return (
    <div className="my-5">
      {cam ? (
        <>
          <Webcam
            ref={webcamRef}
            muted={true}
            style={{ position: "absolute" }}
          />
          <canvas ref={canvasRef} className="relative"></canvas>
          <button
            type="button"
            onClick={webcamController}
            className="mx-auto mt-10 flex items-center gap-2 rounded-full border-2 border-red-600 bg-red-600 px-5 py-2 font-semibold text-white transition-all duration-150 hover:border-red-500 hover:bg-red-700"
          >
            <VideoCameraSlashIcon className="h-5 w-5" />
            <span>STOP RECORD</span>
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={webcamController}
          className="mx-auto mt-10 flex items-center gap-2 rounded-full border-2 border-indigo-900 bg-indigo-900 px-5 py-2 font-semibold text-white transition-all duration-150 hover:border-indigo-600 hover:bg-black hover:bg-opacity-40"
        >
          <VideoCameraIcon className="h-5 w-5" />
          <span>START RECORD</span>
        </button>
      )}
    </div>
  );
};

export default CamPredict;
