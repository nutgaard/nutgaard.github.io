export default function matches(query: string) {
    return window.matchMedia(query).matches;
}