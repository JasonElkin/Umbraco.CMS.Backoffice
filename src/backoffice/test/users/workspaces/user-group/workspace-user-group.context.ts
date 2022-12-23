import { UmbWorkspaceNodeContext } from '../../../core/components/workspace/workspace-context/workspace-node.context';
import type { UmbUserGroupStore, UmbUserGroupStoreItemType } from 'src/backoffice/test/users/user-group.store';

const DefaultDataTypeData = {
	key: '',
	name: '',
	icon: '',
	type: 'user-group',
	hasChildren: false,
	parentKey: '',
	sections: [],
	permissions: [],
	users: [],
} as UmbUserGroupStoreItemType;

export class UmbWorkspaceUserGroupContext extends UmbWorkspaceNodeContext<
	UmbUserGroupStoreItemType,
	UmbUserGroupStore
> {
	constructor(target: HTMLElement, entityKey: string) {
		super(target, DefaultDataTypeData, 'umbUserStore', entityKey);
	}
}
