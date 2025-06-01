class SpriteSquare {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = [];
        this.coloured = false;
    }

    colourIn(pg) {
        pg.stroke(255);
        pg.fill(this.c[0], this.c[1], this.c[2]);
        pg.rect(this.x, this.y, this.w, this.h);
        this.coloured = true;
    }

    setColour(_c) {
        this.c = _c;
    }
}

function coin_flip(p) {
    return Math.floor(p.random(2)) === 0;
}

export function makeSprite(p, pg, grid) {
    let SpriteSquares = [];
    for (let i = 0; i < grid; i++) {
        SpriteSquares[i] = [];
        for (let j = 0; j < grid; j++) {
            let x = i * (pg.width / grid);
            let y = j * (pg.height / grid);
            SpriteSquares[i][j] = new SpriteSquare(
                x,
                y,
                pg.width / grid,
                pg.height / grid
            );
        }
    }

    const c1 = [p.random(255), p.random(255), p.random(255)];
    const c2 = [p.random(255), p.random(255), p.random(255)];
    const c3 = [p.random(255), p.random(255), p.random(255)];

    let rows = grid;
    let cols = grid;
    let mid = Math.floor(cols / 2);

    let leftside_squares = Array.from({ length: mid }, () =>
        Array(rows).fill(false)
    );

    for (let i = 0; i < mid; i++) {
        for (let j = 0; j < rows; j++) {
            SpriteSquares[i][j].setColour(c1);
            if (coin_flip(p)) {
                SpriteSquares[i][j].colourIn(pg);
                leftside_squares[i][j] = true;
            }
        }
    }

    if (cols % 2 === 1) {
        for (let j = 0; j < rows; j++) {
            SpriteSquares[mid][j].setColour(c3);
            if (coin_flip(p)) {
                SpriteSquares[mid][j].colourIn(pg);
            }
        }
    }

    for (let i = mid + (cols % 2); i < cols; i++) {
        let mirror_i = cols - 1 - i;
        for (let j = 0; j < rows; j++) {
            if (leftside_squares[mirror_i][j]) {
                SpriteSquares[i][j].setColour(c2);
                SpriteSquares[i][j].colourIn(pg);
            }
        }
    }
}
