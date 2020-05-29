import { ReactNode, createContext, useContext } from 'react';
import {
    Team,
    Project,
    PlanningItem,
    TeamWeekNote,
} from '../../model/planning';
import useFetchPlanningRequirements from './hooks/useFetchPlanningRequirements';
import useManagePlanning from './hooks/useManagePlanning';
import useManageTeamWeekNotes from './hooks/useManageTeamWeekNotes';
import useManageProjects from './hooks/useManageProjects';
import { Filters, resolveInitialFilterValues } from './resolver/filterResolver';

export type AddPlanningItemHandler = (item: PlanningItem) => Promise<void>;
export type EditPlanningItemHandler = (item: PlanningItem) => Promise<void>;
export type MovePlanningItemHandler = (
    id: string,
    newWeek: number,
    newYear: number,
    newTeamId: string
) => Promise<void>;
export type RemovePlanningItemHandler = (item: PlanningItem) => Promise<void>;
export type AddTeamWeekNoteHandler = (note: TeamWeekNote) => Promise<void>;
export type RemoveTeamWeekNoteHandler = (note: TeamWeekNote) => Promise<void>;
export type AddProjectHandler = (project: Project) => Promise<void>;

type ContextValue = {
    filters: Filters;
    teams: Team[] | null;
    planningItems: PlanningItem[] | null;
    projects: Project[] | null;
    teamWeekNotes: TeamWeekNote[] | null;
    addPlanningItem: AddPlanningItemHandler;
    movePlanningItem: MovePlanningItemHandler;
    editPlanningItem: EditPlanningItemHandler;
    removePlanningItem: RemovePlanningItemHandler;
    addTeamWeekNote: AddTeamWeekNoteHandler;
    removeTeamWeekNote: RemoveTeamWeekNoteHandler;
    addProject: AddProjectHandler;
};

const initialFilterValues = resolveInitialFilterValues();

const initialValue: ContextValue = {
    filters: initialFilterValues,
    teams: null,
    planningItems: null,
    projects: null,
    teamWeekNotes: null,
    addPlanningItem: async () => {},
    movePlanningItem: async () => {},
    editPlanningItem: async () => {},
    removePlanningItem: async () => {},
    addTeamWeekNote: async () => {},
    removeTeamWeekNote: async () => {},
    addProject: async () => {},
};

const PlanningContext = createContext<ContextValue>(initialValue);

export const PlanningContextProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { teams } = useFetchPlanningRequirements();

    const {
        planningItems,
        addPlanningItem,
        movePlanningItem,
        editPlanningItem,
        removePlanningItem,
    } = useManagePlanning();

    const {
        teamWeekNotes,
        addTeamWeekNote,
        removeTeamWeekNote,
    } = useManageTeamWeekNotes();

    const { projects, addProject } = useManageProjects();

    const value: ContextValue = {
        filters: initialFilterValues,
        planningItems,
        teams,
        projects,
        teamWeekNotes,
        addPlanningItem,
        movePlanningItem,
        editPlanningItem,
        removePlanningItem,
        addTeamWeekNote,
        removeTeamWeekNote,
        addProject,
    };

    return (
        <PlanningContext.Provider value={value}>
            {children}
        </PlanningContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const usePlanningContext = () => useContext(PlanningContext);
