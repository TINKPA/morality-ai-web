import React from 'react';
import { 
  MoveAction,
  CollectAction,
  ConsumeAction,
  ShareAction,
  AttackAction,
  RobAction,
  ReproduceAction,
  CommunicateAction,
  ActionBase
} from './';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface ActionRendererProps {
  action: {
    action_type: string;
    [key: string]: any;
  };
}

const ActionRenderer: React.FC<ActionRendererProps> = ({ action }) => {
  // Render the appropriate action component based on the action type
  switch (action.action_type.toLowerCase()) {
    case 'move':
      return <MoveAction action={action} />;
    case 'collect':
      return <CollectAction action={action} />;
    case 'consume':
      return <ConsumeAction action={action} />;
    case 'share':
      return <ShareAction action={action} />;
    case 'attack':
      return <AttackAction action={action} />;
    case 'rob':
      return <RobAction action={action} />;
    case 'reproduce':
      return <ReproduceAction action={action} />;
    case 'communicate':
      return <CommunicateAction action={action} />;
    default:
      // Fallback for unknown action types
      return (
        <ActionBase
          action={action}
          icon={<QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />}
          bgColor="bg-gray-50"
        >
          <div className="mt-2 text-sm text-gray-600">
            Unknown action type: {action.action_type}
          </div>
        </ActionBase>
      );
  }
};

export default ActionRenderer; 