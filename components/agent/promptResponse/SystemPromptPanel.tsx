import React from 'react';
import ReactMarkdown from 'react-markdown';

interface SystemPromptPanelProps {
  systemPrompt: string;
}

/**
 * Component for displaying the system prompt with markdown formatting
 */
const SystemPromptPanel: React.FC<SystemPromptPanelProps> = ({ systemPrompt }) => {
  return (
    <div className="h-full overflow-hidden">
      <div className="border border-gray-300 rounded-md p-4 overflow-auto h-full bg-gray-50">
        <ReactMarkdown className="prose max-w-none">
          {systemPrompt || 'No system prompt available.'}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SystemPromptPanel; 