const umbContextRequestEventType = "umb:context-request";
class UmbContextRequestEventImplementation extends Event {
  constructor(contextAlias, callback) {
    super(umbContextRequestEventType, { bubbles: true, composed: true, cancelable: true });
    this.contextAlias = contextAlias;
    this.callback = callback;
  }
}
const isUmbContextRequestEvent = (event) => {
  return event.type === umbContextRequestEventType;
};

const umbContextProvideEventType = "umb:context-provide";
class UmbContextProvideEventImplementation extends Event {
  constructor(contextAlias) {
    super(umbContextProvideEventType, { bubbles: true, composed: true });
    this.contextAlias = contextAlias;
  }
}
const isUmbContextProvideEvent = (event) => {
  return event.type === umbContextProvideEventType;
};

class UmbContextConsumer {
  constructor(target, _contextAlias, _callback) {
    this.target = target;
    this._contextAlias = _contextAlias;
    this._callback = _callback;
    this._handleNewProvider = (event) => {
      if (!isUmbContextProvideEvent(event))
        return;
      if (this._contextAlias === event.contextAlias) {
        this.request();
      }
    };
  }
  request() {
    const event = new UmbContextRequestEventImplementation(this._contextAlias, this._callback);
    this.target.dispatchEvent(event);
  }
  attach() {
    window.addEventListener(umbContextProvideEventType, this._handleNewProvider);
    this.request();
  }
  detach() {
    window.removeEventListener(umbContextProvideEventType, this._handleNewProvider);
  }
}

class UmbContextProvider {
  constructor(host, contextAlias, instance) {
    this._handleContextRequest = (event) => {
      if (!isUmbContextRequestEvent(event))
        return;
      if (event.contextAlias !== this._contextAlias)
        return;
      event.stopPropagation();
      event.callback(this._instance);
    };
    this.host = host;
    this._contextAlias = contextAlias;
    this._instance = instance;
  }
  attach() {
    this.host.addEventListener(umbContextRequestEventType, this._handleContextRequest);
    this.host.dispatchEvent(new UmbContextProvideEventImplementation(this._contextAlias));
  }
  detach() {
    this.host.removeEventListener(umbContextRequestEventType, this._handleContextRequest);
  }
}

const UmbContextProviderMixin = (superClass) => {
  class UmbContextProviderClass extends superClass {
    constructor() {
      super(...arguments);
      this._providers = /* @__PURE__ */ new Map();
      this._attached = false;
    }
    provideContext(alias, instance) {
      if (this._providers.has(alias))
        return;
      const provider = new UmbContextProvider(this, alias, instance);
      this._providers.set(alias, provider);
      if (this._attached) {
        provider.attach();
      }
    }
    connectedCallback() {
      var _a;
      (_a = super.connectedCallback) == null ? void 0 : _a.call(this);
      this._attached = true;
      this._providers.forEach((provider) => provider.attach());
    }
    disconnectedCallback() {
      var _a;
      (_a = super.disconnectedCallback) == null ? void 0 : _a.call(this);
      this._attached = false;
      this._providers.forEach((provider) => provider.detach());
    }
  }
  return UmbContextProviderClass;
};

const UmbContextConsumerMixin = (superClass) => {
  class UmbContextConsumerClass extends superClass {
    constructor() {
      super(...arguments);
      this._consumers = /* @__PURE__ */ new Map();
      this._resolved = /* @__PURE__ */ new Map();
      this._attached = false;
    }
    consumeContext(alias, callback) {
      if (this._consumers.has(alias))
        return;
      const consumer = new UmbContextConsumer(this, alias, (_instance) => {
        callback == null ? void 0 : callback(_instance);
        if (this._resolved.has(alias) && this._resolved.get(alias) === _instance)
          return;
        this._resolved.set(alias, _instance);
        this._consumeContextCallback(alias, _instance);
      });
      this._consumers.set(alias, consumer);
      if (this._attached) {
        consumer.attach();
      }
    }
    connectedCallback() {
      var _a;
      (_a = super.connectedCallback) == null ? void 0 : _a.call(this);
      this._attached = true;
      this._consumers.forEach((requester) => requester.attach());
    }
    disconnectedCallback() {
      var _a;
      (_a = super.disconnectedCallback) == null ? void 0 : _a.call(this);
      this._attached = false;
      this._consumers.forEach((requester) => requester.detach());
      this._resolved.clear();
    }
    _consumeContextCallback(_newAlias, _newInstance) {
    }
    whenAvailableOrChanged(_contextAliases) {
    }
  }
  return UmbContextConsumerClass;
};

export { UmbContextConsumer, UmbContextConsumerMixin, UmbContextProvider, UmbContextProviderMixin, UmbContextRequestEventImplementation, isUmbContextRequestEvent, umbContextRequestEventType };
