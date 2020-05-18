import { PlanningItem } from '../../model/planning';
import useRemoveOnClick from './hooks/useRemoveOnClick';
import LinkButton from '../primities/button/LinkButton';
import Octicon, { X } from '@primer/octicons-react';

type Props = {
    item: PlanningItem;
};

const RemovePlanningItem: React.FC<Props> = ({ item }) => {
    const { onClick } = useRemoveOnClick(item);

    return (
        <span className="remove-team-week-project">
            <LinkButton onClick={onClick}>
                <Octicon icon={X} />
            </LinkButton>
        </span>
    );
};

export default RemovePlanningItem;
