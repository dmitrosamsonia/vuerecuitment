<template>
  <main class="dashboard">
    <h1 class="page-title">Dashboard view</h1>
    <div class="userinfo">
      <div class="firstname">
        <label>FirstName: </label>
        <span v-if="getMyProfile != null && getMyProfile.marketer != null && getMyProfile.marketer.firstName != null">{{
          getMyProfile.marketer.firstName
        }}</span>
      </div>
      <div class="lastname">
        <label>LastName: </label>
        <span v-if="getMyProfile != null && getMyProfile.marketer != null && getMyProfile.marketer.lastName != null">{{
          getMyProfile.marketer.lastName
        }}</span>
      </div>
    </div>
    <div class="taskinfo">
      <table>
        <thead>
          <th>No</th>
          <th>Title</th>
          <th>Description</th>
          <th>Budget</th>
          <th>ProposalCount</th>
          <th>Platforms</th>
          <th>AddedTime</th>
        </thead>
        <tbody>
          <template v-if="getMyTask != null && getMyTask.tasks != null">
            <tr v-for="(value, index) in getMyTask.tasks" :key="index">
              <td>{{ index + 1 }}</td>
              <td v-if="value != null && value.title != null">{{ value.title }}</td>
              <td v-if="value != null && value.description != null">{{ value.description }}</td>
              <td v-if="value != null && value.budget != null">{{ value.budget.value + value.budget.currency }}</td>
              <td v-if="value != null && value.proposalCount != null">{{ value.proposalCount }}</td>
              <td v-if="value != null && value.platforms != null">{{ value.platforms[0] }}</td>
              <td v-if="value != null && value.addedTime != null">{{ value.addedTime }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script lang="ts">
import useUserStore from '@/store/user'
import useTaskStore from '@/store/task'
import userManagementController from '@/controllers/userManagementController'
import taskController from '@/controllers/taskController'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const { getMyProfile } = useUserStore()
    const userData = userManagementController()
    const { getMyTask } = useTaskStore()
    const taskData = taskController()
    onMounted(() => {
      userData.fetchUser()
      taskData.fetchTask()
    })
    return {
      getMyProfile,
      getMyTask,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/views/Dashboard';
</style>
