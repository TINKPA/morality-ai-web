import React, { useState } from 'react';

interface CollapsiblePanelProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({ 
  title, 
  defaultOpen = true, 
  children,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className={`border rounded shadow bg-white ${className}`}>
      <div 
        className="p-3 font-bold flex justify-between items-center cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg">{title}</h3>
        <span className="text-gray-500 transition-transform duration-200" style={{ 
          transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'
        }}>
          ▼
        </span>
      </div>
      {isOpen && (
        <div className="p-4 border-t">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsiblePanel; 