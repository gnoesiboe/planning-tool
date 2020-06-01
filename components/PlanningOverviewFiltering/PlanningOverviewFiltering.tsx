import FormGroup from '../primities/form/FormGroup';
import { transform as transformToValue } from './utility/weekyearToFormChoiceValueTransformer';
import useHandleFormState from './utility/useHandleFormState';
import FormChoice from '../primities/form/FormChoice';

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
        <form className="form-inline planning-overview-filtering">
            <FormGroup>
                <label htmlFor="from">From: </label>
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
            <FormGroup>
                <label htmlFor="until">Until: </label>
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
                                {`${pair.week} @ ${pair.year}`}
                            </option>
                        );
                    })}
                </select>
            </FormGroup>
            <FormGroup>
                <label htmlFor="teams">Teams: </label>
                <FormChoice
                    id="teams"
                    options={teamOptions}
                    className="planning-overview-filtering__team-field"
                    placeholder="Show only specific teams"
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
