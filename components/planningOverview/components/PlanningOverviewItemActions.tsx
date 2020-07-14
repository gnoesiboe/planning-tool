import React from 'react';

type Props = {
    children: React.ReactNode;
};

const PlanningOverviewItemActions: React.FC<Props> = ({ children }) => (
    <div className="planning-overview__item-actions">{children}</div>
);

export default PlanningOverviewItemActions;
