import { cfContestType, lcContestType } from "./types";

export function lcUpcomingContests(data: lcContestType[], pastDays = 1) {
  const now = Date.now() / 1000;
  const windowStart = now - pastDays * 24 * 60 * 60; // include contests from pastDays ago
  const upcomingContests = data.filter(
    (contest: lcContestType) => contest.startTime > windowStart
  );
  upcomingContests.sort(
    (a: lcContestType, b: lcContestType) => a.startTime - b.startTime
  );

  return upcomingContests;
}

export function cfUpcomingContests(data: cfContestType[], pastDays = 1) {
  const now = Date.now() / 1000;
  const windowStart = now - pastDays * 24 * 60 * 60; // include contests from pastDays ago
  const upcomingContests = data.filter(
    (contest: cfContestType) => contest.startTimeSeconds > windowStart
  );
  upcomingContests.sort(
    (a: cfContestType, b: cfContestType) =>
      a.startTimeSeconds - b.startTimeSeconds
  );

  return upcomingContests;
}
