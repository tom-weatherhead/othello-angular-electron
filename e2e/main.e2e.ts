// forexus/e2e/main.e2e.ts

import { expect } from 'chai';
import { SpectronClient } from 'spectron';

import commonSetup from './common-setup';

describe('othello-angular-electron', () => {
	commonSetup.apply(this);

	let client: SpectronClient;

	beforeEach(function () {
		client = this.app.client;
	});

	it('Creates initial app window', async () => {
		const count = await client.getWindowCount();
		expect(count).to.equal(1);
	});

	// it('should display message saying App works !', async () => {
	// 	const elem = await client.$('app-home h1');
	// 	const text = await elem.getText();
	// 	expect(text).toEqual('App works !');
	// });
});
