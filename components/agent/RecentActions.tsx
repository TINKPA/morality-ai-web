import React from 'react';
import { RecentActionsProps } from '../../types/agent';

const RecentActions: React.FC<RecentActionsProps> = ({ actionHistory = [] }) => {
  if (!actionHistory.length) {
    return <p>No actions recorded.</p>;
  }

  return (
    <div>
      <h4 className="text-lg font-semibold">Recent Actions</h4>
      {actionHistory.slice().reverse().slice(0, 3).map((action, index) => (
        <div key={index} className="mb-2">
          <p>
            <strong>Step {action.at_time_step}:</strong> {action.reasoning}
          </p>
          {action.actions && action.actions.length > 0 && (
            <ul className="list-disc list-inside">
              {action.actions.map((act, i) => (
                <li key={i}>
                  <strong>Action:</strong> {act.action_type}
                  {act.target_location &&
                    ` → (${act.target_location.x}, ${act.target_location.y})`}
                  {act.reason && (
                    <div>
                      <strong>Reason:</strong> {act.reason}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentActions; 