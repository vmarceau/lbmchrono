import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { NUM_BIBS } from './constants';

const pad = (number) => (number <= 9 ? `0${number}` : number);

export const getElapsedTime = (startTime) => Date.now() - startTime;

export const displayTime = (ms) => {
  if (!ms) {
    return '00:00';
  }

  const seconds = Math.round(ms / 1000);
  if (seconds < 60) {
    return `00:${pad(seconds)}`;
  }

  const remain = seconds % 60;
  const minutes = (seconds - remain) / 60;
  return `${pad(minutes)}:${pad(remain)}`;
};

export const initResults = () =>
  [...Array(NUM_BIBS).keys()].map((i) => ({
    id: i + 1,
    elapsed: null,
  }));

export const formatRaceResults = (startTime, results) => {
  const startedAt = new Date(startTime);
  const metadata = {
    deviceManufacturer: Device.manufacturer,
    deviceModelId: Device.modelId,
    deviceModelName: Device.modelName,
    deviceOsVersion: Device.osVersion,
    sessionId: Constants.sessionId,
  };
  const finishers = [...results]
    .filter((r) => r.elapsed !== null)
    .sort((l, r) => l.elapsed - r.elapsed)
    .map((r, idx) => ({
      rank: idx + 1,
      bib: r.id,
      elapsed: displayTime(r.elapsed),
      finishedAt: new Date(startTime + r.elapsed).toISOString(),
    }));

  return {
    race: 'Limoilou Beer Mile',
    startedAt: startedAt.toISOString(),
    metadata,
    finishers,
  };
};
