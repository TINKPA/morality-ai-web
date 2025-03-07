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

  // Format JSON for better display with syntax highlighting
  const formatJSON = (jsonString: string) => {
    try {
      const parsedJSON = JSON.parse(jsonString);
      return JSON.stringify(parsedJSON, null, 2);
    } catch (e) {
      return jsonString;
    }
  };

  // Attempt to format the prompt as JSON if possible
  const formattedPrompt = () => {
    try {
      if (prompt.includes('{') && prompt.includes('}')) {
        // Extract JSON part from the prompt if it contains both text and JSON
        const jsonMatch = prompt.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonPart = jsonMatch[0];
          const parsedJSON = JSON.parse(jsonPart);
          const formattedJSON = JSON.stringify(parsedJSON, null, 2);
          return prompt.replace(jsonPart, `\n\`\`\`json\n${formattedJSON}\n\`\`\``);
        }
      }
      return prompt;
    } catch (e) {
      return prompt;
    }
  };

  // Format JSON response for better display
  const formattedResponse = () => {
    try {
      const parsedResponse = JSON.parse(response);
      return JSON.stringify(parsedResponse, null, 2);
    } catch (e) {
      return response;
    }
  };

  // Syntax highlighting for JSON
  const highlightJSON = (jsonString: string) => {
    if (!jsonString) return '';
    
    // Simple syntax highlighting
    return jsonString
      .replace(/"([^"]+)":/g, '<span class="text-purple-600">"$1"</span>:') // keys
      .replace(/: "([^"]+)"/g, ': <span class="text-green-600">"$1"</span>') // string values
      .replace(/: (true|false)/g, ': <span class="text-blue-600">$1</span>') // boolean values
      .replace(/: (\d+)/g, ': <span class="text-amber-600">$1</span>'); // number values
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
                <ReactMarkdown className="prose max-w-none">
                  {formattedPrompt() || 'No prompt available.'}
                </ReactMarkdown>
              </div>
            </div>
          )}
          
          {activeTab === 'response' && (
            <div className="h-full">
              <div className="border border-gray-300 rounded-md p-4 overflow-auto h-full bg-gray-50 font-mono text-sm">
                {response.startsWith('{') ? (
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md shadow-inner">
                    <pre 
                      className="whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightJSON(formattedResponse()) 
                      }}
                    />
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap break-words">{response}</pre>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptResponseSubWindow; 