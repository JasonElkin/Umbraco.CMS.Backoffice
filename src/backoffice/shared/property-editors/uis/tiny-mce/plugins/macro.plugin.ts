import { UmbModalService } from '@umbraco-cms/modal';
import { MacroSyntaxData, UmbMacroService } from 'libs/macro/macro.service';

interface DialogData {
	richTextEditor: boolean;
	macroData?: MacroSyntaxData | null | undefined;
	activeMacroElement?: HTMLElement;
}

// TODO => This is a quick transplant of the existing macro plugin - needs to be finished, and need to
// determine how to replicate the existing macro service (backend doens')
export class MacroPlugin {
	#modalService?: UmbModalService;
    #macroService?: UmbMacroService;
	editor?: any;

	constructor(editor: any, modalService?: UmbModalService) {
		this.#modalService = modalService;
		this.editor = editor;
        this.#macroService = new UmbMacroService();

		/** Adds custom rules for the macro plugin and custom serialization */
		editor.on('preInit', (args: any) => {
			//this is requires so that we tell the serializer that a 'div' is actually allowed in the root, otherwise the cleanup will strip it out
			editor.serializer.addRules('div');

			/** This checks if the div is a macro container, if so, checks if its wrapped in a p tag and then unwraps it (removes p tag) */
			editor.serializer.addNodeFilter('div', (nodes: any) => {
				for (let i = 0; i < nodes.length; i++) {
					if (
						nodes[i].attr('class') === 'umb-macro-holder' &&
						nodes[i].parent &&
						nodes[i].parent.name.toUpperCase() === 'P'
					) {
						nodes[i].parent.unwrap();
					}
				}
			});
		});

		/** when the contents load we need to find any macros declared and load in their content */
		editor.on('SetContent', () => {
			//get all macro divs and load their content
			editor.dom.select('.umb-macro-holder.mceNonEditable').forEach((macroElement: HTMLElement) => {
				this.#loadMacroContent(macroElement, null);
			});
		});

		/** Adds the button instance */
		editor.ui.registry.addButton('umbmacro', {
			icon: 'preferences',
			tooltip: 'Insert macro',

			/** The insert macro button click event handler */
			onAction: () => {
				let dialogData: DialogData = {
					//flag for use in rte so we only show macros flagged for the editor
					richTextEditor: true,
				};

				//when we click we could have a macro already selected and in that case we'll want to edit the current parameters
				//so we'll need to extract them and submit them to the dialog.
				const activeMacroElement = this.#getRealMacroElem();
				if (activeMacroElement) {
					//we have a macro selected so we'll need to parse it's alias and parameters
					const comment = Array.from(activeMacroElement.childNodes).find((x) => x.nodeType === 8);
					if (!comment) {
						throw 'Cannot parse the current macro, the syntax in the editor is invalid';
					}

					const syntax = comment.textContent?.trim();
					const parsed = this.#macroService?.parseMacroSyntax(syntax);

					dialogData = {
						richTextEditor: false,
						macroData: parsed,
						activeMacroElement, //pass the active element along so we can retrieve it later
					};
				}

				this.#showMacroPicker(dialogData);
			},
		});
	}

	/** loads in the macro content async from the server */
	#loadMacroContent(macroDiv?: HTMLElement, macroData?: any) {
		//if we don't have the macroData, then we'll need to parse it from the macro div
		if (!macroData && macroDiv) {
			const comment = Array.from(macroDiv.childNodes).find((x) => x.nodeType === 8);

			if (!comment) {
				throw 'Cannot parse the current macro, the syntax in the editor is invalid';
			}

			const syntax = comment.textContent?.trim();
			const parsed = this.#macroService?.parseMacroSyntax(syntax);
			macroData = parsed;
		}

		//show the throbber
		macroDiv?.classList.add('loading');

		// Add the contenteditable="false" attribute
		// As just the CSS class of .mceNonEditable is not working by itself?!
		macroDiv?.setAttribute('contenteditable', 'false');

		// TODO => macro data service?
		// const contentId = $routeParams.id;

		// //need to wrap in safe apply since this might be occuring outside of angular
		// angularHelper.safeApply($rootScope, function () {
		// 	tryExecuteAndNotify(this, macroResource
		// 		.getMacroResultAsHtmlForEditor(macroData.macroAlias, contentId, macroData.macroParamsDictionary))
		// 		.then(function (htmlResult) {
		// 			$macroDiv.removeClass('loading');
		// 			htmlResult = htmlResult.trim();
		// 			if (htmlResult !== '') {
		// 				const wasDirty = editor.isDirty();
		//              const $ins = macroDiv?.querySelector('ins');
		// 				$ins.html(htmlResult);
		// 				if (!wasDirty) {
		// 					editor.undoManager.clear();
		// 				}
		// 			}
		// 		});
		// });
	}

	#insertMacroInEditor(macroObject: any, activeMacroElement?: HTMLElement) {
		//Important note: the TinyMce plugin "noneditable" is used here so that the macro cannot be edited,
		// for this to work the mceNonEditable class needs to come last and we also need to use the attribute contenteditable = false
		// (even though all the docs and examples say that is not necessary)

		//put the macro syntax in comments, we will parse this out on the server side to be used
		//for persisting.
		const macroSyntaxComment = '<!-- ' + macroObject.syntax + ' -->';
		//create an id class for this element so we can re-select it after inserting
		const uniqueId = 'umb-macro-' + this.editor.dom.uniqueId();
		let macroDiv = this.editor.dom.create(
			'div',
			{
				class: 'umb-macro-holder ' + macroObject.macroAlias + ' ' + uniqueId + ' mceNonEditable',
				contenteditable: 'false',
			},
			macroSyntaxComment + '<ins>Macro alias: <strong>' + macroObject.macroAlias + '</strong></ins>'
		);

		//if there's an activeMacroElement then replace it, otherwise set the contents of the selected node
		if (activeMacroElement) {
			activeMacroElement.replaceWith(macroDiv); //directly replaces the html node
		} else {
			this.editor.selection.setNode(macroDiv);
		}

		macroDiv = this.editor.dom.select('div.umb-macro-holder.' + uniqueId);
		this.editor.setDirty(true);

		//async load the macro content
		this.#loadMacroContent(macroDiv, macroObject);
	}

	/**
	 * Because the macro got wrapped in a P tag because of the way 'enter' works in older versions of Umbraco, this
	 * method will return the macro element if not wrapped in a p, or the p if the macro
	 * element is the only one inside of it even if we are deep inside an element inside the macro
	 */
	#getRealMacroElem() {
		// Ask the editor for the currently selected element
		const element = this.editor.selection.getNode() as HTMLElement;
		if (!element) {
			return null;
		}

		const e = element.closest('.umb-macro-holder');
		if (!e || e === null) return null;

		if (e.parentNode?.nodeName === 'P') {
			//now check if we're the only element
			if (element.parentNode?.childNodes.length === 1) {
				return e.parentNode as HTMLElement;
			}
		}

		return e as HTMLElement;
	}

	async #showMacroPicker(dialogData: DialogData) {
		console.log(dialogData);
		const modalHandler = this.#modalService?.openBasic({
			header: 'I am a macro picker',
			content: 'content content content',
		});

		if (!modalHandler) return;

		const { confirmed } = await modalHandler.onClose();
		if (!confirmed) return;

		this.#insertMacroInEditor({}, dialogData.activeMacroElement);
		this.editor.dispatch('Change');
	}
}