import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import Navbar from "../../components/navbar";

const studentsList = [
  { id: 1, name: "John Doe", image: "/images/avatars/Image-1.png" },
  { id: 2, name: "Jane Smith", image: "/images/avatars/Image-2.png" },
  { id: 3, name: "Akech", image: "/images/avatars/me.jpg" },
  { id: 4, name: "Kon 1", image: "/images/avatars/kon1.jpg" },
  { id: 5, name: "Kon 2", image: "/images/avatars/kon2.jpg" },
  { id: 6, name: "Kon 3", image: "/images/avatars/kon3.jpg" },
  { id: 7, name: "Kon 4", image: "/images/avatars/kon4.jpg" },
];

const NewAttendance = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [faceDescriptors, setFaceDescriptors] = useState([]);
  const [facesDetected, setFacesDetected] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      preloadStudentDescriptors();
      const interval = setInterval(handleRecognition, 10000); // Check every 100ms
      return () => clearInterval(interval);
    }
  }, [modelsLoaded]);

  const preloadStudentDescriptors = async () => {
    const descriptors = [];
    studentsList.forEach(async (student) => {
      const img = await faceapi.fetchImage(student.image);
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      if (detection) {
        descriptors.push({ ...student, descriptor: detection.descriptor });
      }
    });
    setFaceDescriptors(descriptors);
  };

  const handleRecognition = async () => {
    if (!webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };

    faceapi.matchDimensions(canvas, displaySize);
    // const imgVid = await faceapi.fetchImage("/images/avatars/Image-1.png");

    // if (imgVid.naturalWidth === 0 || imgVid.naturalHeight === 0) {
    //   console.error("Image not properly loaded or has zero dimensions");
    //   return;
    // }

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    setFacesDetected(resizedDetections.length > 0);

    // Draw landmarks
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    // Compare detected faces with student descriptors
    resizedDetections.forEach((detection) => {
      const bestMatch = findBestMatch(detection.descriptor);
      if (bestMatch) {
        setAttendance((prev) =>
          prev.includes(bestMatch.name) ? prev : [...prev, bestMatch.name]
        );
      }
    });
  };

  const findBestMatch = (descriptor) => {
    let bestMatch = null;
    let minDistance = Infinity;
    for (let student of faceDescriptors) {
      const distance = faceapi.euclideanDistance(
        descriptor,
        student.descriptor
      );
      console.log(distance);
      if (distance < 0.6 && distance < minDistance) {
        bestMatch = student;
        minDistance = distance;
      }
    }
    return bestMatch;
  };

  return (
    <>
      <Navbar title={`${new Date().toLocaleDateString()} Attendance`} />
      <div className="p-5">
        <h1>Student Attendance</h1>
        <div className="h-[400px] w-[400px] border-4 border-red-600 relative">
          <Webcam
            ref={webcamRef}
            audio={false}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "400px",
              height: "400px",
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "400px",
              height: "400px",
            }}
          />
        </div>

        {modelsLoaded ? (
          facesDetected ? (
            <p>Faces detected, checking attendance...</p>
          ) : (
            <p>No faces detected yet...</p>
          )
        ) : (
          <p>Loading models...</p>
        )}

        <h2>Marked Present:</h2>
        <ul>
          {attendance.map((student, index) => (
            <li key={index}>{student}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NewAttendance;
