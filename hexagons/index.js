const screenRect = document.body.getBoundingClientRect();
console.log(screenRect);

const params = {
  sm: 80,
  md: 100,
  lg: 200,
  spacing: 0
};

const gridSize = {
  width: Math.ceil(screenRect.width / (4 * params.sm)),
  height: 25
};

console.log(gridSize);

const pallette = ['#91E673', '#9B81EB', '#E69B68', '#9EE6D5', '#EBAD98', '#D2BAE9'];

const cos30 = Math.sqrt(3) / 2;

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const svgNS = svg.namespaceURI;

//svg.setAttribute('stroke', 'black');
svg.setAttribute('fill', 'none');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '10000px');
svg.setAttribute('class', 'svg-root');
/**
 * Calculates the coordinates of tile[i][j] and outer radius R
 * @param {*} i 
 * @param {*} j 
 * @param {*} R 
 * @returns 
 */
function getPosition(i, j, R) {
  // Every odd row is offsetted inside of the grid
  const offsetX = ((i % 2) * 3 / 2 * R) + (i % 2 === 1) * params.spacing;
  const offsetY = 1 / 2 * params.spacing;
  return [j * (3 * R + 2 * params.spacing) + R + offsetX, i * (cos30 * R + offsetY) + R];
}

/**
 * Generates 6 points of the hexagon with the point 0,0 at its center
 * @param {*} R 
 * @returns 
 */
function Hexagon(R) {
  const r = cos30 * R;

  return [
    [-R / 2, -r], // top-left
    [R / 2, -r],  // top-right
    [R, 0],       // right
    [R / 2, r],   // bottom-right
    [-R / 2, r],  // bottom-left
    [-R, 0]       // left
  ];
}

/**
 * Generates 6 points of the half hexagon with the point 0,0 at its center
 * @param {*} R 
 * @returns 
 */
function LeftHalf(R) {
  const r = cos30 * R;

  return [
    [0, -r],      // top-left
    [R / 2, -r],  // top-right
    [R, 0],       // right
    [R / 2, r],   // bottom-right
    [0, r],       // bottom-left
    [0, 0]       // left
  ];
}

function RightHalf(R) {
  const r = cos30 * R;

  return [
    [-R / 2, -r], // top-left
    [0, -r],  // top-right
    [0, 0],       // right
    [0, r],   // bottom-right
    [-R / 2, r],  // bottom-left
    [-R, 0]       // left
  ];
}

function UpperHalf(R) {
  const r = cos30 * R;

  return [
    [-R / 2, 0], // top-left
    [R / 2, 0],  // top-right
    [R, 0],       // right
    [R / 2, r],   // bottom-right
    [-R / 2, r],  // bottom-left
    [-R, 0]       // left
  ];
}

function BottomHalf(R) {
  const r = cos30 * R;

  return [
    [-R / 2, -r], // top-left
    [R / 2, -r],  // top-right
    [R, 0],       // right
    [R / 2, 0],   // bottom-right
    [-R / 2, 0],  // bottom-left
    [-R, 0]       // left
  ];
}

/**
 * Generates 6 points of the quarter hexagon with the point 0,0 at its center
 * @param {*} R 
 * @returns 
 */
function TopRightQuarter(R) {
  const r = cos30 * R;

  return [
    [0, 0],      // top-left
    [R / 2, 0],  // top-right
    [R, 0],       // right
    [R / 2, r],   // bottom-right
    [0, r],       // bottom-left
    [0, 0]       // left
  ];
}

function BottomRightQuarter(R) {
  const r = cos30 * R;

  return [adsadsad
    [0, -r], // top-left
    [R / 2, -r],  // top-right
    [R, 0],       // rightdasd
    [R / 2, 0],   // bottom-right
    [0, 0],       // bottom-left
    [0, 0]       // left
  ];
}

function translate(points, vector2D) {
  return points.map(point => [point[0] + vector2D[0], point[1] + vector2D[1]]);
}

function getPolygonFromPoints(points, options) {
  const poly = document.createElementNS(svgNS, 'polygon');
  poly.setAttribute('points', points.map(point => point.join(',')).join(' '));

  if (options.fill) {
    poly.setAttribute('fill', options.fill);
  }

  if (options.stroke) {
    poly.setAttribute('stroke', options.stroke);
  }

  return poly;
}

const polyOptions = {
  fill: 'white',
  stroke: 'red'
};

for (let i = 0; i < gridSize.height; ++i) {
  for (let j = 0; j < gridSize.width; ++j) {
    let figure;
    if (i === 0 && j === 0) {
      figure = TopRightQuarter;
    } else if (i === gridSize.height - 1 && j === 0) {
      figure = BottomRightQuarter;
    } else if (i === 0) {
      figure = UpperHalf
    } else if (i === gridSize.height - 1) {
      figure = BottomHalf
    } else if (j === 0 && i % 2 === 0) {
      figure = LeftHalf;
    } else if (j === gridSize.width - 1 && i % 2 === 1) {
      figure = RightHalf
    } else {
      figure = Hexagon;
    }

    svg.appendChild(
      getPolygonFromPoints(
        translate(
          figure(params.sm),
          getPosition(i, j, params.sm)
        ),
        polyOptions
      )
    );
  }
}

document.body.appendChild(svg);