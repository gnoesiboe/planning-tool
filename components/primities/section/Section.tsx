import React from 'react';
import createClassName from 'classnames';
import styles from './Section.module.scss';

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Section: React.FC<Props> = ({
    children,
    className: additionalClassName,
}) => {
    const className = createClassName(styles.wrapper, additionalClassName);

    return <section className={className}>{children}</section>;
};

export default Section;
