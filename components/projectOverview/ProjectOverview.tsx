import Head from 'next/head';
import { Table } from 'react-bootstrap';
import AddProject from '../addProject/AddProject';
import { CSSProperties } from 'react';
import EditProject from '../editProject/EditProject';
import useSelectProjectsWithBudget from './hooks/useSelectProjectsWIthBudget';
import styles from './ProjectOverview.module.scss';
import BudgetItemDescription from './components/BudgetItemDescription';

const ProjectOverview: React.FC = () => {
    const { projectsWithBudgetItems: projects } = useSelectProjectsWithBudget();

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
                            <th>Budget</th>
                            <th style={{ width: '120px' }}>Color</th>
                            <th style={{ width: '60px' }} />
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => {
                            const rowClassname = project.active
                                ? ''
                                : styles['row--inactive'];

                            const colorCellStyle: CSSProperties = project.active
                                ? {
                                      backgroundColor: project.color,
                                  }
                                : {};

                            return (
                                <tr key={project.id} className={rowClassname}>
                                    <td>{project.name}</td>
                                    <td>
                                        {project.active &&
                                            project.budgetItems.map((item) => (
                                                <BudgetItemDescription
                                                    key={item.id}
                                                    item={item}
                                                />
                                            ))}
                                    </td>
                                    <td style={colorCellStyle}>
                                        {project.color}
                                    </td>
                                    <td>
                                        <EditProject project={project} />
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
