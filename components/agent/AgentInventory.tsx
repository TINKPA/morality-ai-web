import React from 'react';
import { Agent } from '../../types/agent';

interface AgentInventoryProps {
  inventory: Agent['inventory'];
}

/**
 * Component for displaying an agent's inventory in an elegant and professional way
 */
const AgentInventory: React.FC<AgentInventoryProps> = ({ inventory }) => {
  if (!inventory || inventory.length === 0) {
    return (
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Inventory</h4>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-gray-500 italic">
          No items in inventory
        </div>
      </div>
    );
  }

  // Group items by type for better organization
  const groupedItems = inventory.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof inventory>);

  // Get color for item type
  const getItemColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      food: 'bg-green-100 text-green-800 border-green-200',
      wood: 'bg-amber-100 text-amber-800 border-amber-200',
      stone: 'bg-gray-100 text-gray-800 border-gray-300',
      metal: 'bg-blue-100 text-blue-800 border-blue-200',
      tool: 'bg-purple-100 text-purple-800 border-purple-200',
      weapon: 'bg-red-100 text-red-800 border-red-200',
      medicine: 'bg-teal-100 text-teal-800 border-teal-200',
      plant: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    };

    // Default color if type is not in the map
    return colorMap[type.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  // Get icon for item type
  const getItemIcon = (type: string): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
      food: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      wood: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      stone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      metal: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    };

    // Default icon if type is not in the map
    return iconMap[type.toLowerCase()] || (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    );
  };

  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold mb-2">Inventory</h4>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-2 gap-4 p-4">
          {Object.entries(groupedItems).map(([type, items]) => (
            <div key={type} className="col-span-1">
              <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                {getItemIcon(type)}
                <span className="ml-1 capitalize">{type}</span>
              </h5>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div 
                    key={`${type}-${index}`}
                    className={`flex justify-between items-center p-2 rounded-md border ${getItemColor(type)}`}
                  >
                    <div className="flex items-center">
                      <span className="font-medium">{item.type}</span>
                      {item.phase && (
                        <span className="ml-2 text-xs bg-white bg-opacity-50 px-1.5 py-0.5 rounded">
                          {item.phase}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold text-lg">{item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentInventory; 