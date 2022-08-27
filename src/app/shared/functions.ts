export const mathPattern = '^([1-9][0-9]*[\\.+\\-*\\/])*[1-9][0-9]*$';

export function getCurrentDateString(): string {
    return (new Date()).toISOString().substring(0, 10);
}

export function evaluateString(text: string): number {
    const regex = new RegExp(mathPattern);
    const lastChar = text[text.length - 1];
    if (lastChar === '=') {
        const command = text.substring(0, text.length - 1);
        if (regex.test(command)) {
            // tslint:disable-next-line: no-eval
            return +eval(command);
        } else {
            throw new Error('Invalid Expression');
        }
    }
    return 0;
}
