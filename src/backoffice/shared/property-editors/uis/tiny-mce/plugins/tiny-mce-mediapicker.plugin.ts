import { UmbModalContext, UMB_MODAL_CONTEXT_TOKEN } from '@umbraco-cms/modal';
import { UmbMediaPickerModalResult, UMB_MEDIA_PICKER_MODAL_TOKEN } from '../../../../../media/media/modals/media-picker';
import { UmbCurrentUserStore, UMB_CURRENT_USER_STORE_CONTEXT_TOKEN } from '../../../../../users/current-user/current-user.store';
import { UmbMediaHelper } from '../media-helper.service';
import { TinyMcePluginArguments, TinyMcePluginBase } from './tiny-mce-plugin';
import type { UserDetails } from '@umbraco-cms/models';

interface MediaPickerTargetData {
	altText?: string;
	url?: string;
	caption?: string;
	udi?: string;
	id?: string;
	tmpimg?: string;
}

interface MediaPickerResultData {
	id?: string;
	src?: string;
	alt?: string;
	'data-udi'?: string;
	'data-caption'?: string;
}

export class TinyMceMediaPickerPlugin extends TinyMcePluginBase {
	#mediaHelper: UmbMediaHelper;
	#currentUser?: UserDetails;
	#modalContext?: UmbModalContext;
	#currentUserStore?: UmbCurrentUserStore;

	constructor(args: TinyMcePluginArguments) {
		super(args);

		this.#mediaHelper = new UmbMediaHelper(this.host);

		this.host.consumeContext(UMB_MODAL_CONTEXT_TOKEN, (instance) => {
			this.#modalContext = instance;
		});

		this.host.consumeContext(UMB_CURRENT_USER_STORE_CONTEXT_TOKEN, (instance) => {
			this.#currentUserStore = instance;
			this.#observeCurrentUser();
		});

		this.editor.ui.registry.addButton('umbmediapicker', {
			icon: 'image',
			tooltip: 'Media Picker',
			//stateSelector: 'img[data-udi]', TODO => Investigate where stateselector has gone, or if it is still needed
			onAction: () => this.#onAction(),
		});
	}

	async #observeCurrentUser() {
		if (!this.#currentUserStore) return;

		this.host.observe(this.#currentUserStore.currentUser, (currentUser) => {
			this.#currentUser = currentUser;
		});
	}

	async #onAction() {
		const selectedElm = this.editor.selection.getNode();
		let currentTarget: MediaPickerTargetData = {};

		if (selectedElm.nodeName === 'IMG') {
			const img = selectedElm as HTMLImageElement;
			const hasUdi = img.hasAttribute('data-udi');
			const hasDataTmpImg = img.hasAttribute('data-tmpimg');

			currentTarget = {
				altText: img.alt,
				url: img.src,
				caption: img.dataset.caption,
			};

			if (hasUdi) {
				currentTarget['udi'] = img.dataset.udi;
			} else {
				currentTarget['id'] = img.getAttribute('rel') ?? undefined;
			}

			if (hasDataTmpImg) {
				currentTarget['tmpimg'] = img.dataset.tmpimg;
			}
		}

		this.#showMediaPicker(currentTarget);
	}

	async #showMediaPicker(currentTarget: MediaPickerTargetData) {
		let startNodeId;
		let startNodeIsVirtual;

		// TODO => should we transform the config from an array to an object keyed by alias?
		if (!this.configuration?.find((x) => x.alias === 'startNodeId')) {
			if (this.configuration?.find((x) => x.alias === 'ignoreUserStartNodes')?.value === true) {
				startNodeId = -1;
				startNodeIsVirtual = true;
			} else {
				startNodeId = this.#currentUser?.mediaStartNodes.length !== 1 ? -1 : this.#currentUser?.mediaStartNodes[0];
				startNodeIsVirtual = this.#currentUser?.mediaStartNodes.length !== 1;
			}
		}

		const modalHandler = this.#modalContext?.open(UMB_MEDIA_PICKER_MODAL_TOKEN, {
			selection: currentTarget.udi ? [...currentTarget.udi] : [],
			multiple: false,
			startNodeId,
			startNodeIsVirtual,
		});

		if (!modalHandler) return;

		const { selection } = await (modalHandler.onSubmit() as Promise<UmbMediaPickerModalResult>);
		if (!selection.length) return;

		this.#insertInEditor(selection[0]);
		this.editor.dispatch('Change');
	}

	// TODO => mediaPicker returns a UDI, so need to fetch it. Wait for backend CLI before implementing
	async #insertInEditor(img: any) {
		if (!img) return;

		// We need to create a NEW DOM <img> element to insert
		// setting an attribute of ID to __mcenew, so we can gather a reference to the node, to be able to update its size accordingly to the size of the image.
		const data: MediaPickerResultData = {
			alt: img.altText || '',
			src: img.url ? img.url : 'nothing.jpg',
			id: '__mcenew',
			'data-udi': img.udi,
			'data-caption': img.caption,
		};
		const newImage = this.editor.dom.createHTML('img', data as Record<string, string | null>);
		const parentElement = this.editor.selection.getNode().parentElement;

		if (img.caption && parentElement) {
			const figCaption = this.editor.dom.createHTML('figcaption', {}, img.caption);
			const combined = newImage + figCaption;

			if (parentElement.nodeName !== 'FIGURE') {
				const fragment = this.editor.dom.createHTML('figure', {}, combined);
				this.editor.selection.setContent(fragment);
			} else {
				parentElement.innerHTML = combined;
			}
		} else {
			//if caption is removed, remove the figure element
			if (parentElement?.nodeName === 'FIGURE' && parentElement.parentElement) {
				parentElement.parentElement.innerHTML = newImage;
			} else {
				this.editor.selection.setContent(newImage);
			}
		}

		// Using settimeout to wait for a DoM-render, so we can find the new element by ID.
		setTimeout(() => {
			const imgElm = this.editor.dom.get('__mcenew') as HTMLImageElement;
			if (!imgElm) return;

			this.editor.dom.setAttrib(imgElm, 'id', null);

			// When image is loaded we are ready to call sizeImageInEditor.
			const onImageLoaded = () => {
				this.#mediaHelper?.sizeImageInEditor(this.editor, imgElm, img.url);
				this.editor.dispatch('Change');
			};

			// Check if image already is loaded.
			if (imgElm.complete === true) {
				onImageLoaded();
			} else {
				imgElm.onload = onImageLoaded;
			}
		});
	}
}
