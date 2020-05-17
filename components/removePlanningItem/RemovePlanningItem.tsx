import { PlanningItem } from '../../model/planning';
import useRemoveOnClick from './hooks/useRemoveOnClick';

type Props = {
    item: PlanningItem;
};

const RemovePlanningItem: React.FC<Props> = ({ item }) => {
    const { onClick } = useRemoveOnClick(item);

    return (
        <span className="remove-team-week-project">
            <button className="btn" onClick={onClick}>
                x
            </button>
        </span>
    );
};

export default RemovePlanningItem;
