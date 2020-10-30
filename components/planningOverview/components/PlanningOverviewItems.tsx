import React from 'react';
import { PlanningItemWithRelations } from '../../../model/planning';
import PlanningOverviewItem from './PlanningOverviewItem';
import ViewPlanningItem from '../../viewPlanningItem/ViewPlanningItem';
import RemovePlanningItem from '../../removePlanningItem/RemovePlanningItem';
import EditPlanningItem from '../../editPlanningItem/EditPlanningItem';
import ItemActionButton from './ItemActionButton';
import { PencilIcon, EyeIcon, XIcon } from '@primer/octicons-react';
import PlanningOverviewItemActions from './PlanningOverviewItemActions';

type Props = {
    items: PlanningItemWithRelations[];
};

const PlanningOverviewItems: React.FC<Props> = ({ items }) => (
    <div className="planning-overview__items">
        {items.map((item) => (
            <PlanningOverviewItem key={item.id} item={item}>
                <PlanningOverviewItemActions>
                    <ViewPlanningItem
                        item={item}
                        renderButton={(onClick) => (
                            <ItemActionButton onClick={onClick}>
                                <EyeIcon />
                            </ItemActionButton>
                        )}
                    />
                    <RemovePlanningItem
                        item={item}
                        renderButton={(onClick) => (
                            <ItemActionButton onClick={onClick}>
                                <XIcon />
                            </ItemActionButton>
                        )}
                    />
                    <EditPlanningItem
                        item={item}
                        renderButton={(onClick) => (
                            <ItemActionButton onClick={onClick}>
                                <PencilIcon />
                            </ItemActionButton>
                        )}
                    />
                </PlanningOverviewItemActions>
            </PlanningOverviewItem>
        ))}
    </div>
);

export default PlanningOverviewItems;
