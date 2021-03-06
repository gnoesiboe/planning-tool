import { Team } from '../../../model/planning';
import useHandleFormState from '../hooks/useHandleFormState';
import { usePlanningContext } from '../../../context/planning/PlanningContext';
import FormGroup from '../../primities/form/FormGroup';
import PrimaryButton from '../../primities/button/PrimaryButton';
import LinkButton from '../../primities/button/LinkButton';
import useSubmitFormWithKeyboardShortcut from '../../../hooks/useSubmitFormWithKeyboardShortcut';
import FormFieldError from '../../primities/form/FormFieldError';

type Props = {
    week: number;
    year: number;
    team: Team;
    onDone: () => void;
    disabledProjectIds: string[];
};

const AddPlanningItemForm: React.FC<Props> = ({
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
                    disabled={true}
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
                    <FormFieldError>{errors.teamId}</FormFieldError>
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
                    <FormFieldError>{errors.projectId}</FormFieldError>
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

export default AddPlanningItemForm;
