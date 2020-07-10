import React from 'react';
import createClassName from 'classnames';

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Section: React.FC<Props> = ({
    children,
    className: additionalClassName,
}) => {
    const className = createClassName('section', additionalClassName);

    return <section className={className}>{children}</section>;
};

export default Section;
