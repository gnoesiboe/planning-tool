import { fetchAllWithUsageCount } from './../../../repository/api/projectBudgetItemRepository';
import { ProjectBudgetItemWithUsageCount } from './../../../model/planning.d';
import { useState, useEffect } from 'react';
import { notifyError } from '../../../utility/notifier';
import useExecuteOnInterval from '../../../hooks/useExecuteOnInterval';

const refetchInterval = 1000 * 60 * 15; // 15 minutes

export default function useManageProjectBudgetItems() {
    const [items, setItems] = useState<
        ProjectBudgetItemWithUsageCount[] | null
    >(null);

    const doFetchItems = () => {
        fetchAllWithUsageCount()
            .then((items) => setItems(items))
            .catch((error) => {
                notifyError(
                    'Something went wrong while catching the budget items. Please refresh the page!'
                );

                console.error(error);
            });
    };

    // fetch on mount
    useEffect(() => doFetchItems(), []);

    // fetch periodically to retrieve updates from the backend
    useExecuteOnInterval(() => doFetchItems(), refetchInterval);

    return { projectBudgetItems: items, fetchProjectBudgetItems: doFetchItems };
}
