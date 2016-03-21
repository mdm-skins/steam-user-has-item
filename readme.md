# steam-user-has-item [![Build Status](https://travis-ci.org/steam-items/steam-user-has-item.svg?branch=master)](https://travis-ci.org/steam-items/steam-user-has-item)

> Check if user has item in his inventory.


## Install

```
$ npm install --save steam-user-has-item
```


## Usage

```js
var hasItem = require('steam-user-has-item');
hasItem({user: 'awtt', item: '937246119_188530139'});

hasItem.then(item => {
	console.log(item);
});
```

## Usage with timeout

```js
var hasItem = require('steam-user-has-item');
hasItem({user: 'awtt', item: '937246119_188530139', timeout: 500}); // Will retry every 500 miliseconds if user have the item

// Sometime in the future
hasItem.then(item => {
	console.log(item);
});

hasItem.clear(); // Optionally you can clear the timeout if you dont want to wait any more
```


## API

### hasItem({user, item, game, timeout})
Return: `Promise that resolve to item object if found or reject if item is not found`

#### user

Type: `String`

Steam username or profile ID.

#### item

Type: `String`

Item ID from [steam-user-inventory](https://github.com/steam-items/steam-user-inventory#steamuserinventoryuser-game)

#### game

Type: `String`

Default `730/2/` (csgo)

Steam game id.

#### timeout
Type: `Number`

Timeout in miliseconds to retry, promise will be resolved once user have the item. (if you know transaction will happen soon)

## License

MIT © [Daniel Husar](https://github.com/danielhusar)
