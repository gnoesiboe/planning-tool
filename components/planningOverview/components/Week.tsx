import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    name: number;
};

const Week: React.FC<Props> = ({ children, name }) => (
    <div className="planning-overview__week">
        <h3 className="planning-overview__week__title">{name}</h3>
        {children}
    </div>
);

export default Week;
