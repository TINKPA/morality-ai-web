// components/TimelineControls.tsx
import React, { useState, useEffect, useRef } from 'react';

interface TimelineControlsProps {
  currentTimeStep: number;
  maxTimeStep: number;
  onTimeStepChange: (step: number | ((prev: number) => number)) => void;
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
    <div className="border rounded bg-white shadow-sm p-1">
      <div className="flex items-center gap-1">
        {/* Control Buttons */}
        <div className="flex items-center">
          {/* Play/Pause Button */}
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className={`p-1 text-white text-xs rounded ${isPlaying ? 'bg-red-400 hover:bg-red-500' : 'bg-green-500 hover:bg-green-600'} transition-colors`}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          {/* Step Backward Button */}
          <button
            onClick={handleStepBackward}
            disabled={currentTimeStep <= 1}
            className="p-1 bg-blue-500 text-white rounded disabled:opacity-40 hover:bg-blue-600 transition-colors"
            aria-label="Step backward"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Step Forward Button */}
          <button
            onClick={handleStepForward}
            disabled={currentTimeStep >= maxTimeStep}
            className="p-1 bg-blue-500 text-white rounded disabled:opacity-40 hover:bg-blue-600 transition-colors"
            aria-label="Step forward"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Reset Button */}
          <button
            onClick={() => {
              handlePause();
              onTimeStepChange(1);
            }}
            className="p-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
            aria-label="Reset"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Slider and Counter */}
        <div className="flex-1 flex items-center gap-1 ml-1">
          <input
            id="timeScrubber"
            type="range"
            min="1"
            max={maxTimeStep}
            value={currentTimeStep}
            onChange={(e) => onTimeStepChange(Number(e.target.value))}
            className="w-full h-1"
          />
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
            {currentTimeStep}/{maxTimeStep}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimelineControls;
