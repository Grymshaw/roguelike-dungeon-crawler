/* eslint "no-mixed-operators": 0 */
// import { inRange } from './helpers';

export const getPotentialMoves = (width, height, coords) => {
  const x = coords[0];
  const y = coords[1];

  if (x < 0 || x >= width || y < 0 || y >= height) {
    throw (new Error(`Error: invalid arguments: (x,y): (${x}, ${y})`));
  }

  const possibleMoves = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  return possibleMoves.reduce((acc, move) => {
    if (x + move[0] >= 0 && x + move[0] < width && y + move[1] >= 0 && y + move[1] < height) {
      acc.push([x + move[0], y + move[1]]);
    }
    return acc;
  }, []);
};


export const getEmptySquare = (map) => {
  for (let y = 1; y < map.length; y += 2) {
    for (let x = 1; x < map[y].length; x += 2) {
      const potentialMoves = getPotentialMoves(map[y].length, map.length, [x, y]);
      if (potentialMoves.filter(move => map[move[1]][move[0]]).length === 0) {
        return [x, y];
      }
    }
  }
  return [];
};


export const initializeEmptyMap = (width, height) => {
  const map = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(false);
    }
    map.push(row);
  }
  return map;
};


export const placeRoom = (map, origin, roomWidth, roomHeight) => {
  if (origin[0] % 2 === 0 || origin[1] % 2 === 0 || roomWidth % 2 === 0 || roomHeight % 2 === 0) {
    throw (new Error('Invalid arguments -- coords and dimensions must be odd'));
  }

  // check if room fits inside bounds of map
  let isPlaceable = origin[1] + roomHeight < map.length - 2
    || origin[0] + roomWidth < map[0].width - 2;
  // check if room is blocked by existing ones
  for (let y = origin[1]; y < roomHeight && isPlaceable; y++) {
    for (let x = origin[0]; x < roomWidth && isPlaceable; x++) {
      isPlaceable = isPlaceable && !map[y][x];
    }
  }
  const newMap = map.map(row => row.slice());
  // fill in map if it's placeable
  if (isPlaceable) {
    for (let y = origin[1]; y < roomHeight; y++) {
      for (let x = origin[0]; x < roomWidth; x++) {
        newMap[y][x] = true;
      }
    }
  }
  return {
    newMap,
    wasPlaced: isPlaceable,
  };
};


export const checkMazeDirection = (map, origin, direction) => {
  const y = origin[1];
  const dy = direction[1];
  const x = origin[0];
  const dx = direction[0];
  // direction goes off the map
  if (y + 2 * dy < 1 || y + 2 * dy > map.length - 2
    || x + 2 * dx < 1 || x + 2 * dx > map[0].length - 2) {
    return false;
  }
  // 1. row must be defined, and
  // 2. direction adjacent square in that direction must be free (ie. false on map)
  // 3. 2 squares in that direction must also be free (ie. false on map)
  return map[y + dy] !== undefined
    && map[y + dy][x + dx] === false
    && map[y + 2 * dy] !== undefined
    && map[y + 2 * dy][x + 2 * dx] === false;
};


export const getRandomOddNumber = (max, random = Math.random()) => (
  (2 * parseInt(random * max / 2, 10)) + 1
);

export const getRandomOrigin = (maxWidth, maxHeight, roomWidth, roomHeight) => {
  const x = getRandomOddNumber(maxWidth - roomWidth);
  const y = getRandomOddNumber(maxHeight - roomHeight);
  return [x, y];
};


export const extendMaze = (map, origin, direction) => {
  const x = origin[0];
  const y = origin[1];
  const dx = direction[0];
  const dy = direction[1];
  const newMap = map.map(row => row.slice());
  const newX = x + 2 * dx;
  const newY = y + 2 * dy;
  if (newX < 1 || newX > newMap[0].length - 2 || newY < 1 || newY > newMap.length - 2) {
    throw (new Error(`Invalid origin -- (x,y): (${x}, ${y})`));
  }
  if (!map[y][x]) {
    newMap[y][x] = true;
  }
  newMap[y + dy][x + dx] = true;
  newMap[y + 2 * dy][x + 2 * dx] = true;
  return newMap;
};


export const addMaze = (map, startCoords) => {
  let newMap = map.map(row => row.slice());
  const queue = [startCoords];
  while (queue.length > 0) {
    let moves = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    moves = moves.filter(move => (
      checkMazeDirection(newMap, queue[queue.length - 1], move)
    ));
    if (moves.length > 0) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      const x = queue[queue.length - 1][0];
      const y = queue[queue.length - 1][1];
      const dx = move[0];
      const dy = move[1];
      newMap = extendMaze(newMap, queue[queue.length - 1], move);
      queue.push([x + 2 * dx, y + 2 * dy]);
    } else {
      queue.pop();
    }
  }
  return newMap;
};


export const addAllRooms = (map, maxRoomWidth, maxRoomHeight) => {
  const MAX_ATTEMPTS = 50;
  let numAttempts = 0;
  let newMap = map.map(row => row.slice());
  while (numAttempts < MAX_ATTEMPTS) {
    const width = getRandomOddNumber(maxRoomWidth);
    const height = getRandomOddNumber(maxRoomHeight);
    const origin = getRandomOrigin(newMap[0].length, newMap.length, width, height);
    const result = placeRoom(newMap, origin, width, height);
    if (result.wasPlaced) {
      newMap = result.newMap;
      numAttempts = 0;
    } else {
      numAttempts += 1;
    }
  }
  return newMap;
};
