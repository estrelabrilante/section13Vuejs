import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';
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
      name: 'teams',
      path: '/teams',
      // component: TeamsList,
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      // our domain.com/teams
      path: '/users',
      // component: UsersList,
      components: { default: UsersList, footer: UsersFooter },
    },
    // Dynamic route

    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'activeRouter',
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    // saving position we are scroll to
    if (savedPosition) {
      return savedPosition;
    }
    // else jump to top of pages
    return { left: 0, top: 0 };
  },
});
//
router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  // allow navigation;
  // next('/teams')
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // }

  next();
});
const app = createApp(App);
app.use(router);

app.mount('#app');
