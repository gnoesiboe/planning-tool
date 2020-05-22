import Head from 'next/head';
import { usePlanningContext } from '../../context/planning/PlanningContext';
import { Table } from 'react-bootstrap';
import AddProject from '../addProject/AddProject';

const ProjectOverview: React.FC = () => {
    const { projects } = usePlanningContext();

    return (
        <>
            <Head>
                <title>Projects | Freshheads</title>
            </Head>
            <AddProject />
            <h1>Projects</h1>
            {projects && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th style={{ width: '120px' }}>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td style={{ backgroundColor: project.color }}>
                                    {project.color}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default ProjectOverview;
