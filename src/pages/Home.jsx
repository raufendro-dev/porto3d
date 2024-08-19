import React, { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Loader from '../components/Loader';
import Textnya from '../models/Textnya';
import Popup from '../components/Popup'; // Import the Popup component

const ZoomControl = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = (event) => {
      const zoomFactor = event.deltaY * 0.01;
      camera.position.z += zoomFactor;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [camera]);

  return null;
};

const Home = () => {
  const [isRotating, setIsRotating] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const [rotation, setRotation] = useState([0, 0, 0]); // Rotation state

  const lastMousePosition = useRef([0, 0]); // Track last mouse position

  const adjustTextnyaForScreenSize = () => {
    let ScreenScale = [1, 1, 1];
    let screenPosition = [0, 0, 0];

    if (window.innerWidth < 768) {
      ScreenScale = [0.5, 0.5, 0.5];
    } else {
      ScreenScale = [1, 1, 1];
    }

    return [ScreenScale, screenPosition];
  };

  const [TextnyaScale, TextnyaPosition] = adjustTextnyaForScreenSize();

  const handleMouseMove = (event) => {
    if (!isRotating) return;

    const [prevX, prevY] = lastMousePosition.current;
    const deltaX = event.clientX - prevX;
    const deltaY = event.clientY - prevY;

    const rotationSpeed = 0.01; // Adjust the rotation speed as needed

    setRotation((prevRotation) => [
      prevRotation[0] + deltaY * rotationSpeed,
      prevRotation[1] + deltaX * rotationSpeed,
      prevRotation[2],
    ]);

    lastMousePosition.current = [event.clientX, event.clientY];
  };

  const handleMouseDown = (event) => {
    setIsRotating(true);
    lastMousePosition.current = [event.clientX, event.clientY];
  };

  const handleMouseUp = () => {
    setIsRotating(false);
  };

  const handleInteraction = () => {
    setShowPopup(false); // Hide the popup on user interaction
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleInteraction);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleInteraction);
    };
  }, [isRotating]);

  return (
    <section className='w-full h-screen relative'>
      <div
        className={`w-full h-screen `}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Canvas
          className='w-full h-screen bg-transparent'
          camera={{ position: [0, 0, 5], near: 0.1, far: 1000 }}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight />
            <ambientLight />
            <pointLight />
            <spotLight />
            <hemisphereLight />
            <Textnya
              position={TextnyaPosition}
              scale={TextnyaScale}
              rotation={rotation} // Apply rotation state here
            />
          </Suspense>
          <ZoomControl />
        </Canvas>
      </div>
      {showPopup && <Popup message="Hello! Click and drag to rotate 3D, Scroll to control zoom camera" onClose={() => setShowPopup(false)} />}
    </section>
  );
};

export default Home;
