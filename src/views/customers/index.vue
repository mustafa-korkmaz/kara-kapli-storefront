<template>
  <div class="page-container">
    <el-form
      ref="postForm"
      :model="postForm"
      class="form-container"
    >
      <el-row>
        <el-col
          :xs="24"
          :sm="24"
          :md="8"
          :lg="8"
        >
          <el-form-item prop="title">
            <material-input
              id="title"
              v-model="postForm.title"
              :maxlength="100"
              name="title"
              @enterPressed="handleFilter"
            >
              {{ $t('customersView.title') }}
            </material-input>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="8"
          :lg="8"
        >
          <el-form-item prop="authorized_person_name">
            <material-input
              id="authorized_person_name"
              v-model="postForm.authorized_person_name"
              :maxlength="100"
              name="authorized_person_name"
              @enterPressed="handleFilter"
            >
              {{ $t('customersView.authorizedPersonName') }}
            </material-input>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="16"
          :lg="16"
        >
          <el-form-item
            prop="create"
            class="form-buttons"
          >
            <el-button
              icon="el-icon-circle-plus-outline"
              type="success"
              @click="handleCreate"
            >
              {{ $t('form.create') }}
            </el-button>
            <el-button
              icon="el-icon-search"
              type="primary"
              @click="handleFilter"
            >
              {{ $t('form.search') }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form />
    </el-form>
    <el-row>
      <el-table
        :key="tableKey"
        v-loading="loading"
        :data="list"
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <el-table-column
          :label="$t('customersView.title')"
          prop="title"
          sortable="custom"
          min-width="18"
        >
          <template slot-scope="{row}">
            <el-tooltip
              :content="$t('customersView.goToTransactions')"
              effect="dark"
              placement="right"
            >
              <router-link
                :to="{path: '/transactions', query: {customerId: row.id}}"
                class="link-type"
              >
                {{ row.title }}
              </router-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('customersView.authorizedPersonName')"
          min-width="18"
        >
          <template slot-scope="{row}">
            <span>{{ row.authorized_person_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('customersView.phoneNumber')"
          min-width="10"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.phone_number }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('customersView.debtsAmount')"
          align="center"
          min-width="10"
        >
          <template
            slot-scope="{row}"
            text-align="right"
          >
            <span>{{ getPriceText(row.debt_balance) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('customersView.receivablesAmount')"
          align="center"
          min-width="10"
        >
          <template slot-scope="{row}">
            <span>{{ getPriceText(row.receivable_balance) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('customersView.remainingBalance')"
          align="center"
          min-width="10"
        >
          <template slot-scope="{row}">
            <el-tooltip
              :content="getRemainingBalanceTooltip(row)"
              effect="dark"
              placement="top"
            >
              <span>{{ getPriceText(row.remaining_balance) }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('customersView.createdAt')"
          min-width="10"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ getDateStr(row.created_at) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('tableActions.name')"
          align="center"
          min-width="14"
          class-name="fixed-width"
        >
          <template slot-scope="{row}">
            <el-button-group>
              <el-button
                type="primary"
                size="mini"
                @click="handleUpdate(row)"
              >
                {{ $t('tableActions.edit') }}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(row)"
              >
                {{ $t('tableActions.delete') }}
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="page"
        :limit.sync="query.limit"
        @pagination="getList"
      />
    </el-row>
    <el-dialog
      :title="getDialogTitle()"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        v-loading="modalLoading"
        :rules="rules"
        :model="selectedCustomer"
        label-position="top"
        label-width="100px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              :label="$t('customersView.title')"
              prop="title"
              class="single"
            >
              <el-input
                v-model="selectedCustomer.title"
                :placeholder="$t('customersView.titlePlaceholder')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              :label="$t('customersView.authorizedPersonName')"
              prop="authorizedPerson"
              class="single"
            >
              <el-input v-model="selectedCustomer.authorized_person_name" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              :label="$t('customersView.phoneNumber')"
              prop="phone"
              class="single"
            >
              <el-input
                v-model="selectedCustomer.phone_number"
                type="number"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          {{ $t('form.cancel') }}
        </el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          :loading="modalLoading"
          @click="editMode?updateCustomer():createCustomer()"
        >
          {{ $t('form.save') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as service from '@/api/customers/customer-service'
import { ICustomer } from '@/api/customers/types'
import { getPriceText, getDateStr } from '@/utils/index'
import MaterialInput from '@/components/MaterialInput/index.vue'
import { MessageBox, Form } from 'element-ui'
import settings from '@/settings'

import Pagination from '@/components/Pagination/index.vue'
import tr from '../../lang/tr'

const { notificationDuration } = settings

@Component({
  name: 'Customer',
  components: {
    MaterialInput,
    Pagination
  }
})
export default class extends Vue {
  private postForm = Object.assign({}, service.defaultCustomer)
  private query = Object.assign({}, service.defaultCustomerQuery)
  private selectedCustomer = Object.assign({}, service.defaultCustomer)

  private tableKey = 0
  private list: ICustomer[] = []
  private total = 0
  private page = 1
  private loading = true
  private modalLoading = false
  private editMode = false
  private dialogFormVisible = false
  private rules = {}

  private getPriceText = getPriceText

  created() {
    this.rules = {
      title: [{ required: true, message: this.titleRequired, trigger: 'blur' }]
    }
    this.getList()
  }

  get titleRequired() {
    return this.$t('customersView.titleRequired')
  }

  private getList() {
    this.loading = true
    this.query.offset = (this.page - 1) * this.query.limit
    this.query.authorized_person_name = this.postForm.authorized_person_name
    this.query.title = this.postForm.title
    this.query.include_records_total = true

    service.getCustomers(this.query)
      .then(
        (resp) => {
          this.loading = false
          this.list = resp.data.items
          this.total = resp.data.records_total
        },
        (err) => {
          console.error(err)
          this.loading = false
        }
      )
  }

  private handleFilter() {
    this.page = 1
    this.getList()
  }

  private sortChange(data: any) {
    const { prop, order } = data

    this.query.sort_by = data.prop
    if (prop === 'title') {
      this.sortByTitle(order)
    }
  }

  private sortByTitle(type: string) {
    if (type === 'ascending') {
      this.query.sort_type = 'asc'
    } else if (type === 'descending') {
      this.query.sort_type = 'desc'
    } else {
      this.query.sort_type = null
      this.query.sort_by = null
    }
    this.handleFilter()
  }

  private handleUpdate(row: any) {
    this.selectedCustomer = Object.assign({}, row)
    this.editMode = true
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private handleDelete(row: ICustomer) {
    MessageBox.confirm(
      this.$t('customersView.deleteCustomerWarning').toString(),
      this.$t('messages.confirm').toString(),
      {
        confirmButtonText: this.$t('form.delete').toString(),
        cancelButtonText: this.$t('form.cancel').toString(),
        confirmButtonClass: 'el-button--danger',
        type: 'warning'
      }
    ).then(() => {
      this.deleteCustomer(row)
    })
  }

  private handleCreate() {
    this.editMode = false
    this.dialogFormVisible = true
    this.selectedCustomer = Object.assign({}, service.defaultCustomer)
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private getDialogTitle() {
    return this.editMode ? this.$t('customersView.updateCustomer')
      : this.$t('customersView.createCustomer')
  }

  private createCustomer() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        this.modalLoading = true
        service.createCustomer(this.selectedCustomer)
          .then(
            (resp) => {
              this.modalLoading = false
              this.selectedCustomer.id = resp.data
              this.selectedCustomer.created_at = new Date()
              const newCustomer = Object.assign({}, this.selectedCustomer)
              this.total += 1
              this.list.unshift(newCustomer)
              this.dialogFormVisible = false
              this.$notify({
                title: this.$t('messages.success').toString(),
                message: this.$t('messages.saved').toString(),
                type: 'success',
                duration: notificationDuration
              })
            },
            (err) => {
              console.error(err)
              this.modalLoading = false
            }
          )
      }
    })
  }

  private updateCustomer() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        this.modalLoading = true

        service.updateCustomer(this.selectedCustomer)
          .then(
            () => {
              this.modalLoading = false
              const index = this.list.findIndex(v => v.id === this.selectedCustomer.id)
              this.list.splice(index, 1, this.selectedCustomer)
              this.dialogFormVisible = false
              this.$notify({
                title: this.$t('messages.success').toString(),
                message: this.$t('messages.saved').toString(),
                type: 'success',
                duration: notificationDuration
              })
            },
            (err) => {
              console.error(err)
              this.modalLoading = false
            }
          )
      }
    })
  }

  private deleteCustomer(customer: ICustomer) {
    this.loading = true

    if (customer.id === null) {
      console.error('customer id cannot be null')
      return
    }

    service.deleteCustomer(customer.id)
      .then(
        () => {
          this.loading = false
          const index = this.list.findIndex(v => v.id === customer.id)
          this.total -= 1
          this.list.splice(index, 1)
          this.$notify({
            title: this.$t('messages.success').toString(),
            message: this.$t('messages.deleted').toString(),
            type: 'success',
            duration: notificationDuration
          })
        },
        (err) => {
          console.error(err)
          this.loading = false
        }
      )
  }

  private getDateStr(date: Date) {
    return getDateStr(date, this.$i18n.locale)
  }

  private getRemainingBalanceTooltip(row: ICustomer) {
    const customer = Object.assign({}, row)

    if (customer.remaining_balance === 0) {
      return this.$t('customersView.remainingBalanceTooltipZero', [customer.title])
    } else if (customer.remaining_balance < 0) {
      return this.$t('customersView.remainingBalanceTooltipReceivable', [customer.title, getPriceText(-customer.remaining_balance)])
    } else {
      return this.$t('customersView.remainingBalanceTooltipDebt', [customer.title, getPriceText(customer.remaining_balance)])
    }
  }
}

</script>
