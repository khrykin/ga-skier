import Bone from './Bone';

const L = 100;
const LENGTHS = {
  neck:     0.5  * L,
  back:            L,
  loin:     0.97 * L,
  hip:      0.33 * L ,
  leg:      0.87 * L,
  foot:     0.42 * L,
  forearm:  0.73 * L,
  arm:      0.67 * L,
  pole:     2    * L
}

const ANGLES = {
  neck:     180 - 10,
  back:     0,
  loin:     1,
  hip:      5,
  leg:      -10,
  foot:     90,
  forearm:  25,
  arm:      - 5,
  pole:     - 45
}

class Body {
  constructor(name, { lengths, angles, onMove, position }) {
    this.name = name;
    this.lengths = { ...LENGTHS, lengths };
    this.angles = { ...ANGLES, angles };
    this.onMove = onMove || function () {};
    this.position = position;

    this.backbone = this.buildBackbone();
    this.bones = this.backbone.dynasty;
  }

  toString() {
    return this.backbone.toString();
  }

  buildBackbone() {
    let backbone = new Bone('backbone', null, {
      length: 0,
      start: this.position,
      onMove: this.onMove
    });



    backbone
      .attach('neck',     this.lengths.neck,    this.angles.neck)
      ;

    backbone
      .attach('loin',     this.lengths.loin,    this.angles.loin)
      .attach('hip',      this.lengths.hip,     this.angles.hip)
      .attach('leg',      this.lengths.leg,     this.angles.leg)
      .attach('foot',     this.lengths.foot,    this.angles.foot)
      ;

    backbone
      .attach('arm',      this.lengths.arm,     this.angles.arm)
      .attach('forearm',  this.lengths.forearm, this.angles.forearm)
      .attach('pole',     this.lengths.pole,    this.angles.pole)
      ;

    return backbone;
  }

  forEachBone(cb) {
    for (let key in this.bones) {
      cb(this.bones[key], key);
    }
  }
}

export default Body;
