import { expect, fixture, html } from '@open-wc/testing';
import { UmbInputCultureSelectElement } from './input-culture-select.element';
import { defaultA11yConfig } from '@umbraco-cms/test-utils';
// //TODO: Test has been commented out while we figure out how to setup import maps for the test environment
// describe('UmbInputCultureSelectElement', () => {
// 	let element: UmbInputCultureSelectElement;

// 	beforeEach(async () => {
// 		element = await fixture(html` <umb-input-culture-select></umb-input-culture-select> `);
// 	});

// 	it('is defined with its own instance', () => {
// 		expect(element).to.be.instanceOf(UmbInputCultureSelectElement);
// 	});

// 	it('passes the a11y audit', async () => {
// 		await expect(element).shadowDom.to.be.accessible(defaultA11yConfig);
// 	});
// });
