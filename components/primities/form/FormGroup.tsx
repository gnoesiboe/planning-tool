import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const FormGroup: React.FC<Props> = ({ children }) => (
    <div className="form-group">{children}</div>
);

export default FormGroup;
