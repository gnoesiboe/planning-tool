import {
    createPostPlanningItemUrl,
    createDeletePlanningItemUrl,
} from './../../server/routing/urlGenerator';
import { PlanningItem } from './../../model/planning';

export async function persist(planningItem: PlanningItem): Promise<void> {
    await fetch(createPostPlanningItemUrl(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(planningItem),
    });
}

export async function remove(planningItem: PlanningItem): Promise<void> {
    await fetch(createDeletePlanningItemUrl(planningItem.id), {
        method: 'DELETE',
    });
}
