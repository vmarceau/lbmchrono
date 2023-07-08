const pad = (number) => (number <= 9 ? `0${number}` : number);

export const displayTime = (centiseconds) => {
  let minutes = 0;
  let seconds = 0;
  if (centiseconds < 0) {
    centiseconds = 0;
  }
  if (centiseconds < 100) {
    return `00:00:${pad(centiseconds)}`;
  }
  let remainCentiseconds = centiseconds % 100;
  seconds = (centiseconds - remainCentiseconds) / 100;
  if (seconds < 60) {
    return `00:${pad(seconds)}:${pad(remainCentiseconds)}`;
  }
  let remainSeconds = seconds % 60;
  minutes = (seconds - remainSeconds) / 60;
  return `${pad(minutes)}:${pad(remainSeconds)}:${pad(
    remainCentiseconds,
  )}`;
};
