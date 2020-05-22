type Props = {
    children: string;
};

const FormFieldError: React.FC<Props> = ({ children }) => (
    <div className="invalid-feedback">{children}</div>
);

export default FormFieldError;
