import { PlanningFilters } from './../../context/planning/hooks/useManagePlanning';
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
import { createQueryString } from '../../utility/queryStringUtilities';

export async function fetchAllInTimespan({
    from,
    until,
    teamIds,
}: PlanningFilters): Promise<PlanningItem[]> {
    const queryParams: { [key: string]: number | string[] } = {
        week_from: from.week,
        year_from: from.year,
        week_until: until.week,
        year_until: until.year,
    };

    if (teamIds.length > 0) {
        queryParams['team_id'] = teamIds;
    }

    const url =
        createGetPlanningItemListUrl() + '?' + createQueryString(queryParams);

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
