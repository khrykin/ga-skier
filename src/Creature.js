import Bone from './Bone';
const emptyFunc = () => {};

class Creature {
  constructor(name, {
    lengths,
    angles,
    onMove,
    position,
    attachBones
  }) {
    this.name = name;
    this.onMove = onMove || emptyFunc;
    this.position = position;
    this.lengths = lengths;
    this.angles = angles;

    if (!this.attachBones) {
      this.attachBones = attachBones || emptyFunc;
    }

    this.backbone = this.buildBackbone();
    this.attachBones();
    this.bones = this.backbone.dynasty;
  }

  toString() {
    return this.backbone.toString();
  }

  buildBackbone() {
    return new Bone('backbone', null, {
      length: 0,
      start: this.position,
      onMove: this.onMove
    });
  }

  forEachBone(cb) {
    for (let key in this.bones) {
      cb(this.bones[key], key);
    }
  }
}

export default Creature;
