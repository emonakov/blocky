import BlockGrid from './BlockGrid';
import Block, { EMPTY_COLOUR } from './Block';

describe('BlockGrid', () => {
    beforeEach(() => {
        const root = document.createElement('div');
        root.setAttribute('id', 'gridEl');
        document.body.innerHTML = '';
        document.body.appendChild(root);
    });

    it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
        const grid = new BlockGrid().grid;

        expect(grid.length).toBe(10);

        grid.forEach(column => {
            expect(column.length).toBe(10);

            column.forEach(block => {
                expect(block).toBeInstanceOf(Block);
            });
        });

        const gridB = new BlockGrid(3, 5).grid;

        expect(gridB.length).toBe(3);

        gridB.forEach(column => {
            expect(column.length).toBe(5);
        });
    });

    it('fills and renders a multidimensional array of blocks as grid!', () => {
        const blockGrid = new BlockGrid(10, 10);
        blockGrid.render();
        const firstBlock = blockGrid.grid[0][0];
        const firstGridBlock = document.getElementById('block_0x0');
        expect(blockGrid.grid.length).toBe(10);
        expect(document.querySelectorAll('.col').length).toBe(10);
        expect(firstGridBlock).toBeTruthy();
        expect(firstGridBlock.style.background).toBe(firstBlock.colour);
    });

    it('clicks the block and re-renders a multidimensional array of blocks with a gray color at the top', () => {
        const blockGrid = new BlockGrid(10, 10);
        blockGrid.render();
        document.getElementById('block_0x9').dispatchEvent(new Event('click'));
        document.getElementById('block_0x0').dispatchEvent(new Event('click'));
        expect(document.getElementById('block_0x9').style.background).toBe(
            EMPTY_COLOUR
        );
        expect(document.getElementById('block_0x8').style.background).toBe(
            EMPTY_COLOUR
        );
    });
});
