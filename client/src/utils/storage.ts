import Cookies from 'universal-cookie';

const cookies = new Cookies();

/**
 * Get cookie.
 *
 * @param {String} key : whose value to get.
 */
export function get(key: string) {
  return cookies.get(key);
}

/**
 * Set cookie.
 *
 * @param {String} key : whose Value to set.
 * @param {*} value : Value to set.
 */
export function set(key: string, value: string | number) {
  cookies.set(key, value);
}

/**
 * Remove key value pair in storage.
 *
 * @param {string} key
 */
export function remove(key: string) {
  cookies.remove(key);
}
