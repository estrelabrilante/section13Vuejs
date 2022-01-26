<template>
  <router-view></router-view>
  <button @click="confirmInput">Confirm</button>
  <ul>
    <!-- Connect data in array teams from App.vue to teams-item component -->
    <teams-item
      v-for="team in teams"
      :key="team.id"
      :id="team.id"
      :name="team.name"
      :member-count="team.members.length"
    ></teams-item>
  </ul>
</template>

<script>
import TeamsItem from './TeamsItem.vue';

export default {
  components: {
    TeamsItem,
  },
  // inject data from App.vue
  inject: ['teams'],
  methods: {
    confirmInput() {
      // navigating programmatically
      this.$router.push('/users');
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 40rem;
  padding: 0;
}
</style>
