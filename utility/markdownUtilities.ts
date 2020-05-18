import MarkdownIt from 'markdown-it';

let instance: MarkdownIt;

function getInstance() {
    if (instance) {
        return instance;
    }

    instance = new MarkdownIt();

    return instance;
}

export function parseMarkdown(markdown: string) {
    return getInstance().render(markdown);
}
