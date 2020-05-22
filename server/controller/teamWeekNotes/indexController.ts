import { TeamWeekNotesResponseBody } from '../../response/types';
import { Controller } from '../../routing/methodSwitch';
import { findAll } from '../../../repository/database/teamWeekNoteRepository';

const indexController: Controller = async (_request, response) => {
    const teamWeekNotes = await findAll();

    const body: TeamWeekNotesResponseBody = { teamWeekNotes };

    response.statusCode = 200;
    response.json(body);
};

export default indexController;
