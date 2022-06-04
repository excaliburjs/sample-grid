import * as ex from 'excalibur';
import { Level } from './level';
import { Resources } from './resources';

const engine = new ex.Engine({
    width: 600,
    height: 400,
    displayMode: ex.DisplayMode.FitScreenAndFill,
    antialiasing: false
});

const level = new Level();
engine.addScene("main", level);
engine.goToScene("main");

const loader = new ex.Loader();
for (const resource of Object.values(Resources)) {
    loader.addResource(resource);
}

engine.start(loader);