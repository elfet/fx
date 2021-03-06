import test from 'ava';
import {fx, range} from '../fx';

test('head of array', t => {
  t.deepEqual(
    fx([1, 2, 3, 4]).head(),
    1
  );
});

test('head of infinity', t => {
  t.deepEqual(
    range().head(),
    0
  );
});

test('forEach of array', t => {
  t.plan(5);
  fx([1, 2, 3, 4, 5]).forEach(x => t.pass());
});

test('for-of an array', t => {
  t.plan(5);

  for (let v of fx([1, 2, 3, 4, 5])) {
    t.pass();
  }
});

test('toArray to array', t => {
  t.deepEqual(
    fx([1, 2, 3, 4]).toArray(),
    [1, 2, 3, 4]
  );
});

test('apply generator', t => {
  t.plan(6);

  const fn = function*(iterator) {
    for (let v of iterator) {
      yield v;
      t.pass();
    }
  };

  t.deepEqual(
    fx([1, 2, 3, 4, 5]).apply(fn).toArray(),
    [1, 2, 3, 4, 5]
  );
});

test('compose generators', t => {
  const double = function*(iterator) {
    for (let v of iterator) {
      yield v * 2;
    }
  };

  const negate = function*(iterator) {
    for (let v of iterator) {
      yield -v;
    }
  };

  t.deepEqual(
    fx([1, 2, 3, 4, 5]).compose(double, negate).toArray(),
    [-2, -4, -6, -8, -10]
  );
});

test('length', t => {
  t.is(fx().length, 0);
  t.is(fx(1, 2).length, 2);

  t.is(fx([]).length, 0);
  t.is(fx([1]).length, 1);
  t.is(fx([1, 2]).length, 2);


  t.is(range(1, 10).filter(x => x % 2 == 0).length, 5);
});

test('next', t => {
  let x = fx([1, 2, 3]);

  t.deepEqual(
    x.next(),
    {value: 1, done: false}
  );

  t.deepEqual(
    x.next(),
    {value: 2, done: false}
  );

  t.deepEqual(
    x.next(),
    {value: 3, done: false}
  );

  t.deepEqual(
    x.next(),
    {value: undefined, done: true}
  );
});
