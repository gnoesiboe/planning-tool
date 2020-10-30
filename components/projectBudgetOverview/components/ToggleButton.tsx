import React from 'react';
import LinkButton from '../../primities/button/LinkButton';
import styles from '../ProjectBudgetOverview.module.scss';
import { ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react';

type Props = {
    onClick: () => void;
    visible: boolean;
};

const ToggleButton: React.FC<Props> = ({ onClick, visible }) => (
    <LinkButton onClick={onClick} className={styles.toggleButton}>
        {visible ? (
            <>
                <ArrowDownIcon /> hide budget
            </>
        ) : (
            <>
                <ArrowUpIcon /> show budget
            </>
        )}
    </LinkButton>
);

export default ToggleButton;
