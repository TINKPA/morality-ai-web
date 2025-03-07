import React from 'react';
import SystemPromptPanel from './SystemPromptPanel';
import UserPromptPanel from './UserPromptPanel';
import ResponsePanel from './ResponsePanel';

interface RowViewProps {
  systemPrompt: string;
  userPrompt: string;
  response: string;
}

/**
 * Component for displaying system prompt, user prompt, and response in a row
 */
const RowView: React.FC<RowViewProps> = ({ systemPrompt, userPrompt, response }) => {
  return (
    <div className="h-full grid grid-cols-3 gap-4 overflow-hidden">
      <div className="flex flex-col h-full overflow-hidden">
        <h3 className="font-medium text-blue-600 mb-2 pb-2 border-b">System Prompt</h3>
        <div className="flex-1 min-h-0">
          <SystemPromptPanel systemPrompt={systemPrompt} />
        </div>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <h3 className="font-medium text-blue-600 mb-2 pb-2 border-b">User Prompt</h3>
        <div className="flex-1 min-h-0">
          <UserPromptPanel userPrompt={userPrompt} />
        </div>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <h3 className="font-medium text-blue-600 mb-2 pb-2 border-b">Response</h3>
        <div className="flex-1 min-h-0">
          <ResponsePanel response={response} />
        </div>
      </div>
    </div>
  );
};

export default RowView; 