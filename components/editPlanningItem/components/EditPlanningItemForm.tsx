import { PlanningItem } from '../../../model/planning';
import useHandleFormState from '../hooks/useHandleFormState';
import FormGroup from '../../primities/form/FormGroup';
import PrimaryButton from '../../primities/button/PrimaryButton';
import LinkButton from '../../primities/button/LinkButton';
import TextareaAutosize from 'react-autosize-textarea';
import { FormText } from 'react-bootstrap';

type Props = {
    item: PlanningItem;
    onDone: () => void;
};

const EditPlanningItemForm: React.FC<Props> = ({ item, onDone }) => {
    const { handleSubmit, values, handleFieldChange } = useHandleFormState(
        item,
        onDone
    );

    return (
        <form noValidate onSubmit={handleSubmit}>
            <FormGroup>
                <label htmlFor="notes">Notities</label>
                <TextareaAutosize
                    autoFocus
                    value={values.notes}
                    rows={3}
                    className="form-control"
                    onChange={(event) =>
                        handleFieldChange('notes', event.currentTarget.value)
                    }
                />
                <FormText>
                    Use{' '}
                    <a
                        href="https://daringfireball.net/projects/markdown/syntax"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Markdown
                    </a>{' '}
                    to create headers, links and lists and stuff.
                </FormText>
            </FormGroup>
            <PrimaryButton type="submit">Update</PrimaryButton>
            <LinkButton onClick={() => onDone()}>Cancel</LinkButton>
        </form>
    );
};

export default EditPlanningItemForm;
