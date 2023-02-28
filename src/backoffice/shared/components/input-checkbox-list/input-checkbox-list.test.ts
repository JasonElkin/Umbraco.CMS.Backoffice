import { expect, fixture, html } from '@open-wc/testing';
import { UmbInputCheckboxListElement } from './input-checkbox-list.element';
import { defaultA11yConfig } from '@umbraco-cms/test-utils';
//TODO: Test has been commented out while we figure out how to setup import maps for the test environment
// describe('UmbInputCheckboxListElement', () => {
// 	let element: UmbInputCheckboxListElement;

// 	beforeEach(async () => {
// 		element = await fixture(html` <umb-input-checkbox-list></umb-input-checkbox-list> `);
// 	});

// 	it('is defined with its own instance', () => {
// 		expect(element).to.be.instanceOf(UmbInputCheckboxListElement);
// 	});

// 	it('passes the a11y audit', async () => {
// 		await expect(element).shadowDom.to.be.accessible(defaultA11yConfig);
// 	});
// });
