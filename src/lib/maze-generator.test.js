import { expect } from 'chai';

import { checkMazeDirection, getEmptySquare, getPotentialMoves, getRandomOddNumber, getRandomOrigin, initializeEmptyMap, placeRoom } from './maze-generator';


describe('getRandomOddNumber()', () => {
  const max = 15;

  it('returns a known number if the random param is supplied', () => {
    const random = Math.random();
    const result = getRandomOddNumber(max, random);
    expect(result).to.equal(((random * max / 2) | 0) * 2 + 1);
  });
  it('returns a maximum of max param if max is odd', () => {
      const result = getRandomOddNumber(max, 0.99999999999999);
      expect(result).to.equal(max);
  });
  it('returns a maximum of max - 1 if max is even', () => {
    const result = getRandomOddNumber(16, 0.999999999999);
    expect(result).to.equal(15);
  });
  it('returns a minimum of 1', () => {
    const result = getRandomOddNumber(max, 0);
    expect(result).to.equal(1);
  });
  it('returns a whole number even if random is not supplied', () => {
    const result = getRandomOddNumber(max);
    expect(result | 0).to.equal(result);
  });
});


describe('getRandomOrigin()', () => {
  const maxWidth = 15,
        maxHeight = 16;
  const roomWidth = 9,
        roomHeight = 7;
  it('returns an array of 2D coordinates', () => {
    const result = getRandomOrigin(maxWidth, maxHeight, roomWidth, roomHeight);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
  });
});


describe('getPotentialMoves()', () => {
  let width, height;
  beforeEach(() => {
    width = 20;
    height = 20;
  });

  it('should throw if passed invalid args', () => {
    const invalidCall = () => getPotentialMoves(width, height, [-1, height + 1]);
    expect(invalidCall).to.throw();
  });

  it('should return an array when called with valid args', () => {
    const coords = [10, 10];
    const result = getPotentialMoves(width, height, coords);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(4);
  });

  it('should take out negative or too high coordinates', () => {
    let coords = [0, 0];
    let result = getPotentialMoves(width, height, coords);
    expect(result.length).to.equal(2);

    coords = [width - 1, height - 1];
    result = getPotentialMoves(width, height, coords);
    expect(result.length).to.equal(2);
  });
});


describe('getEmptySquare()', () => {
  const width = 20,
    height = 20;
  let map = [];

  beforeEach(() => {
    map = initializeEmptyMap(width, height);
  });

  it('returns an array', () => {
    const result = getEmptySquare(map);
    expect(result).to.be.an('array');
  });

  it('returns an array of coords', () => {
    const result = getEmptySquare(map);
    expect(result.length).to.equal(2);
  });

  it('returns an empty array if no possible moves left', () => {
    map = map.map(row => row.map(val => true));
    const result = getEmptySquare(map);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });

  it('should only return odd coordinates', () => {
    const result = getEmptySquare(map);
    expect(result[0] % 2).to.equal(1);
    expect(result[1] % 2).to.equal(1);
  });
});


describe('initializeEmptyMap()', () => {
  const width = 100,
        height = 90;

  it('should return a 2D array', () => {
    const result = initializeEmptyMap(width, height);
    expect(result[0]).to.be.an('array');
  });
  it('returned arary should be specified dimensions', () => {
    const result = initializeEmptyMap(width, height);
    expect(result.length).to.equal(height);
    expect(result[0].length).to.equal(width);
  });
});


describe('placeRoom()', () => {
  let map, origin, roomWidth = 11 , roomHeight = 11;
  const width = 101, height = 101;
  beforeEach(() => {
    map = initializeEmptyMap(width, height);
  });
  it('should return a new map with the new room if the room is placed successfully', () => {
    const result = placeRoom(map, [1, 1], roomWidth, roomHeight);
    expect(result).to.be.an('array');
    let isRoomMade = true;
    for(let y = 1; y < roomHeight && isRoomMade; y++) {
      for (let x = 1; x < roomWidth && isRoomMade; x++) {
        isRoomMade = isRoomMade && result[y][x];
      }
    }
    expect(isRoomMade).to.equal(true);
  });
  it('should return false if the room is not placed', () => {
    map[1][1] = true;
    const result = placeRoom(map, [1, 1], roomWidth, roomHeight);
    expect(result).to.equal(false);
  });
  it('should throw if coords are not both odd', () => {
    let invalidCall = () => placeRoom(map, [2, 1], roomWidth, roomHeight);
    expect(invalidCall).to.throw();

    invalidCall = () => placeRoom(map, [1, 2], roomWidth, roomHeight);
    expect(invalidCall).to.throw();
  });
  it('should throw if room dimensions are not both odd', () => {
    let invalidCall = () => placeRoom(map, [1, 1], 2, roomHeight);
    expect(invalidCall).to.throw();

    invalidCall = () => placeRoom(map, [1, 1], roomWidth, 2);
    expect(invalidCall).to.throw();
  });
});


describe('checkMazeDirection()', () => {
  const origin = [3, 3];
  const mapWidth = 99, mapHeight = 101;
  let map;
  beforeEach(() => {
    map = initializeEmptyMap(mapWidth, mapHeight);
  });
  it('returns true if the direction can be taken', () => {
    const direction = [0, 1];
    const result = checkMazeDirection(map, origin, direction);
    expect(result).to.equal(true);
  });
  it('returns false if the direction is blocked', () => {
    // check when in bounds but path blocked
    let direction = [0, 1];
    map[origin[1] + 2 * direction[1]][origin[0] + 2 * direction[0]] = true;
    let result = checkMazeDirection(map, origin, direction);
    expect(result).to.equal(false);
  });
  it('returns false if direction goes off map', () => {
    // check when out of bounds of map
    let direction = [-1, 0];
    let result = checkMazeDirection(map, [1, 1], direction);
    expect(result).to.equal(false);
  });
});


describe('extendMaze()', () => {
});

describe('addMaze()', () => {
  let map, start;
  beforeEach(() => {
    
  });
});
