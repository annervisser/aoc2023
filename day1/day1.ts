import {getLinesFromInput} from "../util/lines.ts";

const lines = await getLinesFromInput();
const sum1 = parse(lines, '(\\d)')
console.log({sum1})

const sum2 = parse(lines, '(\\d|one|two|three|four|five|six|seven|eight|nine)')
console.log({sum2})


function parseNumber(input: string): string {
    return {
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9',
    }[input] ?? input;
}

function parse(lines: string[], numberRegex: string) {
    let sum = 0;
    for (const line of lines) {
        const first = line.match(new RegExp(numberRegex))![1];
        const last = line.match(new RegExp('.*' + numberRegex))![1];

        sum += parseInt(parseNumber(first) + parseNumber(last))
    }
    return sum;
}
