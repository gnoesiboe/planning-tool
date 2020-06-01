import { createGetProjectBudgetItemsUrl } from './../../server/routing/urlGenerator';
import { ProjectBudgetItemsResponseBody } from './../../server/response/types.d';
import { ProjectBudgetItem } from '../../model/planning';
import { executeGetRequest } from '../../api/client';

export const fetchAll = async (): Promise<ProjectBudgetItem[]> => {
    const { projectBudgetItems } = await executeGetRequest<
        ProjectBudgetItemsResponseBody
    >(createGetProjectBudgetItemsUrl());

    return projectBudgetItems;
};
