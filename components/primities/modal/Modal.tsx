import ReactModal, { Props as ReactModalProps, Styles } from 'react-modal';
import { ModalBody, ModalTitle, CloseButton } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';

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
}) => {
    const customStyles: Styles = {
        content: {
            marginLeft: '50%',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            zIndex: 2000,
        },
    };

    return (
        <ReactModal
            {...otherProps}
            isOpen={true}
            style={customStyles}
            onRequestClose={onRequestClose}
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
};

export default Modal;
