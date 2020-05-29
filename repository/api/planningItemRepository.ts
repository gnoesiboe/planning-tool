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
import { WeekYearPair } from '../../utility/types';
import { createQueryString } from '../../utility/queryStringUtilities';

export async function fetchAllInTimespan(
    from: WeekYearPair,
    until: WeekYearPair
): Promise<PlanningItem[]> {
    const url =
        createGetPlanningItemListUrl() +
        '?' +
        createQueryString({
            week_from: from.week,
            year_from: from.year,
            week_until: until.week,
            year_until: until.year,
        });

    const { planningItems } = await executeGetRequest<
        PlanningItemsResponseBody
    >(url);

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
