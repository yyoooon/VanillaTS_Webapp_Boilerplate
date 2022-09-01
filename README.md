# VanillaTS_Webapp_Boilerplate

</br>

## 0. 실행 방법
- 터미널에서 `yarn install`을 입력해 패키지를 설치합니다.
- 이후에 `yarn start`를 입력해 app을 실행시킵니다.

</br>

## 1. 기술 스택

- 언어: `Ts`
- 스타일: `Scss`
- 서버통신: `Fetch`
- 라우팅: `HistoryApi`
- 번들링: `Webpack5`
- 트랜스파일: `Babel`
- 포맷팅&린팅: `EsLint`, `Prettier`

</br>

## 2. 폴더 구조
```
📦VanillaTS_Webapp_Boilerplate
 ┣ 📂public
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📜request.ts
 ┃ ┣ 📂components
 ┃ ┃ ┗ 📂base
 ┃ ┃   ┗ 📜Component.ts
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜router.ts
 ┃ ┃ ┗ 📜routes.ts
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜createElement.ts
 ┃ ┃ ┣ 📜debounce.ts
 ┃ ┃ ┣ 📜localStorage.ts
 ┃ ┃ ┗ 📜sessionStorage.ts
 ┃ ┣ 📜App.ts
 ┃ ┗ 📜index.ts
 ┣ 📂style
 ┃ ┣ 📜index.scss
 ┃ ┗ 📜reset.scss
 ┣ 📜README.md
 ┣ 📜custom.d.ts
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tsconfig.json
 ┗ 📜webpack.config.js
```

</br>

## 3. 베이스 컴포넌트 구성

</br>

****사용법****

- 모든 컴포넌트는 베이스컴포넌트를 확장시켜 생성합니다.
- 베이스컴포넌트에서 물려받은 공통 메서드와 프로퍼티를 사용해 컴포넌트 라이프사이클을 구현합니다.

```ts
import Component from 'src/components/base/Component.ts';

class Input extends Component {
 ...
}

export default Input;
```

</br>

****구성 요소****

```ts
export default class Component<P, S> {
  $node?: Element;
  $target: Element;
  props: P;
  state: S | undefined;
  constructor($target: Element, props: P) {
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

```

</br>

### 3-1. **프로퍼티**

- `$node` : 내 돔 (돔 메서드로 직접 만들어서 target에 연결하는 경우에만 사용)
- `$target`: 부모(내 돔을 연결할) 돔
- `props`: 부모에게 받은 데이터
- `state`: 나의 상태

</br>

### 3-2. **메소드**

- `setup()`: 컴포넌트가 첫 생성 될 때 실행됩니다.
- `template()`: target에 삽입할 template을 작성합니다.
- `mounted()`: 돔 생성 이후의 로직을 실행합니다.
- `connectChild()`: 생성된 돔을 가져와 자식 컴포넌트와 연결합니다. (mounted메소드 내부에서 실행)
- `render()`: $target 또는 $node에 template를 연결해 돔을 생성합니다.  
              ($node가 생성됐을 경우 $target에 $node를 append하고 $node에 template연결)
- `setEvent()`: 생성된 돔에 이벤트를 거는 로직을 실행합니다.
- `childUpdate()`: 상태 변경 시 일부 자식 컴포넌트만 업데이트(setState) 하는 로직을 작성합니다.
- `checkNeedRender()`: 이전 상태와 새로운 상태를 비교해 상태 변경 및 리렌더링이 필요한 지 판단합니다.(setState 메소드 내부에서 실행)
- `setState()`: 상태 변경 후 컴포넌트를 업데이트 합니다. 두번째 인자로 true가 들어갈 경우 childUpdate메소드 실행, 들어가지 않은 경우 render메소드를 실행합니다.
- `fetch()`: 외부 데이터를 비동기로 불러와서 setState를 실행시킵니다.

</br>

### 3-3. **라이프 사이클**

```js
 constructor({ $target, props }) {
    this.$target = $target; // 부모 돔 저장
    this.props = props;     // props 저장
    this.setup();           // 초기 셋팅(주로 초기 상태 설정)
    this.render();          // target돔에 template 생성(렌더링), 렌더링 이후 실행되어야할 로직 실행
    this.setEvent();        // 돔에 이벤트 부착
    this.fetch();           // 외부 데이터를 비동기로 불러온 후, 그 값으로 setState
  }
```
</br>

### 3-4. 컴포넌트 사용 규칙

- **template literal 작성 규칙**
    
    1. 부모 컴포넌트 템플릿 리터럴에서 자식 컴포넌트를 연결할 태그를 작성합니다.
    컴포넌트를 연결할 태그은 data-component 속성을 이용해 연결할 컴포넌트를 명시합니다.
    
    2. connectChild메소드에서 자식 컴포넌트와 해당 태그를 연결시켜줍니다.

```js
// 부모 컴포넌트
 template() {
    return `
      <div data-component="ItemList"></div> // 자식 컴포넌트를 연결할 태그
      <div data-component="Form"></div>
    `;
  }
  
  connectChild() {
    const $ItemList = this.$target.querySelector('[data-component="HistoryList"]');
    const $Form = this.$target.querySelector('[data-component="Form"]')

    if ($ItemList) {
      this.HistoryList = new HistoryList({
        $target: $ItemList,
      });
    }
    
    if ($Form) {
      this.Form = new Form({
        $target: $Form,
      });
    }
   
  }
```
    
- **setState 사용 규칙**
    
    2번째 인자로 true를 넣어주면 등록한 자식 컴포넌트만 업데이트, 넣지 않으면 모든 자식 돔을 새로 생성합니다.

</br>

### 3-5. 예외

1. input의 value값을 상태로 업데이트 해야할 때
   - keyup이벤트를 이용해 value가져와 상태에 업데이트 할 때 setState실행이 아닌 this.state를 직접 변경해야 합니다.
 
2. 템플릿 리터럴이 아닌 돔(item)을 직접 생성해서 리스트로 만들어야 할 때 
   - item컴포넌트에서 $node를 생성 - util폴더의 createElement파일에 있는 함수들을 사용할 수 있습니다.
   - item컴포넌트의 render메소드를 실행시킵니다. ($node에 template를 삽입한 다음 $target에 appendChild)
   - 부모 컴포넌트의 mounted메소드에서 연결해야 할 갯수만큼 item컴포넌트 반복 실행시킵니다.
