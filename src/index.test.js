global.fetch = require('jest-fetch-mock');

const Jerome = require('./index');

beforeEach(() => {
  fetch.resetMocks();
});

test('constructor()', () => {
  const url = 'https://example.org/';
  const options = {};

  const api = new Jerome(url, options);

  expect(api.url.toString()).toBe(url);
  expect(api.options).toBe(options);
});

test('fetch()', () => {
  fetch.mockResponse('{}');

  const url = 'https://example.org/';
  const options = { unique: 1 };
  const api = new Jerome(url, options);
  expect(api.fetch('/')).toBeInstanceOf(Promise);
  expect(fetch.mock.calls.length).toEqual(1);

  return api.fetch('/').then(() => {
    expect(fetch.mock.calls[1][0]).toEqual(url);
    expect(fetch.mock.calls[1][1]).toMatchObject(options);
  });
});

test('getList()', () => {
  const response = [];
  expect(Jerome.getList(response)).toBe(response);
});

test('getData()', () => {
  const response = {};
  expect(Jerome.getData(response)).toBe(response);
});

test('prepareData()', () => {
  const response = {};
  const model = { toJSON: () => response };
  expect(Jerome.prepareData(model)).toBe(response);
});

test('getID()', () => {
  const id = 1;
  expect(Jerome.getID({ id })).toBe(id);
});
