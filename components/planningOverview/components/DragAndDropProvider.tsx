import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const DragAndDropProvider: React.FC<Props> = ({ children }) => (
    <DndProvider backend={Backend}>{children}</DndProvider>
);

export default DragAndDropProvider;
