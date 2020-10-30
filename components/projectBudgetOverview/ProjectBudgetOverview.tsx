import useProjectBudgetOverviewItems from './hooks/useProjectBudgetOverviewItems';
import Item from './components/Item';
import useShowHideProjectBudgetOverview from './hooks/useShowHideProjectBudgetOverview';
import styles from './ProjectBudgetOverview.module.scss';
import ToggleButton from './components/ToggleButton';

type Props = {};

const ProjectBudgetOverview: React.FC<Props> = () => {
    const { visible, toggle } = useShowHideProjectBudgetOverview();

    const { items } = useProjectBudgetOverviewItems();

    if (!items) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <ToggleButton onClick={() => toggle()} visible={visible} />
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
