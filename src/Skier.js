import Creature from './Creature';

const L = 80;
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

class Skier extends Creature {
  constructor(name, props) {
    const lengths = { ...LENGTHS, lengths };
    const angles = { ...ANGLES, angles };
    super(name, { ...props, lengths, angles });
  }

  attachBones() {
    this.backbone
      .attach('neck',     this.lengths.neck,    this.angles.neck)
      ;

    this.backbone
      .attach('back',     this.lengths.back,    this.angles.back)
      .attach('loin',     this.lengths.loin,    this.angles.loin)
      .attach('hip',      this.lengths.hip,     this.angles.hip)
      .attach('leg',      this.lengths.leg,     this.angles.leg)
      .attach('foot',     this.lengths.foot,    this.angles.foot)
      ;

    this.backbone
      .attach('arm',      this.lengths.arm,     this.angles.arm)
      .attach('forearm',  this.lengths.forearm, this.angles.forearm)
      .attach('pole',     this.lengths.pole,    this.angles.pole)
      ;
  }
}

export default Skier;
