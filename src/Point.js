class Point {
  constructor(x, y) {
    this.moveTo(x, y);
  }

  toString() {
    return `<${this.x}, ${this.y}>`;
  }

  moveTo(x = this.x, y = this.x) {
    if (x instanceof Point) {
      this.x = x.x,
      this.y = x.y
    }
    this.x = Number(x);
    this.y = Number(y);
  }

  shift(x = 0, y = 0) {
    if (x instanceof Point) {
      return new Point(
        this.x + x.x,
        this.y + x.y
      );
    }
    return new Point(
      this.x + Number(x),
      this.y + Number(y)
    );
  }

  rotate(angle = 0, handle = this) {
    const radius = Point.distance(this, handle);
    return new Point(
      handle.x + radius * Math.sin(
        Point.radiansFromDegrees(Number(angle))
      ),
      handle.y + radius * Math.cos(
        Point.radiansFromDegrees(Number(angle))
      )
    );
  }
}

Point.radiansFromDegrees = function (degrees) {
  return (Math.PI / 180 ) * degrees;
};

Point.distance = function (A, B) {
  const XX = A.x - B.x;
  const YY = A.y - B.y;
  return Math.sqrt(XX * XX + YY * YY);
}

Point.zero = new Point(0, 0);

export default Point
