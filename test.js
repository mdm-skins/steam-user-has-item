'use strict';

const assert = require('assert');
const nock = require('nock');
const hasItem = require('./index');
const fixture = require('./fixture');

afterEach(function () {
	nock.cleanAll();
});

it('Checking for non existing item', () => {
	nock('http://steamcommunity.com')
		.get('/id/foo/inventory/json/730/2/')
		.reply(200, []);

	return hasItem({user: 'foo', item: 'foo'}).then(item => {
		assert.equal(item, null);
	});
});

it('Checking for existing item', () => {
	nock('http://steamcommunity.com')
		.get('/id/foo/inventory/json/730/2/')
		.reply(200, fixture);

	return hasItem({user: 'foo', item: '937246119_188530139'}).then(item => {
		assert.equal(item.name, 'P250 | Valence');
	});
});

it('Checking for delayed existing item', () => {
	nock('http://steamcommunity.com')
		.get('/id/foo/inventory/json/730/2/')
		.delay(1000)
		.reply(200, fixture);

	return hasItem({user: 'foo', item: '937246119_188530139', timeout: 200}).then(item => {
		assert.equal(item.name, 'P250 | Valence');
	});
});

it('Clearing timeout', () => {
	nock('http://steamcommunity.com')
		.get('/id/foo/inventory/json/730/2/')
		.delay(10000)
		.reply(200, fixture);

	let req = hasItem({user: 'foo', item: '937246119_188530139', timeout: 200});
	req.clear();

	return req.then(item => {
		assert.equal(item, null);
	});
});
