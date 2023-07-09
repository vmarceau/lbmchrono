const pad = (number) => (number <= 9 ? `0${number}` : number);

export const displayTime = (seconds) => {
  if (seconds < 60) {
    return `00:${pad(seconds)}`;
  }

  const remainSeconds = seconds % 60;
  const minutes = (seconds - remainSeconds) / 60;
  return `${pad(minutes)}:${pad(remainSeconds)}`;
};

export const initResults = () =>
  [...Array(56).keys()].map((i) => ({
    id: i + 1,
    time: null,
  }));
