const TimedMap = require('./index.js');

const oneSecond = 1000;

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const test_put_get = () => {
  const testMap = new TimedMap(oneSecond);
  const key = "key1"
  const value = "value1"
  testMap.set(key, value);
  ret = testMap.get(key);
  console.log(`Test basic passed: ${ret === value}`);
}

const test_put_wait_get = async () => {
  const testMap = new TimedMap( itemDuration=oneSecond /* 1 s */ );
  testMap.set("foo", "bar");
  await sleep(oneSecond*2);
  const out = testMap.get("foo");
  console.log(`Test timeout passed: ${out === undefined}`);
}

const test_large_input = async () => {
  const testMap = new TimedMap(itemDuration=oneSecond);
  const numberOfPairs = 10**6;
  for(let i = 0; i < numberOfPairs; i++) {
    testMap.set(i, i);
  }
  await sleep(oneSecond);
  for(let i = 0; i < numberOfPairs; i++) {
    testMap.set(i, i);
  }
  console.log(`Test large input passed: ${testMap.size === numberOfPairs}`);
}

const test_tertiary = () => {
  const testMap = new TimedMap();
  testMap.entries();
  testMap.deleteKey("foo");
  testMap.has("foo");
  testMap.values();
  console.log(`Test tertiary passed.`);
}

test_put_get();
test_tertiary();
test_put_wait_get();
test_large_input();
