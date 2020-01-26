import clipper from './clipper';

const texts = ['A menu', 'concept', 'which is', 'perhaps usable'];

export default function menu() {
    const elements = texts.map(clipper).join('\n');
    return `
        <div class="menu">${elements}</div>
    `;
}
