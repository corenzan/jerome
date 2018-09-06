[![NPM](https://img.shields.io/npm/dt/jerome.svg?style=for-the-badge)](https://www.npmjs.com/package/jerome)
[![BundlePhobia](https://img.shields.io/bundlephobia/minzip/jerome.svg?style=for-the-badge)](https://bundlephobia.com/result?p=jerome)
[![Travis](https://img.shields.io/travis/corenzan/jerome.svg?style=for-the-badge)](https://travis-ci.org/corenzan/jerome)

# Jerome

> A tiny JavaScript/REST kind of ORM.

## Usage

At a glance:

```javascript
const api = new Jerome('https://example.org');
const Stuff = api.model('/stuff');

Stuff.list();   //-> GET    https://example.org/stuff
Stuff.get(1);   //-> GET    https://example.org/stuff/1

const thing = new Stuff({ ... });

thing.save();   //-> POST   https://example.org/stuff   { ... }
thing.save();   //-> PUT    https://example.org/stuff/1 { ... }
thing.delete(); //-> DELETE https://example.org/stuff/1
```

All the methods return promises.

### API

_Work in progress..._

## Legal

The MIT License © 2018 Corenzan
