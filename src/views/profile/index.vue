<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col
          :span="6"
          :xs="24"
        >
          <user-card :user="user" />
        </el-col>
        <el-col
          :span="18"
          :xs="24"
        >
          <el-card>
            <el-tabs v-model="activeTab">
              <!-- <el-tab-pane
                label="Activity"
                name="activity"
              >
                <activity />
              </el-tab-pane> -->
              <!-- <el-tab-pane
                label="Timeline"
                name="timeline"
              >
                <timeline />
              </el-tab-pane> -->
              <el-tab-pane
                :label="$t('profileView.account')"
                name="account"
              >
                <info :user="user" />
              </el-tab-pane>
              <el-tab-pane
                :label="$t('profileView.changePassword')"
                name="changePassword"
              >
                <account />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import Account from './components/Account.vue'
import Info from './components/Info.vue'
import Timeline from './components/Timeline.vue'
import UserCard from './components/UserCard.vue'

export interface IProfile {
  name: string
  title: string
  email: string
  avatar: string
  roles: string
}

const defaultProfile: IProfile = {
  name: 'Loading...',
  email: 'Loading...',
  avatar: 'Loading...',
  roles: 'Loading...',
  title: 'Loading...'
}

@Component({
  name: 'Profile',
  components: {
    Account,
    Info,
    Timeline,
    UserCard
  }
})
export default class extends Vue {
  private user = defaultProfile
  private activeTab = 'account'

  get name() {
    return UserModule.name
  }

  get title() {
    return UserModule.title
  }

  get email() {
    return UserModule.email
  }

  get avatar() {
    return UserModule.avatar
  }

  get roles() {
    return UserModule.roles
  }

  created() {
    this.getUser()
  }

  private getUser() {
    this.user = {
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      title: this.title,
      roles: this.roles.join(' | ')
    }
  }
}
</script>
