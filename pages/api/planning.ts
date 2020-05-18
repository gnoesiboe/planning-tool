import { Planning } from './../../model/planning';
import { NextApiRequest, NextApiResponse } from 'next';
import { findAllUpcoming } from '../../repository/database/planningItemRepository';
import { sendMethodNotAllowedResponse } from '../../server/response/handler/errorResponseHandler';
import { sendPlanningListResponse } from '../../server/response/handler/planningResponseHandler';
import { strict as assert } from 'assert';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { method } = request;

    assert.ok(
        typeof method === 'string',
        'Expecting method to be available at this point'
    );

    if (method !== 'GET') {
        sendMethodNotAllowedResponse(response, method, ['GET']);

        return;
    }

    const planningItems = await findAllUpcoming();

    const planning: Planning = {};

    planningItems.forEach((planningItem) => {
        const week = planningItem.week;

        if (typeof planning[week] === 'undefined') {
            planning[week] = [];
        }

        planning[week].push(planningItem);
    });

    sendPlanningListResponse(response, planning);
};
