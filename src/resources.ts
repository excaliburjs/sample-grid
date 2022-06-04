import * as ex from 'excalibur';

import beetle from "./images/beetle.png";
import dirtFrontImageSrc from "./images/dirt_front.png";
import dirtBackImageSrc from "./images/dirt_back.png";

import groundDigWavSource from "./sounds/dig.wav";
import groundDigMp3Source from "./sounds/dig.mp3";
import clankWavSource from "./sounds/clank.wav";
import clankMp3Source from "./sounds/clank.mp3";

export const Resources = {
    BeetleImage: new ex.ImageSource(beetle),
    DirtForegroundImage: new ex.ImageSource(dirtFrontImageSrc),
    DirtBackgroundImage: new ex.ImageSource(dirtBackImageSrc),
    // Sounds
    DigSound: new ex.Sound(groundDigWavSource, groundDigMp3Source),
    ClankSound: new ex.Sound(clankMp3Source, clankWavSource),
}

