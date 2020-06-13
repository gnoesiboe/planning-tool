import FormGroup from '../primities/form/FormGroup';
import useHandleFormState from './utility/useHandleFormState';
import FormChoice from '../primities/form/FormChoice';
import PeriodPartChoice from './components/PeriodPartChoice';

const PlanningOverviewFiltering: React.FC = () => {
    const {
        periodOptions,
        fromValue,
        isFromDisabled,
        untilValue,
        isUntilDisabled,
        onPeriodFieldChange,
        teamOptions,
        teamsValue,
        onTeamFieldChange,
    } = useHandleFormState();

    return (
        <form className="form-inline planning-overview-filtering">
            <FormGroup>
                <label htmlFor="from">From: </label>
                <PeriodPartChoice
                    name="from"
                    value={fromValue}
                    isDisabled={isFromDisabled}
                    options={periodOptions}
                    onChange={onPeriodFieldChange}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="until">Until: </label>
                <PeriodPartChoice
                    name="until"
                    value={untilValue}
                    isDisabled={isUntilDisabled}
                    options={periodOptions}
                    onChange={onPeriodFieldChange}
                />
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
