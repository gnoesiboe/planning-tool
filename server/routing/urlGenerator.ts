const baseUrl = `${process.env.NEXT_PUBLIC_API_SCHEME}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/api`;

// planning item
export const createGetPlanningItemListUrl = () => `${baseUrl}/planning-items`;
export const createPostPlanningItemUrl = () => `${baseUrl}/planning-items`;
export const createDeletePlanningItemUrl = (id: string) =>
    `${baseUrl}/planning-items/${id}`;
export const createPutPlanningItemUrl = (id: string) =>
    `${baseUrl}/planning-items/${id}`;

// project
export const createGetProjectListUrl = () => `${baseUrl}/projects`;
export const createPostProjectUrl = () => `${baseUrl}/projects`;

// team
export const createGetTeamListUrl = () => `${baseUrl}/teams`;

// team week note
export const createGetTeamWeekNoteListUrl = () => `${baseUrl}/team-week-notes`;
export const createDeleteTeamWeekNoteUrl = (id: string) =>
    `${baseUrl}/team-week-notes/${id}`;
export const createPostTeamWeekNoteUrl = () => `${baseUrl}/team-week-notes`;
