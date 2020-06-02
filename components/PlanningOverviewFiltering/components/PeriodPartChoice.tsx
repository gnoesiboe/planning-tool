import FormChoice, { SelectOption } from '../../primities/form/FormChoice';
import { OnPeriodFieldChange } from '../utility/useHandleFormState';
import { OptionsType } from 'react-select';
import { FiltersValues } from '../../../server/controller/planningItem/indexController';

type Props = {
    value: SelectOption | null;
    name: keyof FiltersValues;
    isDisabled: (option: SelectOption) => boolean;
    options: OptionsType<SelectOption>;
    onChange: OnPeriodFieldChange;
};

const PeriodPartChoice: React.FC<Props> = ({
    value,
    name,
    isDisabled,
    options,
    onChange,
}) => {
    return (
        <FormChoice
            id={name}
            value={value}
            className="planning-overview-filtering__period-field"
            onChange={(newItem) => {
                if (Array.isArray(newItem)) {
                    throw new Error('Expecting new item to be an object');
                }

                // @ts-ignore -> new item can either be a multi or a single option somehow
                onChange(name, newItem ? newItem.value : null);
            }}
            isOptionDisabled={isDisabled}
            options={options}
        />
    );
};

export default PeriodPartChoice;
