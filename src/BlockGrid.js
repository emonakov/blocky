import Block from './Block';
import { COLOURS, EMPTY_COLOUR } from './Block';
import shapeParser from './utils/shapeParser';
import moveBlocks from './utils/blockMover';

class BlockGrid {
    constructor(width = 10, height = 10) {
        this.width = width;
        this.height = height;
        this.grid = [];

        for (let x = 0; x < this.width; x++) {
            const col = [];
            for (let y = 0; y < this.height; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }
    }

    render(el = document.getElementById('gridEl')) {
        for (let x = 0; x < this.width; x++) {
            const id = 'col_' + x;
            const colEl = document.createElement('div');
            colEl.id = id;
            colEl.className = 'col';
            el.appendChild(colEl);

            for (let y = this.height - 1; y >= 0; y--) {
                const block = this.grid[x][y];
                const id = `block_${x}x${y}`;
                const blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;
                blockEl.addEventListener('click', () =>
                    this.blockClicked(block)
                );
                colEl.appendChild(blockEl);
            }
        }
    }

    /**
     * Cleans out root element and re-renders the grid
     *
     * @param {HTMLElement} el root element
     */
    reRender(el = document.getElementById('gridEl')) {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
        this.render(el);
    }

    blockClicked(block) {
        const shape = [];
        shapeParser({
            shape,
            grid: this.grid,
            block,
        });

        shape.forEach(({ x, y }) => (this.grid[x][y]['colour'] = EMPTY_COLOUR));
        moveBlocks(this.grid, EMPTY_COLOUR);
        this.reRender();
    }
}

export default BlockGrid;
