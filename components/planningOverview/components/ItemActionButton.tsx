import React, { ReactNode } from 'react';
import LinkButton from '../../primities/button/LinkButton';

type Props = {
    children: ReactNode;
    onClick: () => void;
};

const ItemActionButton: React.FC<Props> = ({ children, onClick }) => (
    <LinkButton onClick={onClick} className="planning-overview__item-action">
        {children}
    </LinkButton>
);

export default ItemActionButton;
