import { DropdownButton } from 'react-bootstrap';
import { PlusIcon } from '@primer/octicons-react';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

const WeekActions: React.FC<Props> = ({ children }) => (
    <div className="week-actions">
        <DropdownButton
            variant="outline-secondary"
            title={<PlusIcon />}
            id="week-actions-dropdown"
            size="sm"
        >
            {children}
        </DropdownButton>
    </div>
);

export default WeekActions;
