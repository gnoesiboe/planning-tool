import { parseMarkdown } from '../../utility/markdownUtilities';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    children: string;
};

const MarkdownContent: React.FC<Props> = ({
    children,
    className,
    ...otherProps
}) => {
    const parsedContent = parseMarkdown(children);

    return (
        <div
            {...otherProps}
            className={`markdown-content ${className}`}
            dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
    );
};

export default MarkdownContent;
