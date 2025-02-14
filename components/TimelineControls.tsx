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
          onClick={() => onTimeStepChange(Math.min(currentTimeStep + 1, maxTimeStep))}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Step
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
