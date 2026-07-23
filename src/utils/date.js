const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const MILLISECONDS_PER_MINUTE = 60 * 1000;
const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;

export function formatRelativeTime(createdAt, now = new Date()) {
  const createdTime = new Date(createdAt).getTime();
  const currentTime = new Date(now).getTime();

  if (Number.isNaN(createdTime) || Number.isNaN(currentTime)) {
    return "";
  }

  const elapsedMilliseconds = Math.max(0, currentTime - createdTime);
  const elapsedMinutes = Math.floor(
    elapsedMilliseconds / MILLISECONDS_PER_MINUTE,
  );

  if (elapsedMinutes < MINUTES_PER_HOUR) {
    return `${elapsedMinutes}분 전`;
  }

  const elapsedHours = Math.floor(
    elapsedMilliseconds / MILLISECONDS_PER_HOUR,
  );

  if (elapsedHours < HOURS_PER_DAY) {
    return `${elapsedHours}시간 전`;
  }

  return `${Math.floor(elapsedHours / HOURS_PER_DAY)}일 전`;
}
