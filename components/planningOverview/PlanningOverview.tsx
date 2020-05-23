import Team from './components/TeamRow';
import Week from './components/Week';
import TeamWeekProject from './components/TeamWeekProject';
import RemovePlanningItem from '../removePlanningItem/RemovePlanningItem';
import AddPlanningItem from '../addPlanningItem/AddPlanningItem';
import { usePlanningContext } from '../../context/planning/PlanningContext';
import { getRangeOfWeeksWithYearsFromCurrent } from '../../utility/dateTimeUtilities';
import { selectItemsForTeamForWeek } from './utility/planningItemSelector';
import { resolveProjectOrThrow } from './utility/projectResolver';
import TeamWeekNotesOverview from '../teamWeekNotesOverview/TeamWeekNotesOverview';
import AddTeamWeekNote from '../addTeamWeekNote/AddTeamWeekNote';
import WeekActions from './components/WeekActions';
import EditPlanningItem from '../editPlanningItem/EditPlanningItem';
import Head from 'next/head';
import DragAndDropProvider from './components/DragAndDropProvider';
import useMovePlanningItemToOtherWeekOnDrop from './hooks/useMovePlanningItemToOtherWeekOnDrop';

const PlanningOverview: React.FC = () => {
    const { planning, projects, teams } = usePlanningContext();

    const { onItemDropped } = useMovePlanningItemToOtherWeekOnDrop();

    if (!planning || !projects || !teams) {
        return null;
    }

    const weeksWithYears = getRangeOfWeeksWithYearsFromCurrent(10);

    return (
        <div className="planning-overview">
            <Head>
                <title>Planning overview | Freshheads</title>
            </Head>
            <h1>Planning</h1>
            <DragAndDropProvider>
                {teams.map((team) => (
                    <Team team={team} key={team.id}>
                        {weeksWithYears.map(([week, year]) => {
                            const itemsForWeek = selectItemsForTeamForWeek(
                                planning,
                                week,
                                team
                            );

                            const allProjectIds = projects.map(({ id }) => id);

                            const projectIdsAlreadyInWeek = itemsForWeek.map(
                                (item) => item.projectId
                            );

                            const projectNotYetInWeek = allProjectIds.filter(
                                (projectId) =>
                                    !projectIdsAlreadyInWeek.includes(projectId)
                            );

                            return (
                                <Week
                                    key={week}
                                    week={week}
                                    year={year}
                                    acceptDropOfProjectIds={projectNotYetInWeek}
                                    onItemDropped={onItemDropped}
                                >
                                    <WeekActions>
                                        <AddPlanningItem
                                            week={week}
                                            year={year}
                                            team={team}
                                            currentPlanningItems={itemsForWeek}
                                        />
                                        <AddTeamWeekNote
                                            team={team}
                                            week={week}
                                            year={year}
                                        />
                                    </WeekActions>
                                    {itemsForWeek.length > 0 && (
                                        <div className="planning-overview__team-week-projects">
                                            {itemsForWeek.map((item) => {
                                                const key = `${week}_${item.teamId}_${item.projectId}}`;
                                                const project = resolveProjectOrThrow(
                                                    projects,
                                                    item.projectId
                                                );

                                                return (
                                                    <TeamWeekProject
                                                        key={key}
                                                        project={project}
                                                        item={item}
                                                    >
                                                        <RemovePlanningItem
                                                            item={item}
                                                        />
                                                        <EditPlanningItem
                                                            item={item}
                                                            team={team}
                                                        />
                                                    </TeamWeekProject>
                                                );
                                            })}
                                        </div>
                                    )}
                                    <TeamWeekNotesOverview
                                        week={week}
                                        team={team}
                                    />
                                </Week>
                            );
                        })}
                    </Team>
                ))}
            </DragAndDropProvider>
        </div>
    );
};

export default PlanningOverview;
