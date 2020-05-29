import { usePlanningContext } from '../../../context/planning/PlanningContext';
import { selectItemsGrouppedByWeekAndTeam } from '../utility/planningItemSelector';

export default function usePlanning() {
    const { planningItems, projects, teams, filters } = usePlanningContext();

    let planning =
        planningItems && projects && teams
            ? selectItemsGrouppedByWeekAndTeam(
                  teams,
                  projects,
                  planningItems,
                  filters
              )
            : null;

    return { planning };
}
