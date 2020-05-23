import { ReactNode } from 'react';
import { Team } from '../../../model/planning';
import HeightEqualizer from 'react-equalizer';

type Props = {
    team: Team;
    children: ReactNode;
};

const TeamRow: React.FC<Props> = ({ children, team }) => {
    return (
        <div className="planning-overview__team-row">
            <div className="planning-overview__team-row__title">
                <h2>{team.name}</h2>
            </div>
            <HeightEqualizer className="planning-overview__team-row__equalizer">
                {children}
            </HeightEqualizer>
        </div>
    );
};

export default TeamRow;
