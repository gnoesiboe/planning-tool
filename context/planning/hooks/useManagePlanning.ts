import {
    RemovePlanningItemHandler,
    EditPlanningItemHandler,
    MovePlanningItemHandler,
} from './../PlanningContext';
import { PlanningItem } from './../../../model/planning';
import { useState, useEffect } from 'react';
import { AddPlanningItemHandler } from '../PlanningContext';
import {
    persist,
    remove,
    update,
    fetchAllUpcoming,
} from '../../../repository/api/planningItemRepository';
import { notifySuccess, notifyError } from '../../../utility/notifier';
import {
    addItemToPlanning,
    removeItemFromPlanning,
    updateItemInPlanningItemsCollection,
} from '../handler/planningStateMutationHandler';
import useExecuteOnInterval from '../../../hooks/useExecuteOnInterval';

const refetchTimeout = 1000 * 60 * 10; // 10 minutes;

export default function useManagePlanning() {
    const [planningItems, setPlanningItems] = useState<PlanningItem[] | null>(
        null
    );

    const doFetchPlanning = () => {
        fetchAllUpcoming()
            .then((planningItems) => setPlanningItems(planningItems))
            .catch((error) => {
                notifyError(
                    'Something went wrong while fetching the planning. Please refresh the page to continue!'
                );

                console.error(error);
            });
    };

    // refetch planning from the backend every 10 minutes
    useExecuteOnInterval(() => doFetchPlanning(), refetchTimeout);

    // fetch planning on initial mount
    useEffect(() => doFetchPlanning(), []);

    const addPlanningItem: AddPlanningItemHandler = async (item) => {
        // update local state to be able to continue right away
        setPlanningItems((currentPlanning) => {
            if (!Array.isArray(currentPlanning)) {
                throw new Error(
                    'Expecting planning items to be available at this point'
                );
            }

            return addItemToPlanning(currentPlanning, item);
        });

        // persist change to server
        try {
            await persist(item);

            notifySuccess('Planning item added');
        } catch (error) {
            if (!planningItems) {
                throw new Error(
                    'Expecting planning to be available at this point'
                );
            }

            setPlanningItems((currentPlanning) => {
                if (!currentPlanning) {
                    throw new Error('Planning should already exist');
                }

                return removeItemFromPlanning(currentPlanning, item);
            });

            removeItemFromPlanning(planningItems, item);

            notifyError('Something went wrong persisting the planning item.');

            console.error(error);
        }
    };

    const movePlanningItem: MovePlanningItemHandler = async (
        id,
        newWeek,
        newYear,
        newTeamId
    ) => {
        if (!Array.isArray(planningItems)) {
            return;
        }

        const item = planningItems.find((cursorItem) => cursorItem.id === id);

        if (!item) {
            return;
        }

        let updatedItem = {
            ...item,
            year: newYear,
            week: newWeek,
            teamId: newTeamId,
        };

        // update local state
        setPlanningItems((currentPlanning) => {
            if (!currentPlanning) {
                throw new Error('Planning should already exist');
            }

            return updateItemInPlanningItemsCollection(
                planningItems,
                updatedItem
            );
        });

        // update on server
        try {
            await update(updatedItem);
        } catch (error) {
            notifyError(
                'Something went wrong updating the planning item on the server. Refresh the page to continue!'
            );

            console.error(error);
        }
    };

    const editPlanningItem: EditPlanningItemHandler = async (item) => {
        // update local state
        setPlanningItems((currentPlanning) => {
            if (!currentPlanning) {
                throw new Error('Planning should already exist');
            }

            return updateItemInPlanningItemsCollection(currentPlanning, item);
        });

        // update on server
        try {
            await update(item);
        } catch (error) {
            notifyError(
                'Something went wrong updating the planning item on the server. Refresh the page to continue!'
            );

            console.error(error);
        }
    };

    const removePlanningItem: RemovePlanningItemHandler = async (item) => {
        // update local state
        setPlanningItems((currentPlanning) => {
            if (!currentPlanning) {
                throw new Error('Planning should already exist');
            }

            return removeItemFromPlanning(currentPlanning, item);
        });

        // remove on server
        try {
            await remove(item);
        } catch (error) {
            notifyError(
                'Something went wrong removing the planning item on the server. Refresh the page to continue!'
            );

            console.error(error);
        }
    };

    return {
        planningItems,
        addPlanningItem,
        movePlanningItem,
        editPlanningItem,
        removePlanningItem,
    };
}
