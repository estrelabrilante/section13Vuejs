<template>
  <button @click="confirmInput">Go to Teams</button>
  <button @click="saveChange">save changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      changesSaved: false,
    };
  },
  inject: ['users'],
  methods: {
    confirmInput() {
      this.$router.push('/teams');
    },
    saveChange() {
      this.changesSaved = true;
    },
  },
  // component level : navigation guard

  beforeRouteEnter(to, from, next) {
    console.log('userlist before route enter');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UserList Cmp beforeRouteLeave');
    console.log(to, from);
    if (this.changesSaved) {
      next();
    } else {
      const usersWantToLeave = confirm('Are you sure to leave');
      next(usersWantToLeave);
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
