# Valigator
The snappy config validator

Basic Usage
===========

```
validate(config, {
  'someString': validator.string.isRequired,
  'someNumber': validator.number.isRequired,
  'someUrl': validator.url.isRequired
})
```
