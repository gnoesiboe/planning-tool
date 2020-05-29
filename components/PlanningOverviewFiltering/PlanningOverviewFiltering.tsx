import FormGroup from '../primities/form/FormGroup';
import { transform as transformToValue } from './utility/weekyearToFormChoiceValueTransformer';
import useHandleFormState, { SelectOption } from './utility/useHandleFormState';
import ReactSelect from 'react-select';

const PlanningOverviewFiltering: React.FC = () => {
    const {
        choiceRange,
        from,
        fromValue,
        until,
        untilValue,
        onPeriodFieldChange,
        teamOptions,
        teamsValue,
        onTeamFieldChange,
    } = useHandleFormState();

    return (
        <form className="form-inline">
            <FormGroup>
                <label htmlFor="from">From: </label>
                &nbsp;
                <select
                    id="from"
                    className="form-control"
                    value={fromValue}
                    onChange={(event) =>
                        onPeriodFieldChange('from', event.target.value)
                    }
                >
                    {choiceRange.map((pair) => {
                        const value = transformToValue(pair);
                        const disabled =
                            pair.year > until.year ||
                            (pair.week > until.week &&
                                pair.year === until.year);

                        return (
                            <option
                                value={value}
                                key={value}
                                disabled={disabled}
                            >
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
                    value={untilValue}
                    onChange={(event) =>
                        onPeriodFieldChange('until', event.target.value)
                    }
                >
                    {choiceRange.map((pair) => {
                        const value = transformToValue(pair);
                        const disabled =
                            pair.year < from.year ||
                            (pair.week < from.week && pair.year === from.year);

                        return (
                            <option
                                value={value}
                                key={value}
                                disabled={disabled}
                            >
                                week {`${pair.week} @ ${pair.year}`}
                            </option>
                        );
                    })}
                </select>
            </FormGroup>
            &nbsp;
            <FormGroup>
                <label htmlFor="teams">Teams: </label>
                &nbsp;
                <ReactSelect<SelectOption>
                    id="teams"
                    options={teamOptions}
                    isMulti
                    value={teamsValue}
                    onChange={(newItems) => {
                        // @ts-ignore can't get items to match requested
                        onTeamFieldChange(newItems || []);
                    }}
                />
            </FormGroup>
        </form>
    );
};

export default PlanningOverviewFiltering;
