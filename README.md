# 🌱 seedlings
Create some seed data, via json in a flat format that can be batch loaded

[![stability-unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)][stability]
[![Build Status](https://circleci.com/gh/orangemug/seedlings.png?style=shield)][circleci]
[![Dependency Status](https://david-dm.org/orangemug/seedlings.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/orangemug/seedlings/dev-status.svg)][dm-dev]

[stability]:   https://github.com/orangemug/seedlings#unstable
[circleci]:    https://circleci.com/gh/orangemug/seedlings
[dm-prod]:     https://david-dm.org/orangemug/seedlings
[dm-dev]:      https://david-dm.org/orangemug/seedlings#info=devDependencies


## Usage
Seedlings will modify a json structure replacing any keys of the format `{%type:id%}`

Where

 * `id` is any string and the same string will produce the same resulting id in the final output
 * `type` groups the `id` for example in `incremental` mode the first of each _type_ will reset to zero

Now lets create a new instance of seedlings to show what that all means. Here we'll be using the incremental id generator

Notice in the below the change of _type_ will reset the index to zero (`{%posts:1%}` and `{%users:1%}`)

```js
var seedlings = require("seedlings");
var seeder = seedlings(require("seedlings/generators/incremental"));

var out1 = seeder([
  {
    "id": "{%users:1%}",
    "name": "Bob"
  },
  {
    "id": "{%users:2%}",
    "name": "Jane"
  }
]);
assert.deepEqual(out1, [
  {
    "id": 1,
    "name": "Bob"
  },
  {
    "id": 2,
    "name": "Jane"
  }
]);

var out2 = seeder([
  {
    "id": "{%posts:1%}",
    "owner": "{%users:1%}",
    "title": "Hello World",
    "content": "Hi everyone!"
  }
]);
assert.deepEqual(out2, [
  {
    "id": 1,
    "owner": 1,
    "title": "Hello World",
    "content": "Hi everyone!"
  }
]);
```


## API
Create a new instance with

```js
var seeder = seedlings(/* [id_generator_function] */);
```

Where `id_generator_function` is one of

 * `seedlings/generator/incremental` (default)
 * `seedlings/generator/uuid`

Both incremental and uuid will product the same output given the same input. Below is an example using the uuid generator

```js
var seeder = seedlings(require("seedlings/generators/uuid"))
var outUUID = seeder([
  {id: "{%test:uuid%}"}
])
assert.deepEqual(outUUID, [
  {id: "01010101-0101-4101-8101-010101010101"}
]);
```


## License
[MIT](LICENSE)
