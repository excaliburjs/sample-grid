import * as ex from 'excalibur';
import { Level } from './level';
import { Resources } from './resources';

export class DirtGrid {
    public foreground!: ex.TileMap;
    public background!: ex.TileMap;
    constructor(level: Level) {
        const foregroundDirt = Resources.DirtForegroundImage.toSprite();
        const backgroundDirt = Resources.DirtBackgroundImage.toSprite();

        this.foreground = new ex.TileMap({
            name: 'foreground',
            pos: ex.vec(0, 0),
            rows: 10,
            columns: 10,
            tileWidth: 64,
            tileHeight: 64
        });
        this.foreground.z = 0;

        for (let tile of this.foreground.tiles) {
            tile.addGraphic(foregroundDirt);
        }

        this.background = new ex.TileMap({
            name: 'background',
            pos: ex.vec(0, 0),
            rows: 10,
            columns: 10,
            tileWidth: 64,
            tileHeight: 64
        });
        this.background.z = -1;
        for (let tile of this.background.tiles) {
            tile.addGraphic(backgroundDirt);
        }

        level.add(this.background);
        level.add(this.foreground);
    }

    digTile(tileX: number, tileY: number) {
        this.foreground.getTile(tileX, tileY).clearGraphics();
    }
}