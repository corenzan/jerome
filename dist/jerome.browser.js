(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Jerome = factory());
}(this, (function () { 'use strict';

  // Jerome
  // The MIT License © 2018 Corenzan
  // More on https://github.com/corenzan/jerome

  class Model {
    static fetch(path, options = {}) {
      return this.api.fetch(`${this.path}${path}`, Object.assign({}, this.options, options));
    }

    static list(path = '') {
      return this.fetch(`/${path}`)
        .then(response => response.json())
        .then(json => {
          return this.api.getList(json).map(data => new this(data));
        });
    }

    static get(id) {
      return this.fetch(`/${id}`)
        .then(response => response.json())
        .then(json => {
          return new this(this.api.getData(json));
        });
    }

    constructor(data) {
      Object.assign(this, data);
    }

    toJSON() {
      const data = {};
      Object.getOwnPropertyNames(this).forEach(key => {
        data[key] = this[key];
      });
      return data;
    }

    get path() {
      return this.persisted ? `/${this.id}` : '/';
    }

    get persisted() {
      return this.id !== undefined;
    }

    save() {
      const options = {
        method: this.persisted ? 'PUT' : 'POST',
        body: JSON.stringify(this.constructor.api.prepareData(this))
      };
      return this.constructor.fetch(this.path, options)
        .then(response => response.json())
        .then(json => {
          if (!this.persisted) {
            this.id = this.constructor.api.getID(json);
          }
        });
    }

    delete() {
      return this.constructor.fetch(`/${this.id}`, null, {
        method: 'DELETE'
      });
    }
  }

  class API {
    constructor(url, options = {}) {
      this.url = url;
      this.options = options;
    }

    fetch(path, options = {}) {
      const url = new URL(path.replace(new RegExp('/{2,}'), '/'), this.url);
      return fetch(url.toString(), Object.assign({}, this.options, options));
    }

    model(path, options = {}) {
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

    getList(json) {
      return json;
    }

    getData(json) {
      return json;
    }

    getID(json) {
      return json.id;
    }

    prepareData(model) {
      return model.toJSON();
    }
  }

  var src = API;

  return src;

})));
