import { PlanningResponseBody } from '../../server/response/types';
import { Planning } from '../../model/planning';

export async function fetchOne(): Promise<Planning> {
    const response = await fetch('http://localhost:3000/api/planning');

    const { planning } = (await response.json()) as PlanningResponseBody;

    return planning;
}
