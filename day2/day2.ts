import {getLinesFromInput} from "../util/lines.ts";

const lines = await getLinesFromInput();
const map = buildMap(lines);
console.log('[Part 1] Sum of ids of possible games: ', numPossible(map, {red: 12, green: 13, blue: 14}))
console.log('[Part 2] Power of minimum required dice: ', powerMax(map))

interface Round {
    red: number,
    green: number,
    blue: number
}


function buildMap(lines: string[]) {
    const maxShown = new Map<number, Round>();

    for (const line of lines) {
        const {id, game} = line.match(/Game (?<id>\d+): (?<game>.*)/)!.groups as { id: string, game: string };
        const max: Round = game
            .split('; ')
            .reduce((acc, cur) => {
                for (const [num, color] of cur.split(', ').map(l => l.split(' ') as [string, string])) {
                    acc[color] = Math.max(acc[color], parseInt(num));
                }
                return acc;
            }, {red: 0, green: 0, blue: 0});
        maxShown.set(parseInt(id), max);
    }

    return maxShown;
}

function numPossible(maxShown: Map<number, Round>, bag: Round): number {
    return Array.from(maxShown.entries())
        .filter(([_, max]) => max.red <= bag.red && max.green <= bag.green && max.blue <= bag.blue)
        .reduce((acc, [id]) => acc + id, 0)
}

function powerMax(maxShown: Map<number, Round>) {
    return Array.from(maxShown.entries())
        .reduce((acc, [id, max]) => acc + (max.red * max.green * max.blue), 0)
}
