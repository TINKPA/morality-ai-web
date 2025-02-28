import React from 'react';

interface BasicInformationProps {
  agent: any;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ agent }) => {
  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold">Basic Information</h4>
      <p>
        <strong>ID:</strong> {agent.id}
      </p>
      <p>
        <strong>Type:</strong> {agent.type}
      </p>
      <p>
        <strong>Created at Step:</strong> {agent.created_at_step ?? 'N/A'}
      </p>
    </div>
  );
};

export default BasicInformation; 