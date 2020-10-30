import TeamRow from './components/TeamRow';
import Week from './components/Week';
import AddPlanningItem from '../addPlanningItem/AddPlanningItem';
import TeamWeekNotesOverview from '../teamWeekNotesOverview/TeamWeekNotesOverview';
import AddTeamWeekNote from '../addTeamWeekNote/AddTeamWeekNote';
import WeekActions from './components/WeekActions';
import Head from 'next/head';
import DragAndDropProvider from './components/DragAndDropProvider';
import useMovePlanningItemToOtherWeekOnDrop from './hooks/useMovePlanningItemToOtherWeekOnDrop';
import usePlanning from './hooks/usePlanning';
import PlanningOverviewFiltering from '../planningOverviewFiltering/PlanningOverviewFiltering';
import ProjectBudgetOverview from '../projectBudgetOverview/ProjectBudgetOverview';
import PlanningOverviewItems from './components/PlanningOverviewItems';
import styles from './PlanningOverview.module.scss';

const PlanningOverview: React.FC = () => {
    const { planning } = usePlanning();

    const { onItemDropped } = useMovePlanningItemToOtherWeekOnDrop();

    if (!planning) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Planning overview | Freshheads</title>
            </Head>
            <PlanningOverviewFiltering />
            <ProjectBudgetOverview />
            <div className={styles.teamRows}>
                <DragAndDropProvider>
                    {planning.map(({ team, weeks }) => (
                        <>
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
                                            <PlanningOverviewItems
                                                items={items}
                                            />
                                        )}
                                        <TeamWeekNotesOverview
                                            week={week}
                                            team={team}
                                        />
                                    </Week>
                                ))}
                            </TeamRow>
                            <hr className={styles.teamRowSeperator} />
                        </>
                    ))}
                </DragAndDropProvider>
            </div>
        </div>
    );
};

export default PlanningOverview;
