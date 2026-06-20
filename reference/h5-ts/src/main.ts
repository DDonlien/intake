import './styles/tokens.css';
import './styles/main.css';
import { App } from './components/App';

const app = document.getElementById('app');
if (!app) throw new Error('Root element #app not found');

const intakeApp = new App(app);
intakeApp.mount();
