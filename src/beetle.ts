import * as ex from 'excalibur';
import { Resources } from './resources';
import { DirtGrid } from './dirt-grid';
import { EasingFunctions, RotationType, Vector } from 'excalibur';

export class Beetle extends ex.Actor {
    animation!: ex.Animation;
    dir: ex.Vector = Vector.Right;
    moving: boolean = false;

    constructor(public tileX: number, public tileY: number, private grid: DirtGrid) {
        const worldPosFromTile = grid.background.getTile(tileX, tileY).pos;
        super({
            name: 'Beetle',
            pos: worldPosFromTile.add(ex.vec(32, 32)) // shift half a tile from the top left
        });
        grid.digTile(tileX, tileY);
    }

    onInitialize(engine: ex.Engine) {
        const sheet = ex.SpriteSheet.fromImageSource({
            image: Resources.BeetleImage,
            grid: {
                spriteWidth: 64,
                spriteHeight: 64,
                rows: 1,
                columns: 3,
            },
        });

        this.animation = ex.Animation.fromSpriteSheet(
            sheet,
            [0, 1, 2],
            100,
            ex.AnimationStrategy.PingPong
        );
        this.graphics.use(this.animation);

        engine.input.keyboard.on("hold", (evt) => {
            let dir = Vector.Down;
            switch (evt.key) {
                case ex.Input.Keys.A:
                case ex.Input.Keys.Left:
                    dir = Vector.Left;
                    break;
                case ex.Input.Keys.D:
                case ex.Input.Keys.Right:
                    dir = Vector.Right;
                    break;
                case ex.Input.Keys.S:
                case ex.Input.Keys.Down:
                    dir = Vector.Down;
                    break;
                case ex.Input.Keys.W:
                case ex.Input.Keys.Up:
                    dir = Vector.Up;
                    break;
                default:
                    return;
            }
            this.dir = dir;
            this.moveInDirection(dir);
        });
    }

    /**
     * Direction is one of four values for down: (0, 1), left: (1, 0), up: (0, -1), or right: (-1, 0)
     * @param direction 
     */
    moveInDirection(direction: Vector) {
        const newTileCoord = direction.add(ex.vec(this.tileX, this.tileY));
        const futureTile = this.grid.foreground.getTile(newTileCoord.x, newTileCoord.y);

        // If the tile is off grid don't move
        if (futureTile) {
            if (!this.moving) {
                this.moving = true;
            } else {
                return;
            }
            Resources.DigSound.play();
            this.grid.digTile(futureTile.x, futureTile.y);
            // Tile x,y are the tile coordinates
            this.tileX = futureTile.x;
            this.tileY = futureTile.y;

            this.actions.rotateTo(
                Math.atan2(direction.y, direction.x),
                Math.PI * 4,
                RotationType.ShortestPath
            ).easeTo(
                // Tile pos is the world pixel position of the tile
                futureTile.pos.add(ex.vec(32, 32)),
                500,
                EasingFunctions.EaseInOutCubic
            ).callMethod(() => {
                this.moving = false;
            });
        } else {
            Resources.ClankSound.play();
        }
    }
}