import Assert from  'assert'

class PropertyValidator {
  constructor({validatorMessage, validationFunction}) {
    this.validate = function validate(object, propertyName) {
      try {
        validationFunction(object[propertyName])
      } catch(e) {
        throw new Error(`property ${propertyName} failed validation: ${validatorMessage}: ${e.message}`)
      }
    }.bind(this)
    this.isRequired = this.isRequired.bind(this)
  }

  isRequired(objectToValidate, propertyName) {
    Assert.ok(Reflect.has(objectToValidate, propertyName))
    try {
      Assert.ok(Reflect.has(objectToValidate, propertyName))
    }
    catch (e) {
      throw new Error(`required property ${propertyName} was undefined`)
    }
    this.validate(objectToValidate, propertyName)
  }
}

function number(value) {Assert.equal(typeof value, 'number', `value ${value} not of type number`)}
function string(value) {Assert.equal(typeof value, 'string', `value ${value} not of type string`)}
function url(value) {string(value)}

export const validator = {
  number: new PropertyValidator({validationFunction: number}),
  string: new PropertyValidator({validationFunction: string}),
  url: new PropertyValidator({validationFunction: url}),
}

export function validate(objectToValidate, requirements) {
  Reflect.ownKeys(requirements).forEach( propertyName => {
    const propertyValidator = requirements[propertyName]
    propertyValidator(objectToValidate, propertyName)
  })
}
