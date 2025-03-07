import React from 'react';

export type TabType = 'systemPrompt' | 'userPrompt' | 'response';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

/**
 * Component for tab navigation between system prompt, user prompt, and response
 */
const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b mb-4">
      <button
        className={`py-2 px-4 font-medium ${
          activeTab === 'systemPrompt' 
            ? 'border-b-2 border-blue-500 text-blue-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('systemPrompt')}
      >
        System Prompt
      </button>
      <button
        className={`py-2 px-4 font-medium ${
          activeTab === 'userPrompt' 
            ? 'border-b-2 border-blue-500 text-blue-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('userPrompt')}
      >
        User Prompt
      </button>
      <button
        className={`py-2 px-4 font-medium ${
          activeTab === 'response' 
            ? 'border-b-2 border-blue-500 text-blue-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('response')}
      >
        Response
      </button>
    </div>
  );
};

export default TabNavigation; 