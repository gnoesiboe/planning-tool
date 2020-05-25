import {
    RemovePlanningItemHandler,
    EditPlanningItemHandler,
    MovePlanningItemHandler,
} from './../PlanningContext';
import { Planning } from './../../../model/planning';
import { fetchOne as fetchPlanning } from '../../../repository/api/planningRepository';
import { useState, useEffect } from 'react';
import { AddPlanningItemHandler } from '../PlanningContext';
import {
    persist,
    remove,
    update,
} from '../../../repository/api/planningItemRepository';
import { notifySuccess, notifyError } from '../../../utility/notifier';
import {
    addItemToPlanning,
    removeItemFromPlanning,
    updateItemInPlanning,
    moveItemToOtherWeekInPlanning,
} from '../handler/planningStateMutationHandler';
import { resolveItemInPlanning } from '../utility/planningItemResolver';
import useExecuteOnInterval from '../../../hooks/useExecuteOnInterval';

const refetchTimeout = 1000 * 60 * 10; // 10 minutes;

export default function useManagePlanning() {
    const [planning, setPlanning] = useState<Planning | null>(null);

    const doFetchPlanning = () => {
        fetchPlanning()
            .then((planning) => setPlanning(planning))
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
        setPlanning((currentPlanning) => {
            if (!currentPlanning) {
                throw new Error('Planning should already exist');
            }

            return addItemToPlanning(currentPlanning, item);
        });

        // persist change to server
        try {
            await persist(item);

            notifySuccess('Planning item added');
        } catch (error) {
            if (!planning) {
                throw new Error(
                    'Expecting planning to be available at this point'
                );
            }

            setPlanning((currentPlanning) => {
                if (!currentPlanning) {
                    throw new Error('Planning should already exist');
                }

                return removeItemFromPlanning(currentPlanning, item);
            });

            removeItemFromPlanning(planning, item);

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
        if (!planning) {
            return;
        }

        const item = resolveItemInPlanning(id, planning);

        if (!item) {
            return;
        }

        let newItem = {
            ...item,
            year: newYear,
            week: newWeek,
            teamId: newTeamId,
        };

        // update local state
        setPlanning((currentPlanning) => {
            if (!currentPlanning) {
                throw new Error('Planning should already exist');
            }

            return moveItemToOtherWeekInPlanning(
                newItem,
                item.week,
                currentPlanning
            );
        });

        // update on server
        try {
            await update(newItem);
        } catch (error) {
            notifyError(
                'Something went wrong updating the planning item on the server. Refresh the page to continue!'
            );

            console.error(error);
        }
    };

    const editPlanningItem: EditPlanningItemHandler = async (item) => {
        // update local state
        setPlanning((currentPlanning) => {
            if (!currentPlanning) {
                throw new Error('Planning should already exist');
            }

            return updateItemInPlanning(currentPlanning, item);
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
        setPlanning((currentPlanning) => {
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
        planning,
        addPlanningItem,
        movePlanningItem,
        editPlanningItem,
        removePlanningItem,
    };
}
