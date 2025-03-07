import React from 'react';
import { formatJSON, highlightJSON } from './jsonUtils';

interface UserPromptPanelProps {
  userPrompt: string;
}

/**
 * Component for displaying the user prompt with JSON formatting and syntax highlighting
 */
const UserPromptPanel: React.FC<UserPromptPanelProps> = ({ userPrompt }) => {
  return (
    <div className="h-full overflow-hidden">
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
};

export default UserPromptPanel; 