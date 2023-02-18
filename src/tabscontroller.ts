export interface TabConfig {
    href: string;
    description: string;
    content: () => string;
}

const notFoundPage : TabConfig = {
    href: '#!pages', description: "Not Found - 404", content: () => "Page not found"
};

export default function tabs(tabConfig: Array<TabConfig>): [string, string] {
    const tabsHtml = tabConfig
        .map((tab) => {
            const isActive = window.location.hash === tab.href;
            const className = ['tabs__tabbutton', isActive ? 'tabs__tabbutton--isactive' : ''].join(' ').trim();
            return `
            <a class="${className}" href="${tab.href}">
                ${tab.description}
            </a>
        `
        });
    const activeTab = tabConfig
            .find((tab) => window.location.hash === tab.href)
        || notFoundPage;

    return [
        `<nav class="tabs">
            ${tabsHtml.join('')}
        </nav>`,
        `<main class="tabs__content">
            ${activeTab.content()}
        </main>`
    ];
}
