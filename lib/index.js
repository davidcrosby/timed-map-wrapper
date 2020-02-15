'use strict';
const constants = require('./constants.js');

/**
 * Map wrapper that deletes old items
 * @constructor
 * @param {number} itemDuration - how long items shoud last
 */
class TimedMap {
  /**
   * Initialize map and size, set duration
   * @param {number} itemDuration - how long items should last
   */
  constructor(itemDuration = constants.fiveMinutes) {
    this.map = new Map();
    this.itemDuration = itemDuration;
    this.size = 0;
  }

  /**
   * Return the current time in ms
   * @return {number} current time in ms
   */
  getCurrentTime() {
    return new Date().getTime();
  }

  /**
   * Iterator over map entries and delete any who were created
   * this.itemDuration or more since deleteOldItems() is called.
   */
  deleteOldItems() {
    if (this.map.size === 0) return;
    const currentTime = this.getCurrentTime();
    for (const key of this.map.keys()) {
      const entry = this.map.get(key);
      const timeAdded = entry.timeAdded;
      if (currentTime - timeAdded > this.itemDuration) {
        this.map.delete(key);
        this.size -= 1;
      } else {
        break;
      }
    }
  }

  /**
   * Set newKey : newValue in this.map, increment size
   * @param {any} newKey
   * @param {any} newValue
   */
  set(newKey, newValue) {
    this.deleteOldItems();
    this.map.set(newKey, {
      value: newValue,
      timeAdded: this.getCurrentTime(),
    });
    this.size += 1;
  }

  /**
   * Get value for a given key.
   * @param {object} key to search for
   * @return {object} map[key].value if found, else undefined
   */
  get(key) {
    this.deleteOldItems();
    const getOutput = this.map.get(key);
    return getOutput ? this.map.get(key).value : getOutput;
  }

  /**
   * Return all the entries of the map (including time created)
   * @return {Iterator} iterator for key/value pairs
   */
  entries() {
    return this.map.entries();
  }

  /**
   * Delete a key
   * @param {object} key to delete
   * @return {boolean} true if deleted, else false
   */
  deleteKey(key) {
    return this.map.delete(key);
  }

  /**
   * Check if key exists in the map
   * @param {object} key to look for
   * @return {boolean} true if key exists, otherwise false
   */
  has(key) {
    return this.map.has(key);
  }

  /**
   * Return iterator over values of the map
   * @return {Iterator}
   */
  values() {
    return this.map.values();
  }
}

module.exports = TimedMap;
