
export default class Component<P, S> {
  $node?: Element;
  $target: Element;
  props?: P;
  state: S | undefined;
  constructor({$target, props}: {$target: Element, props?: P}) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.fetch();
    this.render();
    this.setEvent();
  }

  setup() {
    return;
  }

  fetch() {
    return;
  }

  template() {
    return '';
  }

  mounted() {
    return;
  }

  setEvent() {
    return;
  }

  render() {
    if (this.$node) {
      this.$node.innerHTML = this.template();
      this.$target.appendChild(this.$node);
    } else {
      this.$target.innerHTML = this.template();
    }
    this.mounted();
  }

  childUpdate() {
    return;
  }

  checkNeedRender(newState:Partial<S>) {
    let needRender = false;
    const updateStateKey:string[] = Object.keys(newState);

    updateStateKey.map((key) => {
      if(!this.state) return false;
      const stateKey = key as keyof S

      if (!(JSON.stringify(this.state[stateKey]) === JSON.stringify(newState[stateKey]))) {
        needRender = true;
      }
    });

    return needRender;
  }

  setState(newState:Partial<S>, childUpdate = false) {
    const needRender = this.checkNeedRender(newState);
    if (!needRender) return;

    const newObj:S = Object.assign({}, this.state, newState);
    this.state = newObj;

    childUpdate ? this.childUpdate() : this.render();
  }
}
