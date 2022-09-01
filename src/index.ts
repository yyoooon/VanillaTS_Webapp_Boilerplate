import '../style/index.scss';
import App from './App';

const $target = document.querySelector('#app');
$target instanceof Element && new App($target);
