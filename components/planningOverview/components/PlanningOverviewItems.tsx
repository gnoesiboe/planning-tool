import React from 'react';
import { PlanningItemWithRelations } from '../../../model/planning';
import PlanningOverviewItem from './PlanningOverviewItem';
import ViewPlanningItem from '../../viewPlanningItem/ViewPlanningItem';
import RemovePlanningItem from '../../removePlanningItem/RemovePlanningItem';
import EditPlanningItem from '../../editPlanningItem/EditPlanningItem';
import ItemActionButton from './ItemActionButton';
import Octicon, { Pencil } from '@primer/octicons-react';

type Props = {
    items: PlanningItemWithRelations[];
};

const PlanningOverviewItems: React.FC<Props> = ({ items }) => (
    <div className="planning-overview__items">
        {items.map((item) => (
            <PlanningOverviewItem key={item.id} item={item}>
                <ViewPlanningItem item={item} />
                <RemovePlanningItem item={item} />
                <EditPlanningItem
                    item={item}
                    renderButton={(onClick) => (
                        <ItemActionButton onClick={onClick}>
                            <Octicon icon={Pencil} />
                        </ItemActionButton>
                    )}
                />
            </PlanningOverviewItem>
        ))}
    </div>
);

export default PlanningOverviewItems;
