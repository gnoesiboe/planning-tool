import { PlanningItem } from '../../model/planning';
import useRemoveOnClick from './hooks/useRemoveOnClick';

type Props = {
    item: PlanningItem;
    renderButton: (onClick: () => void) => JSX.Element;
};

const RemovePlanningItem: React.FC<Props> = ({ item, renderButton }) => {
    const { onClick } = useRemoveOnClick(item);

    return renderButton(onClick);
};

export default RemovePlanningItem;
