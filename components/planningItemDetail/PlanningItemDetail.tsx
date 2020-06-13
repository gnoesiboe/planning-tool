import React from 'react';
import { PlanningItemWithRelations } from '../../model/planning';

type Props = {
    item: PlanningItemWithRelations;
};

const PlanningItemDetail: React.FC<Props> = () => (
    <h1>@todo display details</h1>
);

export default PlanningItemDetail;
