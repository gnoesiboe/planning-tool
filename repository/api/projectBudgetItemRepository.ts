import { ProjectBudgetItemWithUsageCount } from './../../model/planning.d';
import { createGetProjectBudgetItemsUrl } from './../../server/routing/urlGenerator';
import { ProjectBudgetItemsResponseBody } from './../../server/response/types.d';
import { executeGetRequest } from '../../api/client';

export const fetchAllWithUsageCount = async (): Promise<
    ProjectBudgetItemWithUsageCount[]
> => {
    const { projectBudgetItems } = await executeGetRequest<
        ProjectBudgetItemsResponseBody
    >(createGetProjectBudgetItemsUrl());

    return projectBudgetItems;
};
