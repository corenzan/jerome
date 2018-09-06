<p align="center">
  <img alt="Jerome" src="https://raw.githubusercontent.com/corenzan/jerome/master/jerome.png" width="247" height="320">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/jerome"><img src="https://img.shields.io/npm/dt/jerome.svg?style=for-the-badge" alt="NPM"></a>
  <a href="https://bundlephobia.com/result?p=jerome"><img src="https://img.shields.io/bundlephobia/minzip/jerome.svg?style=for-the-badge" alt="BundlePhobia"></a>
  <a href="https://travis-ci.org/corenzan/jerome"><img src="https://img.shields.io/travis/corenzan/jerome.svg?style=for-the-badge" alt="Travis"></a>
</p>

# Jerome

> A tiny JavaScript/REST kind of ORM.

## Usage

At a glance:

```javascript
const API = new Jerome('https://example.org');
const Stuff = API.model('/stuff');

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
