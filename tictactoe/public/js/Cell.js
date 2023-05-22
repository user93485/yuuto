const initialColor = window.getComputedStyle(document.documentElement).getPropertyValue('--initial-cell-color');
const color1 = window.getComputedStyle(document.documentElement).getPropertyValue('--player-a-color');
const color2 = window.getComputedStyle(document.documentElement).getPropertyValue('--player-b-color');

class Cell {
    constructor(row, col) {
        this.val = 0;
        this.tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        this.tile.style.background = initialColor;
        this.tile.addEventListener('click', event => {
            movePlayed(this);
        });
    }

    reset() {
        this.val = 0;
        this.tile.style.background = initialColor;
    }

    play (val) {
        if(this.val == 0) {
            this.val = val;
            if(this.val == 1) {
                this.tile.style.background = color1;
            }
            else if(this.val == 2) {
                this.tile.style.background = color2;
            }
            return true;
        } 
        else {
            temporaryDisplay("Invalid move");
            return false;
        }
    }
}