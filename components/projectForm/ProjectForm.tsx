import FormGroup from '../primities/form/FormGroup';
import useHandleFormState, {
    OnSubmitValidHandler,
} from './hooks/useHandleFormState';
import LinkButton from '../primities/button/LinkButton';
import PrimaryButton from '../primities/button/PrimaryButton';
import FormFieldError from '../primities/form/FormFieldError';
import { Project } from '../../model/planning';

type Props = {
    onSubmitValid: OnSubmitValidHandler;
    onCancel: () => void;
    project?: Project;
};

const ProjectForm: React.FC<Props> = ({ onSubmitValid, onCancel, project }) => {
    const { values, errors, handleFieldChange, onSubmit } = useHandleFormState(
        onSubmitValid,
        project
    );

    return (
        <form noValidate onSubmit={onSubmit}>
            <FormGroup>
                <label htmlFor="name">Name</label>
                <input
                    autoFocus
                    type="text"
                    id="name"
                    value={values.name}
                    className={`form-control ${
                        errors.name ? 'is-invalid' : ''
                    }`}
                    onChange={(event) =>
                        handleFieldChange('name', event.target.value)
                    }
                />
                {errors.name && <FormFieldError>{errors.name}</FormFieldError>}
            </FormGroup>
            <FormGroup>
                <label htmlFor="color">Color</label>
                <input
                    type="text"
                    id="color"
                    value={values.color}
                    className={`form-control ${
                        errors.color ? 'is-invalid' : ''
                    }`}
                    onChange={(event) =>
                        handleFieldChange('color', event.target.value)
                    }
                    placeholder="ie. #ff9900"
                />
                {errors.color && (
                    <FormFieldError>{errors.color}</FormFieldError>
                )}
            </FormGroup>
            <FormGroup>
                <div className="form-check">
                    <input
                        type="checkbox"
                        id="active"
                        checked={!!values.active}
                        className={`form-check-input ${
                            errors.color ? 'is-invalid' : ''
                        }`}
                        onChange={(event) =>
                            handleFieldChange('active', event.target.checked)
                        }
                    />
                    <label htmlFor="active" className="form-check-label">
                        Active
                    </label>
                </div>

                {errors.active && (
                    <FormFieldError>{errors.active}</FormFieldError>
                )}
            </FormGroup>
            <PrimaryButton type="submit">Add project</PrimaryButton>
            <LinkButton onClick={() => onCancel()}>Cancel</LinkButton>
        </form>
    );
};

export default ProjectForm;
