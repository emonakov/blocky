/**
 * Iterates through a grid and swaps clicked grey elements
 * with the elements with a different color above
 *
 * @param {Array} grid A grid array
 * @param {string} colour A disabling color
 */
export default (grid, colour) => {
    grid.forEach((row, x) => {
        row.forEach((block, y) => {
            if (block['colour'] === colour) {
                for (let j = y; j < row.length; j++) {
                    const replacementBlock = grid[x][j];
                    if (replacementBlock['colour'] !== colour) {
                        block['colour'] = replacementBlock['colour'];
                        replacementBlock['colour'] = colour;
                        break;
                    }
                }
            }
        });
    });
};
