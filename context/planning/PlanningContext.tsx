import { ReactNode, createContext, useContext } from 'react';
import {
    Team,
    PlanningItem,
    TeamWeekNote,
    ProjectBudgetItemWithUsageCount,
    ProjectWithItemCount,
} from '../../model/planning';
import useFetchPlanningRequirements from './hooks/useFetchPlanningRequirements';
import useManagePlanning, { PlanningFilters } from './hooks/useManagePlanning';
import useManageTeamWeekNotes from './hooks/useManageTeamWeekNotes';
import useManageProjects from './hooks/useManageProjects';
import { resolveInitialFilters } from './resolver/filterResolver';
import { FiltersValues } from '../../server/controller/planningItem/indexController';
import useManageProjectBudgetItems from './hooks/useManageProjectBudgetItems';

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
export type AddProjectHandler = (
    project: ProjectWithItemCount
) => Promise<void>;
export type EditProjectHandler = (
    project: ProjectWithItemCount
) => Promise<void>;
export type OnFilterChangeHandler = (
    newFilterValues: Partial<FiltersValues>
) => void;

type ContextValue = {
    filters: PlanningFilters;
    onFilterChange: OnFilterChangeHandler;
    teams: Team[] | null;
    planningItems: PlanningItem[] | null;
    projects: ProjectWithItemCount[] | null;
    teamWeekNotes: TeamWeekNote[] | null;
    projectBudgetItems: ProjectBudgetItemWithUsageCount[] | null;
    addPlanningItem: AddPlanningItemHandler;
    movePlanningItem: MovePlanningItemHandler;
    editPlanningItem: EditPlanningItemHandler;
    removePlanningItem: RemovePlanningItemHandler;
    addTeamWeekNote: AddTeamWeekNoteHandler;
    removeTeamWeekNote: RemoveTeamWeekNoteHandler;
    addProject: AddProjectHandler;
    editProject: EditProjectHandler;
};

const initialValue: ContextValue = {
    filters: resolveInitialFilters(),
    onFilterChange: () => {},
    teams: null,
    planningItems: null,
    projects: null,
    teamWeekNotes: null,
    projectBudgetItems: null,
    addPlanningItem: async () => {},
    movePlanningItem: async () => {},
    editPlanningItem: async () => {},
    removePlanningItem: async () => {},
    addTeamWeekNote: async () => {},
    removeTeamWeekNote: async () => {},
    addProject: async () => {},
    editProject: async () => {},
};

const PlanningContext = createContext<ContextValue>(initialValue);

export const PlanningContextProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { teams } = useFetchPlanningRequirements();

    const {
        projectBudgetItems,
        fetchProjectBudgetItems,
    } = useManageProjectBudgetItems();

    const {
        filters,
        onFilterChange,
        planningItems,
        addPlanningItem,
        movePlanningItem,
        editPlanningItem,
        removePlanningItem,
    } = useManagePlanning(fetchProjectBudgetItems);

    const {
        teamWeekNotes,
        addTeamWeekNote,
        removeTeamWeekNote,
    } = useManageTeamWeekNotes();

    const { projects, addProject, editProject } = useManageProjects();

    const value: ContextValue = {
        filters,
        onFilterChange,
        planningItems,
        teams,
        projects,
        teamWeekNotes,
        projectBudgetItems,
        addPlanningItem,
        movePlanningItem,
        editPlanningItem,
        removePlanningItem,
        addTeamWeekNote,
        removeTeamWeekNote,
        addProject,
        editProject,
    };

    return (
        <PlanningContext.Provider value={value}>
            {children}
        </PlanningContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const usePlanningContext = () => useContext(PlanningContext);
