import useProjectBudgetOverviewItems from './hooks/useProjectBudgetOverviewItems';
import Item from './components/Item';
import LinkButton from '../primities/button/LinkButton';
import useShowHideProjectBudgetOverview from './hooks/useShowHideProjectBudgetOverview';

type Props = {};

const ProjectBudgetOverview: React.FC<Props> = () => {
    const { visible, toggle } = useShowHideProjectBudgetOverview();

    const { items } = useProjectBudgetOverviewItems();

    if (!items) {
        return null;
    }

    return (
        <div className="project-budget-overview">
            <LinkButton
                onClick={() => toggle()}
                className="project-budget-overview--toggle-button"
            >
                {visible ? 'hide' : 'show budget'}
            </LinkButton>
            {visible && (
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
            )}
        </div>
    );
};

export default ProjectBudgetOverview;
