export function getCurrentDateString(): string {
    return (new Date()).toISOString().substring(0, 10);
}
