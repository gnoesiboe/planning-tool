import { isClientSide } from './../../../utility/environmentUtilities';
import useShowHideModal from '../../../hooks/useShowHideModal';
import {
    getBoolean as getFromLocalStorage,
    write as writeToLocalStorage,
} from '../../../storage/sessionStorage';

const localStorageNamespace = 'show_project_budget_overview';

export default function useShowHideProjectBudgetOverview() {
    const initialVisibility = isClientSide
        ? getFromLocalStorage(localStorageNamespace, true, true)
        : true;

    const { visible, toggle: doToggle } = useShowHideModal(initialVisibility);

    const toggle = () => {
        writeToLocalStorage(localStorageNamespace, !visible, true);

        doToggle();
    };

    return { visible, toggle };
}
