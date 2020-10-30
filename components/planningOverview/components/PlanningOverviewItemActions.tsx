import React from 'react';
import styles from '../PlanningOverview.module.scss';

type Props = {
    children: React.ReactNode;
};

const PlanningOverviewItemActions: React.FC<Props> = ({ children }) => (
    <div className={styles.itemActions}>{children}</div>
);

export default PlanningOverviewItemActions;
