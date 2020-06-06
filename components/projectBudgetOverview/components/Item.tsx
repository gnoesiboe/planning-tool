import { ProjectBudgetOverviewItem } from '../hooks/useProjectBudgetOverviewItems';
import createClassName from 'classnames';
import Octicon, { Info } from '@primer/octicons-react';

type Props = {
    data: ProjectBudgetOverviewItem;
};

const Item: React.FC<Props> = ({
    data: { id, name, periodDescription, noOfWeeks, usageCount, comments },
}) => {
    const className = createClassName({
        'table-danger': noOfWeeks < usageCount,
        'table-warning': noOfWeeks - usageCount < 2,
    });

    return (
        <>
            <tr key={id} className={className}>
                <td>{name}</td>
                <td>{periodDescription}</td>
                <td>
                    [{usageCount} of {noOfWeeks}]
                </td>
                <td>
                    {comments && (
                        <span title={comments}>
                            <Octicon icon={Info} />
                        </span>
                    )}
                </td>
            </tr>
        </>
    );
};

export default Item;
