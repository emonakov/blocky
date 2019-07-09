/**
 * Parses a list of blocks in the array and searching for a proper
 * shape of connected block elements
 *
 * @param {Object[]} shape A shape contains coords of connected blocks of same colour
 * @param {Array} grid A grid array
 * @param {Block} block A first block to find shape from
 */
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
            left: false,
            above: false,
            right: false,
            under: false,
        };

        shape.push({ x, y });
        visited.push(`${x}:${y}`);

        sides.left = checkAccessibility(x - 1, y);
        sides.above = checkAccessibility(x, y + 1);
        sides.right = checkAccessibility(x + 1, y);
        sides.under = checkAccessibility(x, y - 1);

        Object.keys(sides)
            .filter(side => Boolean(sides[side]))
            .forEach(side => parseShape(sides[side]));
    };

    parseShape({ x, y });
};
