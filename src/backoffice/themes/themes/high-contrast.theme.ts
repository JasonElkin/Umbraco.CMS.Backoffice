import { css } from 'lit';
import { UmbTheme } from '../theme.service';

// TODO: We should get this from UUI, and it should be served through an extension.
const name = 'High Contrast';
const cssResult = css`
	:root {
		--uui-color-selected: var(--uui-palette-violet-blue, #3544b1);
		--uui-color-selected-emphasis: var(--uui-palette-violet-blue-light, rgb(70, 86, 200));
		--uui-color-selected-standalone: var(--uui-palette-violet-blue-dark, rgb(54, 65, 156));
		--uui-color-selected-contrast: #fff;
		--uui-color-current: var(--uui-palette-spanish-pink, #f5c1bc);
		--uui-color-current-emphasis: var(--uui-palette-spanish-pink-light, rgb(248, 214, 211));
		--uui-color-current-standalone: var(--uui-palette-spanish-pink-dark, rgb(232, 192, 189));
		--uui-color-current-contrast: var(--uui-palette-space-cadet, #1b264f);
		--uui-color-disabled: var(--uui-palette-sand, #f3f3f5);
		--uui-color-disabled-standalone: var(--uui-palette-sand-dark, rgb(226, 226, 226));
		--uui-color-disabled-contrast: var(--uui-palette-grey, #c4c4c4);
		--uui-color-header-surface: var(--uui-palette-space-cadet, #1b264f);
		--uui-color-header-contrast: #fff;
		--uui-color-header-contrast-emphasis: #fff;
		--uui-color-focus: var(--uui-palette-malibu, #3879ff);
		--uui-color-surface: #fff;
		--uui-color-surface-alt: #fff;
		--uui-color-surface-emphasis: #dadada;
		--uui-color-background: #fff;
		--uui-color-text: var(--uui-palette-black, #060606);
		--uui-color-text-alt: var(--uui-palette-dune-black, #2e2b29);
		--uui-color-interactive: var(--uui-palette-space-cadet, #1b264f);
		--uui-color-interactive-emphasis: var(--uui-palette-violet-blue, #3544b1);
		--uui-color-border: #000000;
		--uui-color-border-standalone: #000000;
		--uui-color-border-emphasis: #000000;
		--uui-color-divider: #000000;
		--uui-color-divider-standalone: #000000;
		--uui-color-divider-emphasis: #000000;
		--uui-color-default: var(--uui-palette-space-cadet, #1b264f);
		--uui-color-default-emphasis: var(--uui-palette-violet-blue, #3544b1);
		--uui-color-default-standalone: var(--uui-palette-space-cadet-dark, rgb(28, 35, 59));
		--uui-color-default-contrast: #fff;
		--uui-color-warning: #ffd621;
		--uui-color-warning-emphasis: #ffdc41;
		--uui-color-warning-standalone: #ffdd43;
		--uui-color-warning-contrast: #000;
		--uui-color-danger: #c60239;
		--uui-color-danger-emphasis: #da114a;
		--uui-color-danger-standalone: #d0003b;
		--uui-color-danger-contrast: white;
		--uui-color-positive: #0d8844;
		--uui-color-positive-emphasis: #159c52;
		--uui-color-positive-standalone: #1cae5e;
		--uui-color-positive-contrast: #fff;

		--uui-shadow-depth-1: 0 0 0px 1px black;
		--uui-shadow-depth-2: 0 0 0px 1px black;
		--uui-shadow-depth-3: 0 0 0px 1px black;
		--uui-shadow-depth-4: 0 0 0px 1px black;
		--uui-shadow-depth-5: 0 0 0px 1px black;
	}
`;

export const highContrast: UmbTheme = {
	name: name,
	css: cssResult.cssText,
};