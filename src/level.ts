import * as ex from "excalibur";
import { Beetle } from "./beetle";
import { DirtGrid } from "./dirt-grid";

export class Level extends ex.Scene {
    grid!: DirtGrid;
    beetle!: Beetle;

    onInitialize(): void {
        this.grid = new DirtGrid(this);
        this.beetle = new Beetle(4, 4, this.grid)
        this.add(this.beetle);

        this.camera.strategy.elasticToActor(this.beetle, .8, .9);
    }
}