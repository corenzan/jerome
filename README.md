<p align="center">
  <img alt="Jerome" src="//raw.githubusercontent.com/corenzan/jerome/master/jerome.png" width="423" height="126">
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
