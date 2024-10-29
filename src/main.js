import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/pages/LoginPage.vue';
import RegisterPage from './components/pages/RegisterPage.vue';
import MyTodoList from './components/pages/MyTodoList.vue';
import ProfilPage from './components/pages/ProfilPage.vue';
import ProjectList from '../src/components/pages/ProjectList.vue';
import ProjectCreate from '../src/components/pages/ProjectCreate.vue';
import ProjectEdit from './components/pages/ProjectEdit.vue';
import ProjectShow from './components/pages/ProjectShow.vue';
		
axios.defaults.baseURL = "https://mock-api.binaryboxtuts.com"
axios.interceptors.request.use(function (config) {
	config.headers['X-Binarybox-Api-Key'] = "binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt";
	return config;
});
		
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: LoginPage },
		{ path: '/register', component: RegisterPage },
		{ path: '/mytodolist', component: ProjectList },
		{path: '/profil', component: ProfilPage},
		{path: '/projectlist', component: ProjectList},
		{path: '/create', component: ProjectCreate},
		{path: '/edit/:id', component: ProjectEdit},
		{path: '/show/:id', component: ProjectShow}
	],
});
		
createApp(App).use(router).mount('#app');