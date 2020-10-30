import React, { ReactNode } from 'react';
import LinkButton from '../../primities/button/LinkButton';
import styles from '../PlanningOverview.module.scss';

type Props = {
    children: ReactNode;
    onClick: () => void;
};

const ItemActionButton: React.FC<Props> = ({ children, onClick }) => (
    <LinkButton onClick={onClick} className={styles.itemAction}>
        {children}
    </LinkButton>
);

export default ItemActionButton;
