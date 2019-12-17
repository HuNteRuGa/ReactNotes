const validates = {
  exist: (validator, variableName) => {
    if (!validator) throw `Field ${variableName} doesn't exist`;
  },
  required: (required, value, variableName) => {
    if (value === null && required) throw `Field ${variableName} is required`;
  },
  type: (type, value, variableName) => {
    if (typeof value !== type) throw `Field ${variableName} must be a ${type}`;
  },
  elems: (elems, value, validatorArray, parents, key) => {
    if (elems) {
      for (elem in elems) {
        try {
          validate(elem, value[elem] || null, validatorArray, [...parents, key]);
        } catch (err) {
          throw err;
        }
      }
    }
  },
  minLength: (minLength, value, variableName) => {
    if (minLength && value.length < minLength)
      throw `${variableName} length must be at least ${minLength}`;
  },
  arrayType: (arrayType, value, variableName) => {
    if (arrayType) {
      for (let elem in value) {
        if (typeof value[elem] !== arrayType) throw `${variableName}[${elem}] must be ${arrayType}`;
      }
    }
  }
};

const validate = (key, value, validatorArray, parents = []) => {
  try {
    const variableName = `${parents.reduce((prev, value) => (prev += `${value}.`), "")}${key}`;

    let validator = validatorArray;
    for (let parent of parents) {
      validator = validator[parent].elems;
    }
    validator = validator[key];

    validates.exist(validator, variableName);
    validates.required(validator.required, value, variableName);
    if (value === null) return 0;
    validates.type(validator.type, value, variableName);

    if (validator.type === "object") {
      validates.elems(validator.elems, value, validatorArray, parents, key);
      validates.minLength(validator.minLength, value, variableName);
      validates.arrayType(validator.arrayType, value, variableName);
    }
  } catch (err) {
    throw err;
  }

  return 0;
};

const validateObject = (array, validatorArray) => {
  try {
    for (key in validatorArray) {
      validate(key, array[key] || null, validatorArray);
    }
    return 0;
  } catch (err) {
    throw err;
  }
};

exports.validate = validate;
exports.validateObject = validateObject;
