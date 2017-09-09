export const getPotentialMoves = (width, height, coords) => {
  const x = coords[0],
    y = coords[1];

  if(x < 0 || x >= width || y < 0 || y >= height) {
    return;
  }

  const possibleMoves = [ [-1, 0], [0, -1], [1, 0], [0, 1] ];
  return possibleMoves.reduce((acc, move) => {
    if (x + move[0] >= 0 && x + move[0] < width && y + move[1] >= 0 && y + move[1] < height)
      acc.push( [ x + move[0], y + move[1] ] )
    return acc;
  }, []);
};


export const getEmptySquare = (map) => {
  for(let y = 1; y < map.length; y += 2) {
    for(let x = 1; x < map[y].length; x += 2) {
      const potentialMoves = getPotentialMoves(map[y].length, map.length, [x, y]);
      if(potentialMoves.filter( move => map[move[1]][move[0]] ).length === 0) {
        return [x, y];
      }
    }
  }
  return [];
};


// export const getRandomRoom = (map, maxWidth, maxHeight) => {
//   const MAX_ATTEMPTS = 200;
//   const width = ((Math.random() * maxWidth / 2) | 0) * 2 + 1;
//   const height = ((Math.random() * maxHeight / 2) | 0) * 2 + 1;

//   let found = false;
//   let origin;
//   for(let i = 0; i < MAX_ATTEMPTS && !found; i++) {
//     origin = getEmptySquare(map);
//     if(origin[0] + height < map[0].length && origin[1] + height < map.length) {
//       found = true;
//     }
//   }

//   if(!found) return { origin: [-1, -1], width: 0, height: 0 };

//   return { origin, width, height };
// };


export const placeRoom = (map, width, height) => {
  const MAX_ATTEMPTS = 200;

  let isPlaced = false;
  let isBlocked = false;

  let origin;

  for(let i = 0; i < MAX_ATTEMPTS && !isPlaced; i++) {
    origin = getRandomOrigin(map[0].length, map.length, width, height);
    for(let y = origin[1]; y < origin[1] + height && !isBlocked; y++) {
      for (let x = origin[0]; x < origin[0] + width && !isBlocked; x++) {
        if(map[y][x]) isBlocked = true;
      }
    }
    if(!isBlocked) isPlaced = true;
  }

  // place the room in the map
  if(isPlaced) {
    const newMap = map.map(row => row.map(val => val));
    for(let y = origin[1]; y < origin[1] + height; y++) {
      for (let x = origin[0]; x < origin[0] + width; x++) {
        newMap[y][x] = true;
      }
    }
    return newMap;
  } else {
    return map;
  }

  // indicate the generation is finished
  //TODO: Make it so that dungeon generation is finished (ie. in Redux store)
};


export const getRandomOddNumber = (max) => {
  return ((Math.random() * max / 2) | 0) * 2 + 1;
};

export const getRandomOrigin = (maxWidth, maxHeight, roomWidth, roomHeight) => {
  const x = getRandomOddNumber(maxWidth - roomWidth),
        y = getRandomOddNumber(maxHeight - roomHeight);
  return [x, y];
};


export const addMazeRoutes = (map) => {
  let start = getEmptySquare(map);
};
