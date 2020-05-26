import { NextApiRequest } from 'next';
import { PlanningItemsResponseBody } from './../../response/types.d';
import { Controller } from './../../routing/methodSwitch';
import { findAllUpcoming } from '../../../repository/database/planningItemRepository';

const determineTeamIdFilters = (request: NextApiRequest): string[] => {
    const input = request.query.team_id || null;

    if (!input) {
        return [];
    }

    return Array.isArray(input) ? input : [input];
};

const indexController: Controller = async (request, response) => {
    const teamIds = determineTeamIdFilters(request);

    const planningItems = await findAllUpcoming(teamIds);

    const body: PlanningItemsResponseBody = { planningItems };

    response.statusCode = 200;
    response.json(body);
};

export default indexController;
