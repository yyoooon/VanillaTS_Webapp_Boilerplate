import Component from './components/base/Component';
import route from './routes/routes';
import { pushRouter, replaceRouter, popStateRouter } from './routes/router';

export default class App extends Component<null, null> {
  template() {
    return ``;
  }

  setInitRouter(target: Element) {
    route(target);
    pushRouter(() => {
      route(target);
    });
    replaceRouter(() => {
      route(target);
    });
    popStateRouter(() => {
      route(target);
    });
  }

  mounted() {
  }
}
