// components/TimelineControls.tsx
import React, { useState, useEffect, useRef } from 'react';

interface TimelineControlsProps {
  currentTimeStep: number;
  maxTimeStep: number;
  onTimeStepChange: (step: number) => void;
  // Optional callbacks for additional side-effects
  onPlay?: () => void;
  onPause?: () => void;
}

const TimelineControls: React.FC<TimelineControlsProps> = ({
  currentTimeStep,
  maxTimeStep,
  onTimeStepChange,
  onPlay,
  onPause,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start auto-play
  const handlePlay = () => {
    if (currentTimeStep >= maxTimeStep) {
      onTimeStepChange(0); // Reset to start if at end
    }
    setIsPlaying(true);
    onPlay && onPlay();
  };

  // Pause auto-play
  const handlePause = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    onPause && onPause();
  };

  // Step backward
  const handleStepBackward = () => {
    if (currentTimeStep > 1) {
      onTimeStepChange(currentTimeStep - 1);
    }
  };

  // Step forward
  const handleStepForward = () => {
    if (currentTimeStep < maxTimeStep) {
      onTimeStepChange(currentTimeStep + 1);
    }
  };

  // Auto-increment time step during playback
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        onTimeStepChange((prevStep: number) => {
          if (prevStep < maxTimeStep) {
            return prevStep + 1;
          } else {
            handlePause(); // Pause if we've reached the max time step
            return prevStep;
          }
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, maxTimeStep, onTimeStepChange]);

  return (
    <div className="flex flex-col space-y-4 p-4 border rounded bg-white shadow">
      <div className="flex space-x-4">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
        >
          Play
        </button>
        <button
          onClick={handlePause}
          disabled={!isPlaying}
          className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Pause
        </button>
        <button
          onClick={handleStepBackward}
          disabled={currentTimeStep <= 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          aria-label="Step backward"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={handleStepForward}
          disabled={currentTimeStep >= maxTimeStep}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          aria-label="Step forward"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={() => {
            handlePause();
            onTimeStepChange(1);
          }}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
      <div className="flex items-center">
        <label htmlFor="timeScrubber" className="mr-2">
          Time Step:
        </label>
        <input
          id="timeScrubber"
          type="range"
          min="1"
          max={maxTimeStep}
          value={currentTimeStep}
          onChange={(e) => onTimeStepChange(Number(e.target.value))}
          className="w-full"
        />
        <span className="ml-2">{currentTimeStep}/{maxTimeStep}</span>
      </div>
    </div>
  );
};

export default TimelineControls;
