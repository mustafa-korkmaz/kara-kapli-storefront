<template>
  <el-card style="margin-bottom:20px;">
    <div
      slot="header"
      class="clearfix"
    >
      <span> {{ title || name }}</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div> {{ getGreeting() }}</div>
          {{ $t('dashboardView.boss') }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">
          {{ user.name }}
        </div>
        <div class="user-role text-center text-muted">
          {{ $t('roles.' + user.roles) }}
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon name="skill" /><span>{{ $t('dashboardView.membership') }}</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ $t('dashboardView.membershipCreatedAt') }} {{ membershipDate }}
          </div>
          <div class="text-muted">
            {{ $t('dashboardView.membershipExpiresAt') }}{{ membershipExpirationDate }}
          </div>
          <div class="text-muted">
            {{ $t('dashboardView.leftDays') }}{{ calculateLeftDays }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IProfile } from '../index.vue'
import PanThumb from '@/components/PanThumb/index.vue'
import { UserModule } from '@/store/modules/user'
import { getDateStr } from '@/utils/index'

@Component({
  name: 'UserCard',
  components: {
    PanThumb
  }
})
export default class extends Vue {
  @Prop({ required: true }) private user!: IProfile

  get title() {
    return UserModule.title || UserModule.name || UserModule.email
  }

  get nameSurname() {
    return UserModule.name || UserModule.email
  }

  get membershipDate() {
    return getDateStr(UserModule.createdAt, this.$i18n.locale)
  }

  get membershipExpirationDate() {
    return getDateStr(UserModule.membershipExpiresAt, this.$i18n.locale)
  }

  get calculateLeftDays() {
    const diff = new Date(UserModule.membershipExpiresAt).getTime() - new Date().getTime()
    return Math.ceil(diff / (1000 * 3600 * 24))
  }

  getGreeting() {
    const d = new Date()
    const h = d.getHours()

    if (h > 5 && h < 12) {
      return this.$t('dashboardView.goodMorning')
    } else
    if (h >= 12 && h < 17) {
      return this.$t('dashboardView.goodDay')
    }

    return this.$t('dashboardView.goodEvening')
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
  margin-top: 1em;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
