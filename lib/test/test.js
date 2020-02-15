const TimedMap = require('../index.js');

const oneSecond = 1000;

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const testPutGet = () => {
  const testMap = new TimedMap(oneSecond);
  const key = 'key1';
  const value = 'value1';
  testMap.set(key, value);
  ret = testMap.get(key);
  console.log(`Test basic passed: ${ret === value}`);
};

const testWithTimeout = async () => {
  const testMap = new TimedMap( itemDuration=oneSecond /* 1 s */ );
  testMap.set('foo', 'bar');
  await sleep(oneSecond*2);
  const out = testMap.get('foo');
  console.log(`Test timeout passed: ${out === undefined}`);
};

const testHighVolume = async () => {
  const testMap = new TimedMap(itemDuration=oneSecond);
  const numberOfPairs = 10**6;
  for (let i = 0; i < numberOfPairs; i++) {
    testMap.set(i, i);
  }
  await sleep(oneSecond);
  for (let i = 0; i < numberOfPairs; i++) {
    testMap.set(i, i);
  }
  console.log(`Test large input passed: ${testMap.size === numberOfPairs}`);
};

const testTertiary = () => {
  const testMap = new TimedMap();
  testMap.entries();
  testMap.deleteKey('foo');
  testMap.has('foo');
  testMap.values();
  console.log(`Test tertiary passed.`);
};

testPutGet();
testTertiary();
testWithTimeout();
testHighVolume();
