import FormChoice, { SelectOption } from '../../primities/form/FormChoice';
import { OnPeriodFieldChange } from '../utility/useHandleFormState';
import { OptionsType, SingleValueProps } from 'react-select';
import { FiltersValues } from '../../../server/controller/planningItem/indexController';
import { OptionProps } from 'react-select/src/types';
import { reverseTransform } from '../utility/weekyearToFormChoiceValueTransformer';
import createClassName from 'classnames';

type Props = {
    value: SelectOption | null;
    name: keyof FiltersValues;
    isDisabled: (option: SelectOption) => boolean;
    options: OptionsType<SelectOption>;
    onChange: OnPeriodFieldChange;
};

const CustomOption: React.FC<OptionProps> = (props) => {
    const {
        isDisabled,
        isSelected,
        innerRef,
        data,

        // @ts-ignore required for click handler, but somehow not in types?!
        innerProps,
    } = props;

    const className = createClassName(
        'planning-overview-filtering__period-part-choice__option',
        {
            'planning-overview-filtering__period-part-choice__option--selected': isSelected,
            'planning-overview-filtering__period-part-choice__option--disabled': isDisabled,
        }
    );

    const pair = reverseTransform(data.label);

    return (
        <div ref={innerRef} {...innerProps} className={className}>
            Week {pair.week}{' '}
            <span className="planning-overview-filtering__period-part-choice__year">
                {pair.year}
            </span>
        </div>
    );
};

const CustomSingleValue: React.FC<SingleValueProps<SelectOption>> = (props) => {
    const { innerProps, data } = props;

    const pair = reverseTransform(data.label);

    return (
        <div {...innerProps}>
            Week {pair.week}{' '}
            <span className="planning-overview-filtering__period-part-choice__year">
                {pair.year}
            </span>
        </div>
    );
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
            className="planning-overview-filtering__period-part-choice"
            components={{
                SingleValue: CustomSingleValue,

                // @ts-ignore cannot get types to match
                Option: CustomOption,
            }}
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
