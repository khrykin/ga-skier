import Point from './Point';

class Movement {
  constructor(type, target) {
    this.type = type;
    this.target = target;
  }
}

class Bone {
  children  = {};
  length    = 0;
  angle     = 0;
  start     = new Point(0, 0);
  events    = {};

  constructor(name, parent, props={}) {
    this.name = name;
    this.parent = parent;
    this.length = props.length;
    this.angle = props.angle || 0;
    this.MIN_ANGLE = this.angle;

    if (typeof props.start === 'object') {
      const { x, y } = props.start;
      this.start = new Point(x, y);
    }

    this.end = this.start
      .shift(0, this.length)
      .rotate(this.angle, this.start)
      ;
    this.events.onMove = props.onMove || function (e) { console.log(e) };
  }

  attach(name, length, angle) {
    let bone = new Bone(name, this, {
      length,
      angle,
      start: this.end,
      onMove: this.events.onMove
    });

    this.children[name] = bone;

    return this.children[name];
  }

  rotate(degrees, reverse = false) {
    let e = new Movement('rotation');
    e.previousState = {
      start: this.start,
      end: this.end
    };

    const oldEnd = this.end;

    this.end = this.end.rotate(degrees, this.start);
    this.updateChildrenPosition(oldEnd, degrees);

    e.target = this;
    this.events.onMove.call(this, e);
  };

  updateChildrenPosition(oldEnd, degrees) {
    for (let key in this.children) {

      const child   = this.children[key];
      const diff    = this.end.difference(oldEnd);

      child.start   = this.end;

      child.end = child.end
        .shift(diff)
        .rotate(child.angle + degrees, child.start)
        ;
      this.events.onMove.call(child, new Movement('updateToParent', child));
    }
  }

  inspect(level = 0) {
    let out = Bone.log(this, level);
    let children = this.children;

    while (children) {
      level++;
      for (let key in children) {
        out += children[key].inspect(level);
      }
      level = level + 1;
      children = children.children;
    }

    return out;
  }

  get dynasty() {
    let out = { [this.name]: this };
    let children = this.children;

    while (children) {
      for (let key in children) {
        out = { ...out, ...children[key].dynasty };
      }
      children = children.children;
    }

    return out;
  }


  toString() {
    return `[object  Bone]:\n` + this.inspect();
  }
}

Bone.log = function log({ name, length, start, end }, level) {
  const pad = level ? Array(level + 1).join("  ") +
    '└── ' : ' ';

  return `${pad}${name} (length: ${length},` +
    ` start: ${start}, ` +
    ` end: ${end}` +
    `)\n`;
};

export default Bone;

if (typeof window !== 'undefined') {
  window.Bone = Bone;
  window.Point = Point;
}
