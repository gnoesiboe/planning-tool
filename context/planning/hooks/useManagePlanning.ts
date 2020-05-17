import { RemovePlanningItemHandler } from './../PlanningContext';
import { Planning } from './../../../model/planning';
import { fetchOne as fetchPlanning } from '../../../repository/api/planningRepository';
import { useState, useEffect } from 'react';
import { AddPlanningItemHandler } from '../PlanningContext';
import {
    persist,
    remove,
} from '../../../repository/api/planningItemRepository';
import { notifySuccess, notifyError } from '../../../utility/notifier';
import {
    addItemToPlanning,
    removeItemFromPlanning,
} from '../handler/planningStateMutationHandler';

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

    useEffect(() => {
        window.addEventListener('focus', doFetchPlanning);

        return () => window.removeEventListener('focus', doFetchPlanning);
    }, [fetchPlanning]);

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

    const removePlanningItem: RemovePlanningItemHandler = async (item) => {
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
        } finally {
            () => fetchPlanning();
        }
    };

    return { planning, addPlanningItem, removePlanningItem };
}
