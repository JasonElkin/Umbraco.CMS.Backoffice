import { expect, fixture, html } from '@open-wc/testing';
import { UmbInputLanguagePickerElement } from './input-language-picker.element';
import { defaultA11yConfig } from '@umbraco-cms/test-utils';
// //TODO: Test has been commented out while we figure out how to setup import maps for the test environment
describe('UmbInputLanguagePickerElement', () => {
	let element: UmbInputLanguagePickerElement;

	beforeEach(async () => {
		element = await fixture(html` <umb-input-language-picker></umb-input-language-picker> `);
	});

	it('is defined with its own instance', () => {
		expect(element).to.be.instanceOf(UmbInputLanguagePickerElement);
	});

	it('passes the a11y audit', async () => {
		await expect(element).shadowDom.to.be.accessible(defaultA11yConfig);
	});
});
