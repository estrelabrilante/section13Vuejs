<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <!-- Connect data in array members to component user-item -->
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
      <router-link to="/teams/t2">To team t2 member page</router-link>
    </ul>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users', 'teams'],
  // route parents are passed as props
  props: ['teamId'],
  data() {
    return {
      // teamName: 'Test',
      teamName: '',
      members: [],
      // Dummy data not rendering anywhere
      // members: [
      //   { id: 'u1', fullName: 'Max Schwarz', role: 'Engineer' },
      //   { id: 'u2', fullName: 'Max Schwarz', role: 'Engineer' },
      // ],
    };
  },
  methods: {
    loadTeamMembers(teamId) {
      // const teamId = route.params.teamId;
      console.log(this.$route);
      // select the right team
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      // find members in team
      const mem = selectedTeam.members;
      const selectedMembers = [];
      for (const member of mem) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },
  //create lifecycle hook
  created() {
    this.loadTeamMembers(this.teamId);
    console.log(this.$route.query);
  },
  beforeRouteUpdate(to, from, next) {
    console.log('TeamMembers component before route update');
    this.loadTeamMembers(to.params.teamId);
    next();
  },
  watch: {
    teamId(newId) {
      this.loadTeamMembers(newId);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
