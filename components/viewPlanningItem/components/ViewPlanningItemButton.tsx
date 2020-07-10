import React from 'react';
import LinkButton from '../../primities/button/LinkButton';
import Octicon, { Eye } from '@primer/octicons-react';

type Props = {
    onClick: () => void;
};

const ViewPlanningItemButton: React.FC<Props> = ({ onClick }) => (
    <LinkButton onClick={onClick} className="view-planning-item--button">
        <Octicon icon={Eye} />
    </LinkButton>
);

export default ViewPlanningItemButton;
