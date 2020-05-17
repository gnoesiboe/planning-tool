type Props = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button: React.FC<Props> = ({ className, ...otherProps }) => (
    <button {...otherProps} className={`btn ${className}`} />
);

export default Button;
