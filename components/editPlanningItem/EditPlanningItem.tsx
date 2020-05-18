import { PlanningItem } from '../../model/planning';
import LinkButton from '../primities/button/LinkButton';
import Octicon, { Pencil } from '@primer/octicons-react';

type Props = {
    item: PlanningItem;
};

const EditPlanningItem: React.FC<Props> = () => {
    return (
        <LinkButton className="edit-planning-item">
            <Octicon icon={Pencil} />
        </LinkButton>
    );
};

export default EditPlanningItem;
