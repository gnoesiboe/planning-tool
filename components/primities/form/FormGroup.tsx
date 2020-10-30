import { ReactNode } from 'react';
import createClassName from 'classnames';

type Props = {
    children: ReactNode;
    className?: string;
};

const FormGroup: React.FC<Props> = ({
    children,
    className: additionalClassName,
}) => {
    const className = createClassName('form-group', additionalClassName);

    return <div className={className}>{children}</div>;
};

export default FormGroup;
