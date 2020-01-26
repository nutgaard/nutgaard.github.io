export interface TabConfig {
    href: string;
    description: string;
    content: () => string;
}

const notFoundPage : TabConfig = {
    href: '#!pages', description: "Not Found - 404", content: () => "Page not found"
};

export default function tabs(tabConfig: Array<TabConfig>) {
    const tabsHtml = tabConfig
        .map((tab) => {
            const isActive = window.location.hash === tab.href;
            const className = ['tabs__tabbutton', isActive ? 'tabs__tabbutton--isactive' : ''].join(' ').trim();
            return `
            <a class="${className}" href="${tab.href}">
                <h2>${tab.description}</h2>
            </a>
        `
        });
    const activeTab = tabConfig
            .find((tab) => window.location.hash === tab.href)
        || notFoundPage;

    return [
        ...tabsHtml,
        `
        <div class="tabs__content">
            ${activeTab.content()}
        </div>
        `
    ]
        .join('');
}
