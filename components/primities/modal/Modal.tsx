import ReactModal, { Props as ReactModalProps, Styles } from 'react-modal';
import LinkButton from '../button/LinkButton';
import Octicon, { X } from '@primer/octicons-react';

ReactModal.setAppElement('#__next');

type Props = Omit<ReactModalProps, 'isOpen'>;

const Modal: React.FC<Props> = ({
    children,
    onRequestClose,
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
            <LinkButton
                className="modal__close"
                onClick={(event) => {
                    if (onRequestClose) {
                        onRequestClose(event);
                    }
                }}
            >
                <Octicon icon={X} />
            </LinkButton>
            {children}
        </ReactModal>
    );
};

export default Modal;
