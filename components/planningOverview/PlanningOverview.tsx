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

const PlanningOverview: React.FC = () => {
    const { planning, projects, teams } = usePlanningContext();

    if (!planning || !projects || !teams) {
        return null;
    }

    const weeksWithYears = getRangeOfWeeksWithYearsFromCurrent(10);

    return (
        <div className="planning-overview">
            <h1 className="planning-overview__title">Planning</h1>
            {teams.map((team) => (
                <Team team={team} key={team.id}>
                    {weeksWithYears.map(([week, year]) => {
                        const itemsForWeek = selectItemsForTeamForWeek(
                            planning,
                            week,
                            team
                        );

                        return (
                            <Week key={week} name={week}>
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
                                            notes={item.notes}
                                        >
                                            <RemovePlanningItem item={item} />
                                        </TeamWeekProject>
                                    );
                                })}
                                <TeamWeekNotesOverview
                                    week={week}
                                    team={team}
                                />
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
                            </Week>
                        );
                    })}
                </Team>
            ))}
        </div>
    );
};

export default PlanningOverview;
