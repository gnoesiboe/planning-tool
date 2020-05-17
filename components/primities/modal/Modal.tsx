import ReactModal, { Props as ReactModalProps, Styles } from 'react-modal';

ReactModal.setAppElement('#__next');

type Props = Omit<ReactModalProps, 'isOpen'>;

const Modal: React.FC<Props> = ({ ...otherProps }) => {
    const customStyles: Styles = {
        content: {
            marginLeft: '50%',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    return <ReactModal {...otherProps} isOpen={true} style={customStyles} />;
};

export default Modal;
