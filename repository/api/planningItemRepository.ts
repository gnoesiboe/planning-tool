import { PlanningItem } from './../../model/planning';

export async function persist(planningItem: PlanningItem): Promise<void> {
    await fetch('http://localhost:3000/api/planning-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(planningItem),
    });
}

export async function remove(planningItem: PlanningItem): Promise<void> {
    await fetch(`http://localhost:3000/api/planning-item/${planningItem.id}`, {
        method: 'DELETE',
    });
}
