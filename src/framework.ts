export function start(application: () => string, element: HTMLElement) {
    const render = () => { element.innerHTML = application(); }
    window.onhashchange = render;
    window.addEventListener('render', render);
    render();
}

export function render() {
    window.dispatchEvent(new Event('render'));
}
