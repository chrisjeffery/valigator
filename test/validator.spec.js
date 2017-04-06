import {expect} from 'chai'

import {validate, validator} from '../index'
import deepFreeze from 'deep-freeze'

const toValidate = deepFreeze({
  'someString': 'a string',
  'someNumber': 100,
  'someUrl': 'http://google.com'
})

describe('config validator', () => {
  it('does not fail when config is valid', () => {
    expect(
      () => validate(toValidate, {
        'someString': validator.string.isRequired,
        'someNumber': validator.number.isRequired,
        'someUrl': validator.url.isRequired
      })
    ).not.to.throw()
  })

  it('fails when required property is missing', () => {
    expect(
      () => validate(toValidate, {
        'missingProperty': validator.string.isRequired
      })
    ).to.throw()
  })

  it('fails when property value does not match validator', () => {
    expect(
      () => validate(toValidate, {
        'someString': validator.number
      })
    ).to.throw()
  })
})
