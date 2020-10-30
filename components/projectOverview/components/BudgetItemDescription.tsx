import React from 'react';
import { ProjectBudgetItemWithUsageCount } from '../../../model/planning';
import createClassName from 'classnames';

type Props = {
    item: ProjectBudgetItemWithUsageCount;
};

const BudgetItemDescription: React.FC<Props> = ({
    item: { from, until, noOfWeeks, usageCount },
}) => {
    const periodDescription = `Week ${from.week} t/m ${until.week}, ${
        from.year
    }${until.year !== from.year ? `-${until.year}` : ''}`;

    const className = createClassName({
        'text-danger': noOfWeeks < usageCount,
        'text-warning': noOfWeeks - usageCount < 2,
    });

    return (
        <div className={className}>
            {periodDescription} → [{usageCount} of {noOfWeeks}] weken
        </div>
    );
};

export default BudgetItemDescription;
