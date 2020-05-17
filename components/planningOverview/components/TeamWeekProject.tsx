import { Project } from '../../../model/planning';
import { CSSProperties, ReactNode } from 'react';

type Props = {
    project: Project;
    notes: string | null;
    children: ReactNode;
};

const TeamWeekProject: React.FC<Props> = ({ project, notes, children }) => {
    const style: CSSProperties = {
        backgroundColor: project.color,
    };

    return (
        <div
            style={style}
            className="planning-overview__team-week-project"
            title={notes || ''}
        >
            {children}
            <h3 className="planning-overview__team-week-project__title">
                {project.name}
            </h3>
            {notes && (
                <p className="planning-overview__team-week-project__notes">
                    {notes}
                </p>
            )}
        </div>
    );
};

export default TeamWeekProject;
