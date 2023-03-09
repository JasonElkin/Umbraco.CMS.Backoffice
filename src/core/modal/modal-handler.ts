import type { UUIDialogElement } from '@umbraco-ui/uui';
import type { UUIModalDialogElement } from '@umbraco-ui/uui-modal-dialog';
import type { UUIModalSidebarElement, UUIModalSidebarSize } from '@umbraco-ui/uui-modal-sidebar';
import { v4 as uuidv4 } from 'uuid';

import { UmbModalOptions } from './modal.context';

//TODO consider splitting this into two separate handlers
export class UmbModalHandler {
	private _closeResolver: any;
	private _closePromise: any;

	public element: UUIModalDialogElement | UUIModalSidebarElement;
	public key: string;
	public type: string;
	public size: UUIModalSidebarSize;

	constructor(element: string | HTMLElement, options?: UmbModalOptions<unknown>) {
		this.key = uuidv4();

		this.type = options?.type || 'dialog';
		this.size = options?.size || 'small';
		this.element = this._createElement(element, options);

		// TODO: Consider if its right to use Promises, or use another event based system? Would we need to be able to cancel an event, to then prevent the closing..?
		this._closePromise = new Promise((resolve) => {
			this._closeResolver = resolve;
		});
	}

	private _createElement(element: string | HTMLElement, options?: UmbModalOptions<unknown>) {
		const layoutElement = this._createInsideElement(element, options?.data);
		return this.type === 'sidebar'
			? this._createSidebarElement(layoutElement)
			: this._createDialogElement(layoutElement);
	}

	private _createSidebarElement(insideElement: HTMLElement) {
		const sidebarElement = document.createElement('uui-modal-sidebar');
		sidebarElement.appendChild(insideElement);
		sidebarElement.size = this.size;
		return sidebarElement;
	}

	private _createDialogElement(insideElement: HTMLElement) {
		const modalDialogElement = document.createElement('uui-modal-dialog');
		const dialogElement: UUIDialogElement = document.createElement('uui-dialog');
		modalDialogElement.appendChild(dialogElement);
		dialogElement.appendChild(insideElement);
		return modalDialogElement;
	}

	private _createInsideElement(element: string | HTMLElement, data: unknown) {
		const insideElement: any = element instanceof HTMLElement ? element : document.createElement(element);
		insideElement.data = data;
		insideElement.modalHandler = this;
		return insideElement;
	}

	public close(...args: any) {
		this._closeResolver(...args);
		this.element.close();
	}

	public onClose(): Promise<any> {
		return this._closePromise;
	}
}
