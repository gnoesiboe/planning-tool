import Head from 'next/head';
import { usePlanningContext } from '../../context/planning/PlanningContext';
import { Table } from 'react-bootstrap';
import AddProject from '../addProject/AddProject';
import { CSSProperties } from 'react';

const ProjectOverview: React.FC = () => {
    const { projects } = usePlanningContext();

    return (
        <div className="project-overview">
            <Head>
                <title>Projects | Freshheads</title>
            </Head>
            <AddProject />
            <h1>Projects</h1>
            {projects && (
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th style={{ width: '120px' }}>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => {
                            const rowClassname = project.active
                                ? ''
                                : 'project-overview__row--inactive';

                            const colorCellStyle: CSSProperties = project.active
                                ? {
                                      backgroundColor: project.color,
                                  }
                                : {};

                            return (
                                <tr key={project.id} className={rowClassname}>
                                    <td>{project.name}</td>
                                    <td style={colorCellStyle}>
                                        {project.color}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ProjectOverview;
