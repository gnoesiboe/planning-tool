import ReactModal, { Props as ReactModalProps, Styles } from 'react-modal';
import { ModalBody, ModalTitle, CloseButton } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import styles from './Modal.module.scss';

ReactModal.setAppElement('#__next');

type Props = Omit<ReactModalProps, 'isOpen' | 'onRequestClose'> & {
    title?: string;
    onRequestClose: () => void;
};

const Modal: React.FC<Props> = ({
    children,
    onRequestClose,
    title,
    ...otherProps
}) => (
    <ReactModal
        {...otherProps}
        isOpen={true}
        onRequestClose={onRequestClose}
        className={styles.content}
        overlayClassName={styles.overlay}
    >
        <ModalHeader>
            {title && <ModalTitle>{title}</ModalTitle>}
            <CloseButton
                onClick={() => {
                    if (onRequestClose) {
                        onRequestClose();
                    }
                }}
            />
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
    </ReactModal>
);

export default Modal;
