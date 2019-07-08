export default ({ shape, grid, block: { x, y, colour } }) => {
    const visited = [];

    const isVisited = (x, y) => visited.includes(`${x}:${y}`);
    const checkAccessibility = (x, y) => {
        try {
            if (grid[x][y]['colour'] === colour && !isVisited(x, y)) {
                return { x, y };
            }

            if (!isVisited(x, y)) {
                visited.push(`${x}:${y}`);
            }
        } catch (e) {}

        return false;
    };

    const parseShape = ({ x, y }) => {
        const sides = {
            west: false,
            north: false,
            east: false,
            south: false,
        }

        shape.push({ x, y });
        visited.push(`${x}:${y}`);

        sides.west = checkAccessibility(x - 1, y);
        sides.north = checkAccessibility(x, y + 1);
        sides.east = checkAccessibility(x + 1, y);
        sides.south = checkAccessibility(x, y - 1);

        Object
            .keys(sides)
            .filter(side => Boolean(sides[side]))
            .forEach(side => parseShape(sides[side]));
    };

    parseShape({ x, y });
}
