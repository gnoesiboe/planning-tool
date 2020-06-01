import ReactSelect, { Props as ReactSelectProps } from 'react-select';

export type SelectOption = {
    value: string;
    label: string;
};

const FormChoice: React.FC<ReactSelectProps> = (props) => {
    return <ReactSelect<SelectOption> {...props} />;
};

export default FormChoice;
