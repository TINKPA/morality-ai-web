import React, { useRef, useEffect, useState } from 'react';
import { PromptResponseSubWindowProps } from '../../types/agent';
import { 
  SystemPromptPanel, 
  UserPromptPanel, 
  ResponsePanel, 
  TabNavigation, 
  ViewModeToggle, 
  RowView,
  extractPrompts
} from './promptResponse';
import { TabType } from './promptResponse/TabNavigation';
import { ViewMode } from './promptResponse/ViewModeToggle';

/**
 * Modal window component for displaying agent communication (system prompt, user prompt, and response)
 */
const PromptResponseSubWindow: React.FC<PromptResponseSubWindowProps> = ({ 
  prompt, 
  response, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('systemPrompt');
  const [viewMode, setViewMode] = useState<ViewMode>('row');
  const modalRef = useRef<HTMLDivElement>(null);

  // Extract system prompt and user prompt from the combined prompt
  const { systemPrompt, userPrompt } = extractPrompts(prompt);

  // Handle clicks outside the modal to close it
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
        className="bg-white p-6 rounded-lg shadow-xl w-4/5 h-4/5 overflow-hidden flex flex-col"
      >
        {/* Header with title, view mode toggle, and close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Agent Communication</h2>
          <div className="flex items-center">
            <div className="mr-4">
              <ViewModeToggle 
                viewMode={viewMode} 
                onViewModeChange={setViewMode} 
              />
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
            <TabNavigation 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
            
            {/* Content area for tabs */}
            <div className="h-full overflow-hidden">
              {activeTab === 'systemPrompt' && (
                <SystemPromptPanel systemPrompt={systemPrompt} />
              )}
              {activeTab === 'userPrompt' && (
                <UserPromptPanel userPrompt={userPrompt} />
              )}
              {activeTab === 'response' && (
                <ResponsePanel response={response} />
              )}
            </div>
          </>
        ) : (
          // Row view - all three sections side by side
          <RowView 
            systemPrompt={systemPrompt} 
            userPrompt={userPrompt} 
            response={response} 
          />
        )}
      </div>
    </div>
  );
};

export default PromptResponseSubWindow; 