import TeamRow from './components/TeamRow';
import Week from './components/Week';
import TeamWeekProject from './components/TeamWeekProject';
import RemovePlanningItem from '../removePlanningItem/RemovePlanningItem';
import AddPlanningItem from '../addPlanningItem/AddPlanningItem';
import TeamWeekNotesOverview from '../teamWeekNotesOverview/TeamWeekNotesOverview';
import AddTeamWeekNote from '../addTeamWeekNote/AddTeamWeekNote';
import WeekActions from './components/WeekActions';
import EditPlanningItem from '../editPlanningItem/EditPlanningItem';
import Head from 'next/head';
import DragAndDropProvider from './components/DragAndDropProvider';
import useMovePlanningItemToOtherWeekOnDrop from './hooks/useMovePlanningItemToOtherWeekOnDrop';
import usePlanning from './hooks/usePlanning';
import PlanningOverviewFiltering from '../planningOverviewFiltering/PlanningOverviewFiltering';
import ProjectBudgetOverview from '../projectBudgetOverview/ProjectBudgetOverview';

const PlanningOverview: React.FC = () => {
    const { planning } = usePlanning();

    const { onItemDropped } = useMovePlanningItemToOtherWeekOnDrop();

    if (!planning) {
        return null;
    }

    return (
        <div className="planning-overview">
            <Head>
                <title>Planning overview | Freshheads</title>
            </Head>
            <PlanningOverviewFiltering />
            <ProjectBudgetOverview />
            <div className="planning-overview__team-rows">
                <DragAndDropProvider>
                    {planning.map(({ team, weeks }) => (
                        <TeamRow team={team} key={team.id}>
                            {weeks.map(({ week, year, items }) => (
                                <Week
                                    key={week}
                                    week={week}
                                    year={year}
                                    team={team}
                                    onItemDropped={onItemDropped}
                                >
                                    <WeekActions>
                                        <AddPlanningItem
                                            week={week}
                                            year={year}
                                            team={team}
                                            currentPlanningItems={items}
                                        />
                                        <AddTeamWeekNote
                                            team={team}
                                            week={week}
                                            year={year}
                                        />
                                    </WeekActions>
                                    {items.length > 0 && (
                                        <div className="planning-overview__team-week-projects">
                                            {items.map((item) => (
                                                <TeamWeekProject
                                                    key={item.id}
                                                    project={item.project}
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
                                            ))}
                                        </div>
                                    )}
                                    <TeamWeekNotesOverview
                                        week={week}
                                        team={team}
                                    />
                                </Week>
                            ))}
                        </TeamRow>
                    ))}
                </DragAndDropProvider>
            </div>
        </div>
    );
};

export default PlanningOverview;
