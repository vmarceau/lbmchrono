const pad = (number) => (number <= 9 ? `0${number}` : number);

export default (centiseconds) => {
  const cs = centiseconds >= 0 ? centiseconds : 0;

  let minutes = 0;
  let seconds = 0;

  if (cs < 100) {
    return `00:00:${pad(cs)}`;
  }

  const remainCs = cs % 100;
  seconds = (cs - remainCs) / 100;
  if (seconds < 60) {
    return `00:${pad(seconds)}:${pad(remainCs)}`;
  }

  const remainSeconds = seconds % 60;
  minutes = (seconds - remainSeconds) / 60;
  return `${pad(minutes)}:${pad(remainSeconds)}:${pad(remainCs)}`;
};
