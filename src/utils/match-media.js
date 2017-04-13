export default function matches(query) {
    return window.matchMedia(query).matches;
}