import { expect } from 'chai';

import { getEmptySquare, getPotentialMoves, getRandomOddNumber, placeRoom } from './maze-generator';

describe('getPotentialMoves()', () => {
  let width, height;
  beforeEach(() => {
    width = 20;
    height = 20;
  });

  it('should return `undefined` if passed invalid args', () => {
    const result = getPotentialMoves(width, height, [-1, height + 1]);
    expect(result).to.be.an('undefined');
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
    for(let y = 0; y < height; y++) {
      const row = [];
      for(let x = 0; x < width; x++) {
        row[x] = false;
      }
      map[y] = row;
    }
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


// describe('getRandomRoom()', () => {
//   const width = 20,
//     height = 20;
//   const maxRoomWidth = 20,
//     maxRoomHeight = 20;
//   let map = [],
//     roomWidth,
//     roomHeight;

//   beforeEach(() => {
//     width = getRandomOddNumber(maxWidth);
//     height = getRandomOddNumber(maxHeight);
//     for(let y = 0; y < height; y++) {
//       const row = [];
//       for(let x = 0; x < width; x++) {
//         row[x] = false;
//       }
//       map[y] = row;
//     }
//   });

//   it('should return an object', () => {
//     const result = getRandomRoom(map, maxRoomWidth, maxRoomHeight);
//     expect(result).to.be.an('object');
//   });

//   it('the returned object should have an origin, width, and height', () =>{
//     const result = getRandomRoom(map, maxRoomWidth, maxRoomHeight);
//     expect(result.origin).to.not.be.an('undefined');
//     expect(result.width).to.not.be.an('undefined');
//     expect(result.height).to.not.be.an('undefined');
//   });

//   it('returned object should only have odd origin cooridnates', () => {
//     const result = getRandomRoom(map, maxRoomWidth, maxRoomHeight);
//     expect(result.origin[0] % 2).to.equal(1);
//     expect(result.origin[1] % 2).to.equal(1);
//   });

//   it('returned room should fit in map', () => {
//     const result = getRandomRoom(map, maxRoomWidth, maxRoomHeight);
//     expect(result.origin[0] + result.width).to.be.below(map.length);
//     expect(result.origin[1] + result.height).to.be.below(map.length);
//   });
// });


describe('placeRoom()', () => {
  const map = [];
  const width = 100,
        height = 100;
  let roomWidth = 5,
        roomHeight = 5;

  beforeEach(() => {
    for(let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        row[x] = false;
      }
      map.push(row);
    }
  });

  it('returns an array', () => {
    let result = placeRoom(map, roomWidth, roomHeight);
    expect(result).to.be.an('array');
    // let string = '';
    // for(let y = 0; y < result[0].length; y++ ) {
      // for(let x = 0; x < result.length; x++) {
      //   string += result[y][x] ? '#' : '.';
      // }
      // string += '\n';
    // }
    // console.log(string);
  });
});
