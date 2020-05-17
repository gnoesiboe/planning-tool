import { Team } from '../../../model/planning';
import useHandleFormState from '../hooks/useHandleFormState';
import { usePlanningContext } from '../../../context/planning/PlanningContext';
import FormGroup from '../../primities/form/FormGroup';
import PrimaryButton from '../../primities/button/PrimaryButton';
import LinkButton from '../../primities/button/LinkButton';
import useSubmitFormWithKeyboardShortcut from '../../../hooks/useSubmitFormWithKeyboardShortcut';

type Props = {
    week: number;
    year: number;
    team: Team;
    onDone: () => void;
    disabledProjectIds: string[];
};

const PlanningItemForm: React.FC<Props> = ({
    week,
    year,
    team,
    onDone,
    disabledProjectIds,
}) => {
    const { projects, teams } = usePlanningContext();

    const {
        values,
        errors,
        handleFieldChange,
        handleSubmit,
        submitForm,
    } = useHandleFormState(week, year, team, onDone);

    const { formRef } = useSubmitFormWithKeyboardShortcut(submitForm);

    if (!Array.isArray(projects) || !Array.isArray(teams)) {
        throw new Error('Expecting teams and projects to be available');
    }

    return (
        <form noValidate onSubmit={handleSubmit} ref={formRef}>
            <FormGroup>
                <label htmlFor="teamId">Team</label>
                <select
                    id="teamId"
                    className={`form-control ${
                        errors.teamId ? 'is-invalid' : ''
                    }`}
                    value={values.teamId}
                    onChange={(event) =>
                        handleFieldChange('teamId', event.target.value)
                    }
                    required
                >
                    <option value="" key="none">
                        -- Team --
                    </option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
                {errors.teamId && (
                    <div className="invalid-feedback">{errors.teamId}</div>
                )}
            </FormGroup>
            <FormGroup>
                <label htmlFor="projectId">Project</label>
                <select
                    id="projectId"
                    autoFocus
                    className={`form-control ${
                        errors.projectId ? 'is-invalid' : ''
                    }`}
                    value={values.projectId}
                    onChange={(event) =>
                        handleFieldChange('projectId', event.target.value)
                    }
                    required
                >
                    <option value="" key="none">
                        -- Project --
                    </option>
                    {projects.map((project) => (
                        <option
                            key={project.id}
                            value={project.id}
                            disabled={disabledProjectIds.includes(project.id)}
                        >
                            {project.name}
                        </option>
                    ))}
                </select>
                {errors.projectId && (
                    <div className="invalid-feedback">{errors.projectId}</div>
                )}
            </FormGroup>
            <FormGroup>
                <label htmlFor="notes">Notities</label>
                <textarea
                    value={values.notes}
                    className="form-control"
                    onChange={(event) =>
                        handleFieldChange('notes', event.target.value)
                    }
                />
            </FormGroup>
            <PrimaryButton type="submit">Opslaan</PrimaryButton>
            <LinkButton onClick={() => onDone()}>Cancel</LinkButton>
        </form>
    );
};

export default PlanningItemForm;
