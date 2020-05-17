import { NextApiResponse } from 'next';
import { Planning } from '../../../model/planning';
import { PlanningResponseBody } from '../types';

export function sendPlanningListResponse(
    response: NextApiResponse,
    planning: Planning
) {
    const body: PlanningResponseBody = { planning };

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.json(body);
}
