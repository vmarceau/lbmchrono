import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { MAX_BIBS, RUNNERS } from './constants';

const runnersByBib = RUNNERS.reduce((acc, curr) => {
  acc[curr.bib] = curr;
  return acc;
}, {});

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
  [...Array(MAX_BIBS).keys()].map((i) => ({
    id: i + 1,
    elapsed: null,
  }));

export const formatRaceResults = (startTime, results) => {
  const startedAt = new Date(startTime);
  const metadata = {
    deviceManufacturer: Device.manufacturer,
    deviceName: Device.deviceName,
    deviceModelName: Device.modelName,
    deviceOsVersion: Device.osVersion,
    sessionId: Constants.sessionId,
  };
  const leaderboard = [...results]
    .sort((l, r) => {
      // if equal, sort by bib
      if (l.elapsed === r.elapsed) {
        return l.id - r.id;
      }
      // always put DNF last
      if (l.elapsed === null) {
        return 1;
      }
      if (r.elapsed === null) {
        return -1;
      }

      return l.elapsed - r.elapsed;
    })
    .map((r, idx) => {
      const runner = runnersByBib[r.id];

      return {
        rank: idx + 1,
        bib: r.id,
        name: runner?.name ?? 'UNKNOWN',
        gender: runner?.gender ?? 'ND',
        elapsed: r.elapsed === null ? 'DNF' : displayTime(r.elapsed),
        finishedAt: r.elapsed === null ? 'DNF' : new Date(startTime + r.elapsed).toISOString(),
      };
    });

  return {
    race: 'Limoilou Beer Mile',
    startedAt: startedAt.toISOString(),
    metadata,
    leaderboard,
  };
};

export const topNByGender = (leaderboard, N, gender) => {
  const topN = [];

  for (const r of leaderboard) {
    if (r.gender === gender && r.elapsed !== 'DNF') {
      topN.push(r);
      if (topN.length >= N) {
        break;
      }
    }
  }

  return topN;
};
