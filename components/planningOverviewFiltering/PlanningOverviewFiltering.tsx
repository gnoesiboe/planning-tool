import FormGroup from '../primities/form/FormGroup';
import useHandleFormState from './utility/useHandleFormState';
import FormChoice from '../primities/form/FormChoice';
import PeriodPartChoice from './components/PeriodPartChoice';
import styles from './PlanningOverviewFiltering.module.scss';

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
        <div className={styles.wrapper}>
            <form className="form-inline">
                <FormGroup className={styles.formGroup}>
                    <label htmlFor="from">From: </label>
                    <PeriodPartChoice
                        name="from"
                        value={fromValue}
                        isDisabled={isFromDisabled}
                        options={periodOptions}
                        onChange={onPeriodFieldChange}
                    />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                    <label htmlFor="until">Until: </label>
                    <PeriodPartChoice
                        name="until"
                        value={untilValue}
                        isDisabled={isUntilDisabled}
                        options={periodOptions}
                        onChange={onPeriodFieldChange}
                    />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                    <label htmlFor="teams">Teams: </label>
                    <FormChoice
                        id="teams"
                        options={teamOptions}
                        className={styles.teamField}
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
        </div>
    );
};

export default PlanningOverviewFiltering;
