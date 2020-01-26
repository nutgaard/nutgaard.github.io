export default function clipper(text: string) {
    return `
        <a href="https://www.utgaard.xyz" class="clipper test">
            <div class="clipper__element">${text}</div>
            <div class="clipper__element clipper__overlay" aria-hidden="true">${text}</div>
        </a>
    `
}
