import test from 'ava';
import {fx, range} from '../fx';

test('zip 2 arrays', t => {
  t.deepEqual(
    fx([[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]).zip().toArray(),
    [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]
  );
});

test('zip 3 arrays', t => {
  t.deepEqual(
    fx([[1, 2, 3], [1, 2, 3], [1, 2, 3]]).zip().toArray(),
    [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
  );
});

test('zip n arrays', t => {
  t.deepEqual(
    fx([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]).zip().toArray(),
    [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
  );
});

test('zip not equal size arrays', t => {
  t.deepEqual(
    fx([['a', 'b', 'c', 'd', 'f'], [1, 2, 3]]).zip().toArray(),
    [["a", 1], ["b", 2], ["c", 3]]
  );
});

test('zip two fx', t => {
  t.deepEqual(
    fx(fx(1, 2, 3, 4), fx(9, 8, 7, 6)).zip().toArray(),
    [[1, 9], [2, 8], [3, 7], [4, 6]]
  );
});

test('zip fx and array', t => {
  t.deepEqual(
    fx(fx(1, 2, 3, 4), [9, 8, 7, 6]).zip().toArray(),
    [[1, 9], [2, 8], [3, 7], [4, 6]]
  );
});

test('zip with infinity', t => {
  t.deepEqual(
    fx([1, 2, 3, 4, 5], range()).zip().toArray(),
    [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]]
  );
});

test('zip two infinity', t => {
  t.deepEqual(
    fx(range(0, Infinity), range(0, Infinity, -1)).zip().take(5).toArray(),
    [[0, 0], [1, -1], [2, -2], [3, -3], [4, -4]]
  );
});

test('zip three infinity', t => {
  t.deepEqual(
    fx(range(), range(), range()).zip().take(3).toArray(),
    [[0, 0, 0], [1, 1, 1], [2, 2, 2]]
  );
});
