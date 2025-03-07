import React from 'react';
import { formatJSON, highlightJSON } from './jsonUtils';

interface ResponsePanelProps {
  response: string;
}

/**
 * Component for displaying the response with JSON formatting and syntax highlighting
 */
const ResponsePanel: React.FC<ResponsePanelProps> = ({ response }) => {
  const formattedResponse = () => {
    try {
      const parsedResponse = JSON.parse(response);
      return JSON.stringify(parsedResponse, null, 2);
    } catch (e) {
      return response;
    }
  };

  return (
    <div className="h-full overflow-hidden">
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
};

export default ResponsePanel; 