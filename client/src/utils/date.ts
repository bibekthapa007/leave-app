import moment, { Moment } from 'moment';

import { DEFAULT_DATE_FORMAT, YYYY_MM_DD } from 'constants/date';

export type DateRepresentation = string | Date | Moment;

/**
 * Get difference between dates.
 *
 * @returns {number}
 */
export function getDifferenceBetweenDates(
  startDate: string | Date | Moment | undefined | null,
  endDate: string | Date | Moment | undefined | null,
  unit: 'days' | 'months' | 'years' = 'days',
  showFloat = false
): number {
  return moment(endDate).diff(moment(startDate), unit, showFloat);
}

/**
 * Get formatted date.
 *
 * @param {string|Date} date
 * @param {string} [format = DEFAULT_DATE_FORMAT]
 * @returns {string}
 */
export function getFormattedDate(
  date?: string | Date | undefined | null,
  format = DEFAULT_DATE_FORMAT
) {
  return moment(date).format(format);
}

/**
 * Convert given date to moment object.
 */
export function getDate(date?: DateRepresentation, format = YYYY_MM_DD) {
  return moment(date).format(format);
}
