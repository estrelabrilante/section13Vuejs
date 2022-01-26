import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
// Route configuration
const router = createRouter({
  history: createWebHistory(),
  // which component should be load for a corresponding routes
  routes: [
    // URL CHANGES
    {
      path: '',
      redirect: '/teams',
    },
    // {
    //   // URL NOT CHANGE
    //   path: '/teams',
    //   component: TeamsList,
    //   alias: '/',
    // },
    {
      // our domain.com/teams
      path: '/teams',
      component: TeamsList,
      children: [{ path: ':teamId', component: TeamMembers, props: true }],
    },
    {
      // our domain.com/teams
      path: '/users',
      component: UsersList,
    },
    // Dynamic route

    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'activeRouter',
});
const app = createApp(App);
app.use(router);

app.mount('#app');
