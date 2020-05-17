import { DropdownButton } from 'react-bootstrap';
import Octicon, { Plus } from '@primer/octicons-react';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

const WeekActions: React.FC<Props> = ({ children }) => (
    <div className="week-actions">
        <DropdownButton
            variant="outline-secondary"
            title={<Octicon icon={Plus} />}
            id="week-actions-dropdown"
        >
            {children}
        </DropdownButton>
    </div>
);

export default WeekActions;
