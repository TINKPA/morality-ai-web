import React, { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PromptResponseSubWindowProps } from '../../types/agent';

const PromptResponseSubWindow: React.FC<PromptResponseSubWindowProps> = ({ 
  prompt, 
  response, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'systemPrompt' | 'userPrompt' | 'response'>('systemPrompt');
  const [viewMode, setViewMode] = useState<'tabs' | 'row'>('tabs');
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

  // Extract system prompt and user prompt from the combined prompt
  const extractPrompts = () => {
    try {
      // Split by the markdown code block indicator
      const parts = prompt.split('```json');
      
      if (parts.length >= 2) {
        const systemPrompt = parts[0].trim();
        // Remove the closing markdown code block
        const userPromptRaw = parts[1].split('```')[0].trim();
        
        return {
          systemPrompt,
          userPrompt: userPromptRaw
        };
      }
      
      return {
        systemPrompt: prompt,
        userPrompt: ''
      };
    } catch (e) {
      return {
        systemPrompt: prompt,
        userPrompt: ''
      };
    }
  };

  const { systemPrompt, userPrompt } = extractPrompts();

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

  // Render system prompt content
  const renderSystemPrompt = () => (
    <div className="h-full">
      <div className="border border-gray-300 rounded-md p-4 overflow-auto h-full bg-gray-50">
        <ReactMarkdown className="prose max-w-none">
          {systemPrompt || 'No system prompt available.'}
        </ReactMarkdown>
      </div>
    </div>
  );

  // Render user prompt content
  const renderUserPrompt = () => (
    <div className="h-full">
      <div className="border border-gray-300 rounded-md p-4 overflow-auto h-full bg-gray-50">
        {userPrompt ? (
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md shadow-inner">
            <pre 
              className="whitespace-pre-wrap break-words font-mono text-sm"
              dangerouslySetInnerHTML={{ 
                __html: highlightJSON(formatJSON(userPrompt)) 
              }}
            />
          </div>
        ) : (
          <p>No user prompt available.</p>
        )}
      </div>
    </div>
  );

  // Render response content
  const renderResponse = () => (
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
  );

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-xl w-4/5 h-4/5 overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Agent Communication</h2>
          <div className="flex items-center">
            <div className="mr-4">
              <button
                onClick={() => setViewMode(viewMode === 'tabs' ? 'row' : 'tabs')}
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium flex items-center"
              >
                {viewMode === 'tabs' ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Row View
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Tab View
                  </>
                )}
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-500 transition-colors"
            >
              <span className="text-lg font-semibold">Close</span>
            </button>
          </div>
        </div>
        
        {viewMode === 'tabs' ? (
          <>
            {/* Tab navigation */}
            <div className="flex border-b mb-4">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === 'systemPrompt' 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('systemPrompt')}
              >
                System Prompt
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === 'userPrompt' 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('userPrompt')}
              >
                User Prompt
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
            
            {/* Content area for tabs */}
            <div className="h-full overflow-hidden">
              {activeTab === 'systemPrompt' && renderSystemPrompt()}
              {activeTab === 'userPrompt' && renderUserPrompt()}
              {activeTab === 'response' && renderResponse()}
            </div>
          </>
        ) : (
          // Row view - all three sections side by side
          <div className="h-full grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <h3 className="font-medium text-blue-600 mb-2 pb-2 border-b">System Prompt</h3>
              {renderSystemPrompt()}
            </div>
            <div className="flex flex-col">
              <h3 className="font-medium text-blue-600 mb-2 pb-2 border-b">User Prompt</h3>
              {renderUserPrompt()}
            </div>
            <div className="flex flex-col">
              <h3 className="font-medium text-blue-600 mb-2 pb-2 border-b">Response</h3>
              {renderResponse()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptResponseSubWindow; 