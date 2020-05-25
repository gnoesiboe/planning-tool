import { PlanningItemsResponseBody } from './../../server/response/types.d';
import {
    createPostPlanningItemUrl,
    createDeletePlanningItemUrl,
    createPutPlanningItemUrl,
    createGetPlanningItemListUrl,
} from './../../server/routing/urlGenerator';
import { PlanningItem } from './../../model/planning';
import {
    executePostRequest,
    executeDeleteRequest,
    executePutRequest,
    executeGetRequest,
} from '../../api/client';

export async function fetchAllUpcoming(): Promise<PlanningItem[]> {
    const { planningItems } = await executeGetRequest<
        PlanningItemsResponseBody
    >(createGetPlanningItemListUrl());

    return planningItems;
}

export async function persist(planningItem: PlanningItem): Promise<void> {
    await executePostRequest(createPostPlanningItemUrl(), planningItem);
}

export async function remove(planningItem: PlanningItem): Promise<void> {
    await executeDeleteRequest(createDeletePlanningItemUrl(planningItem.id));
}

export async function update(item: PlanningItem): Promise<void> {
    await executePutRequest(createPutPlanningItemUrl(item.id), {
        notes: item.notes,
        week: item.week,
        year: item.year,
        teamId: item.teamId,
    });
}
