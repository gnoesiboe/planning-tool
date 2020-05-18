import { PlanningItem } from '../../../model/planning';
import useHandleFormState from '../hooks/useHandleFormState';
import FormGroup from '../../primities/form/FormGroup';
import PrimaryButton from '../../primities/button/PrimaryButton';
import LinkButton from '../../primities/button/LinkButton';

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
                <textarea
                    autoFocus
                    value={values.notes}
                    className="form-control"
                    onChange={(event) =>
                        handleFieldChange('notes', event.target.value)
                    }
                />
            </FormGroup>
            <PrimaryButton type="submit">Update</PrimaryButton>
            <LinkButton onClick={() => onDone()}>Cancel</LinkButton>
        </form>
    );
};

export default EditPlanningItemForm;
