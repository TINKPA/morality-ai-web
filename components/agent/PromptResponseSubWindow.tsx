import React, { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PromptResponseSubWindowProps } from '../../types/agent';

const PromptResponseSubWindow: React.FC<PromptResponseSubWindowProps> = ({ 
  prompt, 
  response, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'response'>('prompt');
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

  // Format JSON response for better display
  const formattedResponse = () => {
    try {
      const parsedResponse = JSON.parse(response);
      return JSON.stringify(parsedResponse, null, 2);
    } catch (e) {
      return response;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-xl w-4/5 h-4/5 overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Agent Communication</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 transition-colors"
          >
            <span className="text-lg font-semibold">Close</span>
          </button>
        </div>
        
        {/* Tab navigation */}
        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'prompt' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('prompt')}
          >
            Prompt
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'response' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('response')}
          >
            Response
          </button>
        </div>
        
        {/* Content area */}
        <div className="h-full overflow-hidden">
          {activeTab === 'prompt' && (
            <div className="h-full">
              <div className="border border-gray-300 rounded-md p-4 overflow-auto h-full bg-gray-50">
                <ReactMarkdown>{prompt || 'No prompt available.'}</ReactMarkdown>
              </div>
            </div>
          )}
          
          {activeTab === 'response' && (
            <div className="h-full">
              <div className="border border-gray-300 rounded-md p-4 overflow-auto h-full bg-gray-50 font-mono text-sm">
                <pre>{formattedResponse()}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptResponseSubWindow; 