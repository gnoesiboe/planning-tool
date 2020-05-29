import FormGroup from '../primities/form/FormGroup';
import { transform as transformToValue } from './utility/weekyearToFormChoiceValueTransformer';
import useHandleFormState from './utility/useHandleFormState';

const PlanningOverviewFiltering: React.FC = () => {
    const { choiceRange, from, until, onFieldChange } = useHandleFormState();

    return (
        <form className="form-inline">
            <FormGroup>
                <label htmlFor="from">From: </label>
                &nbsp;
                <select
                    id="from"
                    className="form-control"
                    value={from}
                    onChange={(event) =>
                        onFieldChange('from', event.target.value)
                    }
                >
                    {choiceRange.map((pair) => {
                        const value = transformToValue(pair);

                        return (
                            <option value={value} key={value}>
                                week {`${pair.week} @ ${pair.year}`}
                            </option>
                        );
                    })}
                </select>
            </FormGroup>
            &nbsp;
            <FormGroup>
                <label htmlFor="until">Until: </label>
                &nbsp;
                <select
                    id="until"
                    className="form-control"
                    value={until}
                    onChange={(event) =>
                        onFieldChange('until', event.target.value)
                    }
                >
                    {choiceRange.map((pair) => {
                        const value = transformToValue(pair);

                        return (
                            <option value={value} key={value}>
                                week {`${pair.week} @ ${pair.year}`}
                            </option>
                        );
                    })}
                </select>
            </FormGroup>
        </form>
    );
};

export default PlanningOverviewFiltering;
