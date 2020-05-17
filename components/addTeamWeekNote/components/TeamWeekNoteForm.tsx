import { Team } from '../../../model/planning';
import useHandleFormState from '../hooks/useHandleFormState';
import FormGroup from '../../primities/form/FormGroup';
import PrimaryButton from '../../primities/button/PrimaryButton';
import LinkButton from '../../primities/button/LinkButton';

type Props = {
    team: Team;
    week: number;
    year: number;
    onDone: () => void;
};

const TeamWeekNoteForm: React.FC<Props> = ({ team, week, year, onDone }) => {
    const {
        handleSubmit,
        values,
        errors,
        handleFieldChange,
    } = useHandleFormState(team, week, year, onDone);

    return (
        <form onSubmit={handleSubmit} noValidate>
            <FormGroup>
                <label htmlFor="note">Note</label>
                <textarea
                    autoFocus
                    id="note"
                    value={values.note}
                    className={`form-control ${
                        errors.note ? 'is-invalid' : ''
                    }`}
                    onChange={(event) =>
                        handleFieldChange('note', event.target.value)
                    }
                    required
                />
            </FormGroup>
            <PrimaryButton type="submit">Opslaan</PrimaryButton>
            <LinkButton onClick={() => onDone()}>Cancel</LinkButton>
        </form>
    );
};

export default TeamWeekNoteForm;
