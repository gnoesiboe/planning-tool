import { ReactNode, createContext, useContext } from 'react';
import {
    Team,
    Planning,
    Project,
    PlanningItem,
    TeamWeekNote,
} from '../../model/planning';
import useFetchPlanningRequirements from './hooks/useFetchPlanningRequirements';
import useManagePlanning from './hooks/useManagePlanning';
import useManageTeamWeekNotes from './hooks/useManageTeamWeekNotes';

export type AddPlanningItemHandler = (item: PlanningItem) => Promise<void>;
export type RemovePlanningItemHandler = (item: PlanningItem) => Promise<void>;
export type AddTeamWeekNoteHandler = (note: TeamWeekNote) => Promise<void>;
export type RemoveTeamWeekNoteHandler = (note: TeamWeekNote) => Promise<void>;

type ContextValue = {
    teams: Team[] | null;
    planning: Planning | null;
    projects: Project[] | null;
    teamWeekNotes: TeamWeekNote[] | null;
    addPlanningItem: AddPlanningItemHandler;
    removePlanningItem: RemovePlanningItemHandler;
    addTeamWeekNote: AddTeamWeekNoteHandler;
    removeTeamWeekNote: RemoveTeamWeekNoteHandler;
};

const initialValue: ContextValue = {
    teams: null,
    planning: null,
    projects: null,
    teamWeekNotes: null,
    addPlanningItem: async () => {},
    removePlanningItem: async () => {},
    addTeamWeekNote: async () => {},
    removeTeamWeekNote: async () => {},
};

const PlanningContext = createContext<ContextValue>(initialValue);

export const PlanningContextProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { projects, teams } = useFetchPlanningRequirements();

    const {
        planning,
        addPlanningItem,
        removePlanningItem,
    } = useManagePlanning();

    const {
        teamWeekNotes,
        addTeamWeekNote,
        removeTeamWeekNote,
    } = useManageTeamWeekNotes();

    const value: ContextValue = {
        planning,
        teams,
        projects,
        teamWeekNotes,
        addPlanningItem,
        removePlanningItem,
        addTeamWeekNote,
        removeTeamWeekNote,
    };

    return (
        <PlanningContext.Provider value={value}>
            {children}
        </PlanningContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const usePlanningContext = () => useContext(PlanningContext);
