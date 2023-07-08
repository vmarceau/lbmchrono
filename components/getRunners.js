const N = 12;

const runners = [...Array(N).keys()].map((i) => ({
  id: i+1,
  time: null,
}));

export default () => runners;
