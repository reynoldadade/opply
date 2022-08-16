import { DateTime } from "luxon";
export default function useDate(date: string) {
  return DateTime.fromISO(date).toFormat("ffff");
}
