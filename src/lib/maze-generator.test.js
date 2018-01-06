/* eslint no-undef: 0 */
import { expect } from 'chai';

import { addAllRooms, addMaze, addRoomsAndMazes, addRoomToMap, checkMazeDirection, extendMaze, getEmptySquare, getPotentialMoves, getRandomOddNumber, getRandomOrigin, initializeEmptyMap, placeRoom } from './maze-generator';
import Rectangle from './Rectangle';


describe('getRandomOddNumber()', () => {
  const max = 15;

  it('returns a known number if the random param is supplied', () => {
    const random = Math.random();
    const result = getRandomOddNumber(max, random);
    expect(result).to.equal((parseInt(random * max / 2, 10) * 2) + 1);
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
    expect(parseInt(result, 10)).to.equal(result);
  });
});


describe('getRandomOrigin()', () => {
  const maxWidth = 15;
  const maxHeight = 16;
  const roomWidth = 9;
  const roomHeight = 7;
  it('returns an array of 2D coordinates', () => {
    const result = getRandomOrigin(maxWidth, maxHeight, roomWidth, roomHeight);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
  });
});


describe('getPotentialMoves()', () => {
  let width;
  let height;
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
  const width = 20;
  const height = 20;
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
    map = map.map(row => row.map(() => true));
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
  const width = 100;
  const height = 90;

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
  let map;
  let rooms = [];
  const width = 101;
  const height = 101;

  beforeEach(() => {
    map = initializeEmptyMap(width, height);
    rooms = [];
  });

  it('should return an object with newRooms and wasPlaced properties', () => {
    const result = placeRoom(rooms, map, new Rectangle([1, 1], 3, 3));
    expect(result).to.be.an('object');
    expect(result).to.have.own.property('newRooms');
    expect(result).to.have.own.property('wasPlaced');
  });

  it('should have the new room in the returned rooms if placed', () => {
    const result = placeRoom(rooms, map, new Rectangle([1, 1], 3, 3));
    expect(result.wasPlaced).to.equal(true);
    expect(result.newRooms.length).to.equal(1);
    expect(result.newRooms[0]).to.deep.include({ origin: [1, 1], width: 3, height: 3 });
  });

  it('should not have the new room in the returned rooms', () => {
    rooms.push(new Rectangle([3, 3], 1, 1));
    const result = placeRoom(rooms, map, new Rectangle([1, 1], 3, 3));
    expect(result.wasPlaced).to.equal(false);
    expect(result.newRooms.length).to.equal(1);
    expect(result.newRooms[0]).to.deep.include({ origin: [3, 3], width: 1, height: 1 });
    expect(result.newRooms[0]).to.not.deep.include({ origin: [1, 1], width: 3, height: 3 });
  });

  it('should throw if coords are not both odd', () => {
    let invalidCall = () => placeRoom(rooms, map, new Rectangle([2, 1], 1, 1));
    expect(invalidCall).to.throw();

    invalidCall = () => placeRoom(rooms, map, new Rectangle([1, 2], 1, 1));
    expect(invalidCall).to.throw();
  });

  it('should throw if room dimensions are not both odd', () => {
    let invalidCall = () => placeRoom(rooms, map, new Rectangle([1, 2], 2, 2));
    expect(invalidCall).to.throw();

    invalidCall = () => placeRoom(rooms, map, new Rectangle([1, 2], 2, 2));
    expect(invalidCall).to.throw();
  });

  // it('should return a new map with the new room if the room is placed successfully', () => {
  //   const result = placeRoom(map, [1, 1], roomWidth, roomHeight);
  //   expect(result).to.be.an('object');
  //   expect(result).to.have.own.property('newMap');
  //   expect(result).to.have.own.property('wasPlaced');
  //   let isRoomMade = true;
  //   const { newMap } = result;
  //   for (let y = 1; y < roomHeight && isRoomMade; y += 1) {
  //     for (let x = 1; x < roomWidth && isRoomMade; x += 1) {
  //       isRoomMade = isRoomMade && newMap[y][x];
  //     }
  //   }
  //   expect(isRoomMade).to.equal(true);
  // });
  // it('should return false if the room is not placed, and the room should not be placed', () => {
  //   map[1][1] = true;
  //   const result = placeRoom(map, [1, 1], roomWidth, roomHeight);
  //   expect(result.wasPlaced).to.equal(false);
  //   let isSame = true;
  //   for (let y = 0; y < map.length && isSame; y++) {
  //     for (let x = 0; x < map[0].length && isSame; x++) {
  //       isSame = result.newMap[y][x] === map[y][x];
  //     }
  //   }
  //   expect(isSame).to.equal(true);
  // });
  // it('should throw if coords are not both odd', () => {
  //   let invalidCall = () => placeRoom(map, [2, 1], roomWidth, roomHeight);
  //   expect(invalidCall).to.throw();

  //   invalidCall = () => placeRoom(map, [1, 2], roomWidth, roomHeight);
  //   expect(invalidCall).to.throw();
  // });
  // it('should throw if room dimensions are not both odd', () => {
  //   let invalidCall = () => placeRoom(map, [1, 1], 2, roomHeight);
  //   expect(invalidCall).to.throw();

  //   invalidCall = () => placeRoom(map, [1, 1], roomWidth, 2);
  //   expect(invalidCall).to.throw();
  // });
});


describe('checkMazeDirection()', () => {
  const origin = [3, 3];
  const mapWidth = 99;
  const mapHeight = 101;
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
    const direction = [0, 1];
    map[origin[1] + (2 * direction[1])][origin[0] + (2 * direction[0])] = true;
    const result = checkMazeDirection(map, origin, direction);
    expect(result).to.equal(false);
  });
  it('returns false if direction goes off map', () => {
    // check when out of bounds of map
    const direction = [-1, 0];
    const result = checkMazeDirection(map, [1, 1], direction);
    expect(result).to.equal(false);
  });
});


describe('extendMaze()', () => {
  let map;
  beforeEach(() => {
    map = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];
  });
  it('returns a new map', () => {
    const result = extendMaze(map, [1, 1], [1, 0]);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(map.length);
    expect(result[0].length).to.equal(map[0].length);
  });
  it('returned map has 2 more filled squares in specified direction', () => {
    const result = extendMaze(map, [1, 1], [1, 0]);
    const expected = [
      [false, false, false, false, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];
    const isSame = expected.reduce((acc, row, y) => {
      row.map((val, x) => {
        acc = acc && val === result[y][x];
        return val;
      });
      return acc;
    }, true);
    expect(isSame).to.equal(true);
  });
});


describe('addMaze()', () => {
  let map;
  const width = 100;
  const height = 100;
  beforeEach(() => {
    map = initializeEmptyMap(width, height);
  });
  it('returns a new map', () => {
    const result = addMaze(map, [1, 1]);
    expect(result).to.be.an('array');
    // let str = '';
    // for (let y = 0; y < result.length; y++) {
    //   for (let x = 0; x < result[0].length; x++) {
    //     result[y][x]
    //       ? str+= '#'
    //       : str += '.';
    //   }
    //   str += '\n';
    // }
    // console.log(str);
  });
});


describe('addAllRooms()', () => {
  const maxRoomWidth = 15;
  const maxRoomHeight = 13;
  let map;
  beforeEach(() => {
    map = initializeEmptyMap(50, 50);
  });
  it('returns a new map', () => {
    const result = addAllRooms(map, maxRoomWidth, maxRoomHeight);
    expect(result).to.be.an('object');
    expect(result.newMap.length).to.equal(map.length);
    expect(result.newMap[0].length).to.equal(map[0].length);

    // const temp = addRoomToMap(map, new Rectangle([43, 43], 5, 5));
    // console.log(result);
    // const temp = result.newMap;
    // let str = '';
    // for (let y = 0; y < temp.length; y++) {
    //   for (let x = 0; x < temp[0].length; x++) {
    //     temp[y][x]
    //       ? str+= '#'
    //       : str += '.';
    //   }
    //   str += '\n';
    // }
    // console.log(str);

  });
});


// describe('addRoomsAndMazes()', () => {
//   let map;
//   beforeEach(() => {
//     map = initializeEmptyMap(50, 50);
//   });
//   it('returns a new map', () => {
//     const result = addRoomsAndMazes(map);
//     expect(result).to.be.an('array');
//     expect(result.length).to.equal(map.length);
//     expect(result[0].length).to.equal(map[0].length);
//   });

//   // it('should look like a map', () => {
//   //   const result = addRoomsAndMazes(map);
//   //   let str = '';
//   //   for (let y = 0; y < newMap.length; y++) {
//   //     for (let x = 0; x < newMap[0].length; x++) {
//   //       newMap[y][x]
//   //         ? str += '#'
//   //         : str += '.';
//   //     }
//   //     str += '\n';
//   //   }
//   //   console.log(str);
//   // });
// });
