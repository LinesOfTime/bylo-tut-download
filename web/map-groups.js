/** Groups projected screen points; preserves every input index. */
function groupMapPoints(points, radiusPixels = 48) {
  if (!Number.isFinite(radiusPixels) || radiusPixels <= 0) throw new RangeError("Invalid grouping radius");
  const parents = points.map((_, i) => i);
  const root = i => { while (parents[i] !== i) i = parents[i]; return i; };
  const near = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 < radiusPixels ** 2;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) if (near(points[i], points[j])) parents[root(j)] = root(i);
  }
  const collect = () => {
    const groups = new Map();
    points.forEach((_, i) => { const key = root(i); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(i); });
    return [...groups.values()];
  };
  let groups = collect();
  while (true) {
    const centers = groups.map(indices => [0, 1].map(axis => indices.reduce((sum, i) => sum + points[i][axis], 0) / indices.length));
    let merged = false;
    for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) if (near(centers[i], centers[j])) {
        parents[root(groups[j][0])] = root(groups[i][0]); merged = true;
      }
    }
    if (!merged) return groups;
    groups = collect();
  }
}
