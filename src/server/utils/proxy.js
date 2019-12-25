module.exports = {
  validatorSetter: (target, prop, value) => {
    try {
      validateObject(value, validator);
    } catch (err) {
      consoleError(err);
      throw 0;
    }
    target[prop] = value;
    return true;
  },
  getProxy: function() {
    return new Proxy(
      {},
      {
        set: this.validatorSetter
      }
    );
  }
};
