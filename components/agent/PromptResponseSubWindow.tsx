import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { PromptResponseSubWindowProps } from '../../types/agent';

const PromptResponseSubWindow: React.FC<PromptResponseSubWindowProps> = ({ 
  prompt, 
  response, 
  onClose 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-4 rounded shadow-lg w-3/4 h-3/4 overflow-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold"
        >
          Close
        </button>
        <div className="flex space-x-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Prompt</h3>
            <div className="border p-2 rounded overflow-auto h-full">
              <ReactMarkdown>{prompt || 'No prompt available.'}</ReactMarkdown>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Response</h3>
            <div className="border p-2 rounded overflow-auto h-full">
              <ReactMarkdown>{` \`\`\` json
              ${JSON.stringify(JSON.parse(response), null, 4)}
              \`\`\``}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptResponseSubWindow; 