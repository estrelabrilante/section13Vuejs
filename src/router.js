import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';
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
      meta: { needsAuth: true },
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
      //  navigation guard : route level
      beforeEnter(to, from, next) {
        console.log('users beforeEach');
        console.log(to, from);
        next();
      },
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
// Global level : navigation guard
router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('needs auth');
    next();
  } else {
    next();
  }
  // allow navigation;
  // next('/teams')
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // }

  next();
});
router.afterEach(function (to, from) {
  //  sending analytical data to server
  console.log('Global After Each');
  console.log(to, from);
});

export default router;
