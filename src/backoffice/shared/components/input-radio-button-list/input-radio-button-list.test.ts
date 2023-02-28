import { expect, fixture, html } from '@open-wc/testing';
import { UmbInputRadioButtonListElement } from './input-radio-button-list.element';
import { defaultA11yConfig } from '@umbraco-cms/test-utils';
// //TODO: Test has been commented out while we figure out how to setup import maps for the test environment
// describe('UmbInputRadioButtonListElement', () => {
// 	let element: UmbInputRadioButtonListElement;

// 	beforeEach(async () => {
// 		element = await fixture(html` <umb-input-radio-button-list></umb-input-radio-button-list> `);
// 	});

// 	it('is defined with its own instance', () => {
// 		expect(element).to.be.instanceOf(UmbInputRadioButtonListElement);
// 	});

// 	it('passes the a11y audit', async () => {
// 		await expect(element).shadowDom.to.be.accessible(defaultA11yConfig);
// 	});
// });
