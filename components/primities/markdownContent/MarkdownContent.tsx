import { parseMarkdown } from '../../../utility/markdownUtilities';
import styles from './MarkdownContent.module.scss';

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
            className={`${styles.wrapper} ${className}`}
            dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
    );
};

export default MarkdownContent;
