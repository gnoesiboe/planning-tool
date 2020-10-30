import { DropdownButton } from 'react-bootstrap';
import { PlusIcon } from '@primer/octicons-react';
import { ReactNode } from 'react';
import styles from '../PlanningOverview.module.scss';

type Props = { children: ReactNode };

const WeekActions: React.FC<Props> = ({ children }) => (
    <div className={styles.weekActions}>
        <DropdownButton
            variant="outline-secondary"
            title={<PlusIcon />}
            size="sm"
        >
            {children}
        </DropdownButton>
    </div>
);

export default WeekActions;
