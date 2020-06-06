import useProjectBudgetOverviewItems from './hooks/useProjectBudgetOverviewItems';
import Item from './components/Item';

type Props = {};

const ProjectBudgetOverview: React.FC<Props> = () => {
    const { items } = useProjectBudgetOverviewItems();

    if (!items) {
        return null;
    }

    return (
        <div className="project-budget-overview">
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Period</th>
                        <th>Planned</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <Item data={item} key={item.id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectBudgetOverview;
