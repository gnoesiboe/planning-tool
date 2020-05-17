import Button from './Button';

type Props = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const PrimaryButton: React.FC<Props> = ({ className, ...otherProps }) => (
    <Button {...otherProps} className="btn-primary" />
);

export default PrimaryButton;
