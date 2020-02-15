'use strict';
const constants = require("./constants.js");

class TimedMap {
  constructor(itemDuration = constants.fiveMinutes) {
    this.map = new Map();
    this.itemDuration = itemDuration;
    this.size = 0;
  }

  getCurrentTime = () => {
    return new Date().getTime();
  }

  update = () => {
    if(this.map.size === 0) return;
    const currentTime = this.getCurrentTime()
    for(let key of this.map.keys()){
      const entry = this.map.get(key);
      const timeAdded = entry.timeAdded;
      if(currentTime - timeAdded > this.itemDuration) {
        const removed = this.map.delete(key);
        this.size -= 1;
      } else {
        break;
      }
    }
  }

  set = (newKey, newValue) => {
    this.update();
    this.map.set(newKey, {
      value: newValue,
      timeAdded: this.getCurrentTime()
    })
    this.size += 1;
  }

  get = (key) => {
    this.update();
    const getOutput = this.map.get(key);
    return getOutput ? this.map.get(key).value : getOutput;
  }

  entries = () => {
    return this.map.entries();
  }

  deleteKey = (key) => {
    return this.map.delete(key);
  }

  has = (key) => {
    return this.map.has(key);
  }

  values = () => {
    return this.map.values();
  }
}

module.exports = TimedMap;
