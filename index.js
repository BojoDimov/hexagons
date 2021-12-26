const params = {
  sm: 50,
  md: 100,
  lg: 200,
  spacing: 5
};

const gridSize = {
  width: 10,
  height: 25
};

const pallette = ['#91E673', '#9B81EB', '#E69B68', '#9EE6D5', '#EBAD98', '#D2BAE9'];

const cos30 = Math.sqrt(3) / 2;

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const svgNS = svg.namespaceURI;

svg.setAttribute('stroke', 'black');
svg.setAttribute('fill', 'none');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');

/**
 * Calculates the coordinates of tile[i][j] and outer radius R
 * @param {*} i 
 * @param {*} j 
 * @param {*} R 
 * @returns 
 */
function getHex(i, j, R) {
  // Every odd row is offsetted inside of the grid
  const offsetX = (i % 2) * 3 / 2 * R;
  return [j * 3 * R + R + offsetX, i * cos30 * R + R];
}

function flatSideUpHexvg(x, y, R) {
  const r = cos30 * R;
  // top-left
  const [Ax, Ay] = [x - R / 2, y - r];

  // top-right
  const [Bx, By] = [x + R / 2, y - r];

  // right
  const [Cx, Cy] = [x + R, y];

  // bottom-right
  const [Dx, Dy] = [x + R / 2, y + r];

  // bottom-left
  const [Ex, Ey] = [x - R / 2, y + r];

  // left
  const [Fx, Fy] = [x - R, y];

  const fill = pallette[Math.floor(Math.random() * 100) % pallette.length];

  const poly = document.createElementNS(svgNS, 'polygon');
  poly.setAttribute('points', `${Ax},${Ay} ${Bx},${By} ${Cx},${Cy} ${Dx},${Dy} ${Ex},${Ey} ${Fx},${Fy}`);
  poly.setAttribute('fill', fill);
  return poly;
}

/**
 * 20x20 grid of hexagons
 */
for (let i = 0; i < gridSize.height; ++i) {
  for (let j = 0; j < gridSize.width; ++j) {
    const [x, y] = getHex(i, j, params.sm);
    const hexvgPolygon = flatSideUpHexvg(x, y, params.sm);
    svg.appendChild(hexvgPolygon);
  }
}

document.body.appendChild(svg);