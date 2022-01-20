import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
const router = createRouter({
  history: createWebHistory(),
  // which component should be load for a corresponding routes
  routes: [
    {
      // our domain.com/teams
      path: '/teams',
      component: TeamsList,
    },
    {
      // our domain.com/teams
      path: '/users',
      component: UsersList,
    },
  ],
});
const app = createApp(App);
app.use(router);

app.mount('#app');
