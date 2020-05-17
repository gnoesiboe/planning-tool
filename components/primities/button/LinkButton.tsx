import Button from './Button';

type Props = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const LinkButton: React.FC<Props> = ({ className, ...otherProps }) => (
    <Button {...otherProps} className={`btn-link ${className || ''}`} />
);

export default LinkButton;
