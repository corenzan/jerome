(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Jerome = factory());
}(this, (function () { 'use strict';

  // Jerome
  // The MIT License © 2018 Corenzan
  // More on https://github.com/corenzan/jerome

  // Extract model list from the GET response.
  const getList = response => {
    return response;
  };

  // Extract model data from the GET response.
  const getData = response => {
    return response;
  };

  // Prepare model data to be sent in the POST/PUT request.
  const prepareData = model => {
    return model.toJSON();
  };

  // Extract model ID from a POST/PUT response.
  const getID = response => {
    return response.id;
  };

  class Model {
    static fetch(path, query, options) {
      options = Object.assign({}, this.options, options);
      return this.api.fetch([this.path, path], query, options);
    }

    static list(query) {
      return this.fetch('/', query).then(response => {
        const list = this.api._getList(response.json());
        return list.map(data => new this(data));
      });
    }

    static get(id) {
      return this.fetch(`/${id}`).then(response => {
        const data = this.api._getData(response.json());
        return new this(data);
      });
    }

    constructor(data) {
      Object.assign(this, data);
      this.data = data;
    }

    save() {
      const path = this.id ? `/${this.id}` : '/';
      const options = {
        method: this.id ? 'PUT' : 'POST',
        body: this.constructor.api._prepareData(this)
      };
      return this.constructor.fetch(path, options).then(response => {
        if (this.id === undefined) {
          this.id = this.constructor.api._getID(response.json());
        }
        return response;
      });
    }

    delete() {
      return this.constructor.fetch(`/${this.id}`, null, {
        method: 'DELETE'
      });
    }
  }

  class API {
    static getList(response) {
      return getList(response);
    }

    static getData(response) {
      return getData(response);
    }

    static prepareData(model) {
      return prepareData(model);
    }

    static getID(response) {
      return getID(response);
    }

    constructor(url, options) {
      this.url = new URL(url).toString();
      this.options = options || {};
    }

    fetch(path, query, options) {
      if (typeof path === 'object') {
        path = path.join('/');
      }
      const url = new URL(path, this.url);
      if (typeof query === 'string') {
        url.search = query;
      } else if (typeof query === 'object') {
        for (const key of Object.keys(query)) {
          url.searchParams.set(key, query[key]);
        }
      }
      options = Object.assign({}, this.options, options);
      return fetch(url.toString(), options);
    }

    model(path, options) {
      const api = this;

      return class extends Model {
        static get api() {
          return api;
        }

        static get path() {
          return path;
        }

        static get options() {
          return options;
        }
      };
    }
  }

  var src = API;

  return src;

})));
