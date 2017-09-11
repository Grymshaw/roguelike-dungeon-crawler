import { inRange } from './helpers';


export const getPotentialMoves = (width, height, coords) => {
  const x = coords[0],
        y = coords[1];

  if(x < 0 || x >= width || y < 0 || y >= height) {
    throw(new Error('Error: invalid arguments'));
  }

  const possibleMoves = [ [-1, 0], [0, -1], [1, 0], [0, 1] ];
  return possibleMoves.reduce((acc, move) => {
    (x + move[0] >= 0 && x + move[0] < width && y + move[1] >= 0 && y + move[1] < height)
      && acc.push([x + move[0], y + move[1]]);
    return acc;
  }, []);
};


export const getEmptySquare = (map) => {
  for(let y = 1; y < map.length; y += 2) {
    for(let x = 1; x < map[y].length; x += 2) {
      const potentialMoves = getPotentialMoves(map[y].length, map.length, [x, y]);
      if(potentialMoves.filter(move => map[move[1]][move[0]] ).length === 0) {
        return [x, y];
      }
    }
  }
  return [];
};


export const initializeEmptyMap = (width, height) => {
  const map = [];
  for(let y = 0; y < height; y++) {
    const row = [];
    for(let x = 0; x < width; x++) {
      row.push(false);
    }
    map.push(row);
  }
  return map;
};


export const placeRoom = (map, origin, roomWidth, roomHeight) => {
  if(origin[0] % 2 === 0 || origin[1] % 2 === 0 || roomWidth % 2 === 0 || roomHeight % 2 === 0)
    throw(new Error('Invalid arguments -- coords and dimensions must be odd'));

  let isPlaceable = true;
  for(let y = origin[1]; y < roomHeight && isPlaceable; y++) {
    for(let x = origin[0]; x < roomWidth && isPlaceable; x++) {
      isPlaceable = isPlaceable && !map[y][x];
    }
  }
  if (isPlaceable) {
    const newMap = Object.assign([], map);
    for(let y = origin[1]; y < roomHeight && isPlaceable; y++) {
      for(let x = origin[0]; x < roomWidth && isPlaceable; x++) {
        newMap[y][x] = true;
      }
    }
    return newMap;
  }
  return false;
};


export const checkMazeDirection = (map, origin, direction) => {
  const y = origin[0], dy = direction[1],
        x = origin[1], dx = direction[0];
  // direction goes off the map
  if(!inRange(y + 2 * dx, 0, map.length) || !inRange(x + 2 * dx, 0, map[0].length)) {
    return false;
  }
  // 1. row must be defined, and
  // 2. direction adjacent square in that direction must be okay
  // 3. 2 squares in that direction must also be free
  return (map[y + dy] !== undefined && !map[y + dy][x + dx]) &&
    (map[y + 2 * dy] !== undefined && !map[y + 2 * dy][x + 2 * dx]);
};

// export const placeRoom = (map, width, height) => {
//   const MAX_ATTEMPTS = 200;

//   let isPlaced = false;
//   let isBlocked = false;

//   let origin;

//   for(let i = 0; i < MAX_ATTEMPTS && !isPlaced; i++) {
//     origin = getRandomOrigin(map[0].length, map.length, width, height);
//     for(let y = origin[1]; y < origin[1] + height && !isBlocked; y++) {
//       for (let x = origin[0]; x < origin[0] + width && !isBlocked; x++) {
//         if(map[y][x]) isBlocked = true;
//       }
//     }
//     if(!isBlocked) isPlaced = true;
//   }

//   // place the room in the map
//   if(isPlaced) {
//     const newMap = map.map(row => row.map(val => val));
//     for(let y = origin[1]; y < origin[1] + height; y++) {
//       for (let x = origin[0]; x < origin[0] + width; x++) {
//         newMap[y][x] = true;
//       }
//     }
//     return newMap;
//   } else {
//     return map;
//   }

//   // TODO: condsider returning object instead of arary { didFail: bool, map: arr }

//   // indicate the generation is finished
//   //TODO: Make it so that dungeon generation is finished (ie. in Redux store)
// };


export const getRandomOddNumber = (max, random = Math.random()) => {
  return ((random * max / 2) | 0) * 2 + 1;
};

export const getRandomOrigin = (maxWidth, maxHeight, roomWidth, roomHeight) => {
  const x = getRandomOddNumber(maxWidth - roomWidth),
        y = getRandomOddNumber(maxHeight - roomHeight);
  return [x, y];
};


export const addMazeRoutes = (map) => {
  let start = getEmptySquare(map);
};
