import { expect, fixture, html } from '@open-wc/testing';
import { UmbInputSliderElement } from './input-slider.element';
import { defaultA11yConfig } from '@umbraco-cms/test-utils';
// //TODO: Test has been commented out while we figure out how to setup import maps for the test environment
// describe('UmbInputSliderElement', () => {
// 	let element: UmbInputSliderElement;

// 	beforeEach(async () => {
// 		element = await fixture(html` <umb-input-slider></umb-input-slider> `);
// 	});

// 	it('is defined with its own instance', () => {
// 		expect(element).to.be.instanceOf(UmbInputSliderElement);
// 	});

// 	it('passes the a11y audit', async () => {
// 		await expect(element).shadowDom.to.be.accessible(defaultA11yConfig);
// 	});
// });
