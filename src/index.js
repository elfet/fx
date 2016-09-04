"use strict";
import { Chain } from './chain';
export { range } from './range';

/**
 * @param {*} params
 * @returns {Chain}
 */
export function fx(...params) {
  return new Chain(params.length === 1 ? params[0] : params);
}
