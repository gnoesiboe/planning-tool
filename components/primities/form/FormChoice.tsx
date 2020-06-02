import ReactSelect, { Props as ReactSelectProps } from 'react-select';

export type SelectOption = {
    value: string;
    label: string;
};

export default function FormChoice(props: ReactSelectProps) {
    return <ReactSelect<SelectOption> {...props} />;
}
