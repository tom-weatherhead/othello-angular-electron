'use strict'; // Necessary for es6 output in node

import { browser, element, by /*, ElementFinder, ElementArrayFinder */ } from 'protractor';
// import { promise } from 'selenium-webdriver';

function expectHeading(hLevel: number, expectedText: string): void {
    let hTag = `h${hLevel}`;
    let hText = element(by.css(hTag)).getText();
    expect(hText).toEqual(expectedText, hTag);
};

const expectedTitle = 'Othello';
const expectedH1 = 'Othello';

describe('Othello', () => {
	beforeAll(() => browser.get(''));

	it(`has title '${expectedTitle}'`, () => {
		expect(browser.getTitle()).toEqual(expectedTitle);
	});

    it(`has h1 '${expectedH1}'`, () => {
        expectHeading(1, expectedH1);
    });
});
