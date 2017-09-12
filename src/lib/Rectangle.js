function Rectangle(origin, width, height) {
  this.origin = origin;
  this.width = width;
  this.height = height;
}

Rectangle.prototype.contains = function (point) {
  return point[0] >= this.origin[0]
    && point[0] <= this.origin[0] + this.width
    && point[1] >= this.origin[1]
    && point[1] <= this.origin[1] + this.height;
};

Rectangle.prototype.overlaps = function (other) {
  const left = this.origin[0];
  const right = this.origin[0] + this.width;
  const bottom = this.origin[1];
  const top = this.origin[1] + this.height;

  const otherLeft = other.origin[0];
  const otherRight = other.origin[0] + other.width;
  const otherBottom = other.origin[1];
  const otherTop = other.origin[1] + other.height;

  return left <= otherRight
    && right >= otherLeft
    && top >= otherBottom
    && bottom <= otherTop;
};

export default Rectangle;
