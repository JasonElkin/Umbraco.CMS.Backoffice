import { UmbContextProvider, UmbContextConsumer } from 'umbraco/context';

class MyFriendlyAPI {
	sayHi() {
		alert('Hi! :)');
	}
}

const registerExtensions = (registry) => {
	registry.register({
		type: 'section',
		alias: 'My.Section.Custom',
		name: 'Custom Section',
		js: '/App_Plugins/section.js',
		elementName: 'my-section-custom',
		meta: {
			pathname: 'my-custom',
			weight: 1,
		},
	});
};

// TODO: make it easy to provide/consume from root
const container = document.getElementsByTagName('umb-app')[0];
const friendlyAPIProvider = new UmbContextProvider(container, 'myFriendlyAPI', new MyFriendlyAPI());
const registryConsumer = new UmbContextConsumer(container, 'umbExtensionRegistry', registerExtensions);

const setup = () => {
	friendlyAPIProvider.attach();
	registryConsumer.attach();
};

setup();
