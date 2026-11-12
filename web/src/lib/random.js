export const rnd = (a, b) => a + Math.random() * (b - a)

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const shuffle = (arr) =>
  arr.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map((x) => x[1])
