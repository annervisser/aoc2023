
export async function getLinesFromInput() {
    return getLines(Bun.argv[2]);
}
export async function getLines(path: string) {
    const fileContent = await Bun.file(path).text();
    return fileContent.trim().split('\n');
}
