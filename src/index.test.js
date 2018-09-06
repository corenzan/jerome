global.fetch = require('jest-fetch-mock');

const Jerome = require('./index');

describe('Jerome', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('API.constructor()', () => {
    const url = 'https://example.org/';
    const options = {};

    const api = new Jerome(url, options);

    expect(api.url.toString()).toBe(url);
    expect(api.options).toBe(options);
  });

  test('API.fetch()', () => {
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

  test('API.getList()', () => {
    const response = [];
    const api = new Jerome();
    expect(api.getList(response)).toBe(response);
  });

  test('API.getData()', () => {
    const response = {};
    const api = new Jerome();
    expect(api.getData(response)).toBe(response);
  });

  test('API.prepareData()', () => {
    const response = {};
    const model = { toJSON: () => response };
    const api = new Jerome();
    expect(api.prepareData(model)).toBe(response);
  });

  test('API.getID()', () => {
    const id = 1;
    const api = new Jerome();
    expect(api.getID({ id })).toBe(id);
  });

  test('API.model()', () => {
    const api = new Jerome();
    const path = '/stuff';
    const options = {};
    const Stuff = api.model(path, options);

    expect(Stuff.api).toBe(api);
    expect(Stuff.path).toBe(path);
    expect(Stuff.options).toBe(options);
  });

  test('Model.fetch()', () => {
    fetch.mockResponse('{}');

    const api = new Jerome('https://example.org/', { x: 1 });
    const Stuff = api.model('/stuff', { y: 2 });

    expect(Stuff.fetch('/')).toBeInstanceOf(Promise);
    expect(fetch.mock.calls.length).toEqual(1);

    return Stuff.fetch('/').then(() => {
      expect(fetch.mock.calls[1][0]).toEqual('https://example.org/stuff/');
      expect(fetch.mock.calls[1][1]).toHaveProperty('x', 1);
      expect(fetch.mock.calls[1][1]).toHaveProperty('y', 2);
    });
  });

  test('Model.list()', () => {
    fetch.mockResponse('[{"name": "a thing"}]');

    const api = new Jerome('https://example.org/');
    const Stuff = api.model('/stuff');

    return Stuff.list().then(list => {
      expect(list).toHaveLength(1);
      expect(list[0]).toHaveProperty('name', 'a thing');
      expect(fetch.mock.calls[0][0]).toEqual('https://example.org/stuff/');
    });
  });

  test('Model.get()', () => {
    fetch.mockResponse('{"name": "a thing"}');

    const api = new Jerome('https://example.org/');
    const Stuff = api.model('/stuff');

    return Stuff.get(1).then(thing => {
      expect(thing).toHaveProperty('name', 'a thing');
      expect(fetch.mock.calls[0][0]).toEqual('https://example.org/stuff/1');
    });
  });

  test('Model.constructor()', () => {
    const api = new Jerome();
    const Stuff = api.model('/stuff');
    const thing = new Stuff({
      name: 'a thing'
    });
    expect(thing).toHaveProperty('name', 'a thing');
  });

  test('Model.save()', () => {
    fetch.mockResponse('{"id": 1}');

    const api = new Jerome('https://example.org/');
    const Stuff = api.model('/stuff');
    const thing = new Stuff({
      name: 'a thing'
    });

    expect(thing.persisted).toBeFalsy();

    return thing.save().then(() => {
      expect(thing).toHaveProperty('id', 1);
      expect(fetch.mock.calls[0][0]).toEqual('https://example.org/stuff/');
      expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
      expect(fetch.mock.calls[0][1]).toHaveProperty('body', '{"name":"a thing"}');

      thing.name = 'another thing';

      return thing.save().then(() => {
        expect(fetch.mock.calls[1][0]).toEqual('https://example.org/stuff/1');
        expect(fetch.mock.calls[1][1]).toHaveProperty('method', 'PUT');
        expect(fetch.mock.calls[1][1]).toHaveProperty('body', '{"name":"another thing","id":1}');
      });
    });
  });
});
