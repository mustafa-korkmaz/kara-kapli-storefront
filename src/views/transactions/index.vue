<template>
  <div class="page-container">
    <el-form
      ref="postForm"
      class="form-container"
      label-position="top"
    >
      <el-row>
        <el-col
          :xs="24"
          :sm="24"
          :md="8"
          :lg="8"
        >
          <el-form-item
            :label="$t('transactionsView.customer')"
            prop="customer.id"
          >
            <el-select
              v-model="selectedCustomerId"
              clearable
              :placeholder="$t('form.select')"
              style="width:100%"
            >
              <el-option
                v-for="customer in customerList"
                :key="customer.id"
                :label="customer.title"
                :value="customer.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="4"
          :lg="4"
        >
          <el-form-item
            :label="$t('transactionsView.transactionType')"
            prop="parameter_id"
          >
            <el-select
              v-model="selectedTransactionTypeId"
              clearable
              :placeholder="$t('form.select')"
            >
              <el-option
                v-for="parameter in parameterList"
                :key="parameter.id"
                :label="parameter.name"
                :value="parameter.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="4"
          :lg="4"
        >
          <el-form-item
            :label="$t('transactionTypesView.debtOrReceivableTooltip')"
            prop="is_debt"
          >
            <el-select
              v-model="isDebt"
              clearable
              :placeholder="$t('form.select')"
            >
              <el-option
                v-for="o in options"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              />
            </el-select>
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
      <table-menu
        :activate-column-selection-option="true"
        :column-selection-options="optionalColumns"
        @optionalColumnsChanged="optionalColumnsChanged"
        @excelExportClicked="excelExportClicked"
      />
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
          :label="$t('transactionsView.customer')"
          min-width="15"
          prop="title"
          sortable="custom"
        >
          <template slot-scope="{row}">
            <span>{{ row.customer.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('transactionsView.type')"
          min-width="10"
        >
          <template slot-scope="{row}">
            <span>{{ row.type.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="selectableOptionalColumns.desc"
          :label="$t('transactionsView.description')"
          min-width="14"
        >
          <template slot-scope="{row}">
            <span>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="selectableOptionalColumns.accountingType"
          min-width="8"
          align="center"
        >
          <template slot="header">
            <el-tooltip
              :content="$t('transactionTypesView.debtOrReceivableTooltip')"
              effect="dark"
              placement="right"
            >
              <span>{{ $t('transactionTypesView.debtOrReceivable') }}</span>
            </el-tooltip>
          </template>
          <template slot-scope="{row}">
            <span>{{ getAccountingTypeText(row.type.parameter_type_id) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('transactionsView.amount')"
          min-width="8"
          align="right"
        >
          <template
            slot-scope="{row}"
            text-align="right"
          >
            <span>{{ getPriceText(+row.amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="10"
          align="center"
        >
          <template slot="header">
            <el-tooltip
              :content="$t('transactionsView.dateTooltip')"
              effect="dark"
              placement="right"
            >
              <span>{{ $t('transactionsView.date') }}</span>
            </el-tooltip>
          </template>
          <template slot-scope="{row}">
            <span>{{ getDateStr(row.date) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="10"
          align="center"
        >
          <template slot="header">
            <el-tooltip
              :content="$t('table.createdAtTooltip')"
              effect="dark"
              placement="right"
            >
              <span>{{ $t('table.createdAt') }}</span>
            </el-tooltip>
          </template>
          <template slot-scope="{row}">
            <span>{{ getDatetimeStr(row.created_at) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="selectableOptionalColumns.modifiedAt"
          min-width="10"
          align="center"
        >
          <template slot="header">
            <el-tooltip
              :content="$t('table.modifiedAtTooltip')"
              effect="dark"
              placement="right"
            >
              <span>{{ $t('table.modifiedAt') }}</span>
            </el-tooltip>
          </template>
          <template slot-scope="{row}">
            <span>{{ getDatetimeStr(row.modified_at) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="showAttachmentsColumn"
          min-width="3"
          align="right"
        >
          <template
            slot-scope="{row}"
            text-align="right"
          >
            <el-tooltip
              v-if="row.attachment_name"
              :content="$t('transactionsView.downloadAttachment')"
              effect="dark"
              placement="top"
            >
              <a
                href="javascript:;"
                @click.prevent="downloadAttachment(row.attachment_name)"
              > <span><i class="el-icon-paperclip" /></span></a>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('tableActions.name')"
          align="center"
          min-width="12"
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
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        v-loading="modalLoading"
        :rules="rules"
        :model="selectedTransaction"
        label-position="top"
        label-width="100px"
      >
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
          >
            <el-form-item
              :label="$t('transactionsView.customer')"
              prop="customer_id"
            >
              <el-select
                v-model="selectedTransaction.customer_id"
                clearable
                :placeholder="$t('form.select')"
                style="width:100%"
                :disabled="editMode"
              >
                <el-option
                  v-for="customer in customerList"
                  :key="customer.id"
                  :label="customer.title"
                  :value="customer.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
            <el-form-item
              :label="$t('transactionsView.transactionType')"
              prop="type_id"
            >
              <el-select
                v-model="selectedTransaction.type_id"
                clearable
                :placeholder="$t('form.select')"
                style="width:100%"
              >
                <el-option
                  v-for="parameter in parameterList"
                  :key="parameter.id"
                  :label="parameter.name"
                  :value="parameter.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
          >
            <el-form-item
              :label="$t('transactionsView.amount')"
              prop="amount"
            >
              <el-input
                v-model="selectedTransaction.amount"
                type="number"
                :placeholder="$t('transactionsView.amountPlaceholder')"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="10"
            :lg="10"
          >
            <el-form-item
              :label="$t('transactionsView.dateTooltip')"
              prop="date"
            >
              <el-date-picker
                v-model="selectedTransaction.date"
                type="date"
                :placeholder="$t('form.selectDate')"
                :format="dateFormat"
              >
                />
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="20"
            :lg="20"
          >
            <el-form-item
              :label="$t('transactionsView.description')"
              prop="description"
            >
              <el-input
                v-model="selectedTransaction.description"
                type="textarea"
                :rows="2"
                :placeholder="$t('transactionsView.descriptionPlaceholder')"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="20"
            :lg="20"
          >
            <el-form-item :label="$t('transactionsView.attachment')">
              <file-upload
                :key="rerenderKey"
                :before-upload="beforeFileUpload"
                :on-success="onFileUploadSuccess"
                :existing-file-name="selectedTransaction.attachment_name"
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
          :loading="modalLoading"
          type="success"
          icon="el-icon-check"
          @click="editMode?updateTransaction():createTransaction()"
        >
          {{ $t('form.save') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as service from '@/api/transactions/transaction-service'
import { getCustomers, defaultCustomerQuery } from '@/api/customers/customer-service'
import { getPriceText, getDateFormat, getApiDateStr, getDateStr, getDatetimeStr, formatJson } from '@/utils/index'
import MaterialInput from '@/components/MaterialInput/index.vue'
import { MessageBox, Form } from 'element-ui'
import settings from '@/settings'
import Pagination from '@/components/Pagination/index.vue'
import TableMenu from '@/components/TableMenu/index.vue'
import { ParameterTypeId } from '@/utils/enums'
import { ITransaction } from '../../api/transactions/types'
import { ICustomer } from '../../api/customers/types'
import { getParameters, defaultParameterQuery } from '../../api/parameters/parameter-service'
import { IParameter } from '../../api/parameters/types'
import { exportJson2Excel } from '@/utils/excel'
import FileUpload from './components/FileUpload.vue'

const { notificationDuration, maxQueryLimit } = settings

@Component({
  name: 'Transaction',
  components: {
    MaterialInput,
    Pagination,
    TableMenu,
    FileUpload
  }
})
export default class extends Vue {
  private query = Object.assign({}, service.defaultTransactionQuery)
  private selectedTransaction = Object.assign({}, service.defaultTransaction)
  private attachment = Object.assign({}, service.defaultTransactionAttachment)
  private selectedCustomerId: number | null = null
  private selectedTransactionTypeId: number | null = null
  private isDebt: boolean | null = null
  private customerList: ICustomer[] = []
  private parameterList: IParameter[] = []
  private tableKey = 0
  private list: ITransaction[] = []
  private total = 0
  private page = 1
  private loading = true
  private modalLoading = false
  private editMode = false
  private dialogFormVisible = false
  private rules = {}
  private getPriceText = getPriceText
  private selectableOptionalColumns = {
    desc: false,
    modifiedAt: false,
    accountingType: true
  }

  private rerenderKey = 0
  private showAttachmentsColumn = false
  private autoWidth = true
  private bookType = 'xlsx'

  created() {
    this.rules = {
      amount: [{ required: true, message: this.amountRequired, trigger: 'change' }],
      date: [{ required: true, message: this.dateRequired, trigger: 'blur' }],
      type_id: [{ required: true, message: this.transactionTypeRequired, trigger: 'change' }],
      customer_id: [{ required: true, message: this.customerRequired, trigger: 'change' }]
    }

    this.setPage()
  }

  get fileName() {
    return this.$t('transactionsView.fileName').toString()
  }

  get dateFormat() {
    return getDateFormat(this.$i18n.locale)
  }

  get customerRequired() {
    return this.$t('transactionsView.customerRequired')
  }

  get transactionTypeRequired() {
    return this.$t('transactionsView.transactionTypeRequired')
  }

  get amountRequired() {
    return this.$t('transactionsView.amountRequired')
  }

  get dateRequired() {
    return this.$t('transactionsView.dateRequired')
  }

  get options() {
    return [{
      value: false,
      label: this.$t('transactionTypesView.receivable')
    }, {
      value: true,
      label: this.$t('transactionTypesView.debt')
    }]
  }

  get optionalColumns() {
    return [{
      value: 'description',
      label: this.$t('transactionsView.description')
    }, {
      value: 'modifiedAt',
      label: this.$t('table.modifiedAt')
    }, {
      value: 'accountingType',
      label: this.$t('transactionTypesView.debtOrReceivable')
    }]
  }

  private getList() {
    this.loading = true
    this.query.offset = (this.page - 1) * this.query.limit
    this.query.customer_id = this.selectedCustomerId
    this.query.type_id = this.selectedTransactionTypeId
    this.query.is_debt = this.isDebt

    service.getTransactions(this.query)
      .then(
        (resp) => {
          this.loading = false
          this.list = this.getPreparedList(resp.data.items)
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

  private handleUpdate(row: any) {
    this.selectedTransaction = Object.assign({}, row)
    this.editMode = true
    this.dialogFormVisible = true
    this.rerenderKey++ // refresh file upload component

    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private handleDelete(row: ITransaction) {
    MessageBox.confirm(
      this.$t('transactionsView.deleteTransactionWarning').toString(),
      this.$t('messages.confirm').toString(),
      {
        confirmButtonText: this.$t('form.delete').toString(),
        cancelButtonText: this.$t('form.cancel').toString(),
        confirmButtonClass: 'el-button--danger',
        type: 'warning'
      }
    ).then(() => {
      this.deleteTransaction(row)
    })
  }

  private handleCreate() {
    this.editMode = false
    this.dialogFormVisible = true
    this.rerenderKey++ // refresh file upload component
    this.selectedTransaction = Object.assign({}, service.defaultTransaction)
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private getDialogTitle() {
    return this.editMode ? this.$t('transactionsView.updateTransaction')
      : this.$t('transactionsView.createTransaction')
  }

  private createTransaction() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        this.modalLoading = true

        if (this.selectedTransaction.description === '') {
          this.selectedTransaction.description = null
        }

        this.selectedTransaction.date_text = getApiDateStr(this.selectedTransaction.date)

        const c = this.customerList.find(p => p.id === this.selectedTransaction.customer_id)
        const t = this.parameterList.find(p => p.id === this.selectedTransaction.type_id)

        if (c !== undefined) {
          this.selectedTransaction.customer.title = c.title
        }

        if (t !== undefined) {
          this.selectedTransaction.type.name = t.name
          this.selectedTransaction.type.parameter_type_id = t.parameter_type_id
        }

        const attachmentName = await this.getAttachmentName()

        if (attachmentName === 'error') {
          this.modalLoading = false
          this.$notify({
            title: this.$t('messages.error').toString(),
            message: this.$t('transactionsView.uploadFailed').toString(),
            type: 'error',
            duration: notificationDuration
          })
          return
        }

        this.selectedTransaction.attachment_name = attachmentName
        service.createTransaction(this.selectedTransaction)
          .then(
            (resp) => {
              this.modalLoading = false
              this.selectedTransaction.created_at = new Date()
              this.selectedTransaction.modified_at = new Date()
              this.selectedTransaction.id = resp.data
              this.total += 1
              this.list.unshift(this.selectedTransaction)
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
      } else {
        console.log('no valid')
      }
    })
  }

  private updateTransaction() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        this.modalLoading = true

        if (this.selectedTransaction.description === '') {
          this.selectedTransaction.description = null
        }

        this.selectedTransaction.date_text = getApiDateStr(this.selectedTransaction.date)

        const t = this.parameterList.find(p => p.id === this.selectedTransaction.type_id)

        if (t !== undefined) {
          this.selectedTransaction.type.name = t.name
          this.selectedTransaction.type.parameter_type_id = t.parameter_type_id
        }

        const attachmentName = await this.getAttachmentName()

        if (attachmentName === 'error') {
          this.modalLoading = false
          this.$notify({
            title: this.$t('messages.error').toString(),
            message: this.$t('transactionsView.uploadFailed').toString(),
            type: 'error',
            duration: notificationDuration
          })
          return
        }

        this.selectedTransaction.attachment_name = attachmentName

        service.updateTransaction(this.selectedTransaction)
          .then(
            () => {
              this.modalLoading = false
              const index = this.list.findIndex(v => v.id === this.selectedTransaction.id)
              this.selectedTransaction.modified_at = new Date()
              this.list.splice(index, 1, this.selectedTransaction)
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

  private deleteTransaction(txn: ITransaction) {
    this.loading = true

    service.deleteTransaction(txn.id)
      .then(
        () => {
          this.loading = false
          const index = this.list.findIndex(v => v.id === txn.id)
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

  private getAccountingTypeText(parameterTypeId: ParameterTypeId) {
    switch (parameterTypeId) {
      case ParameterTypeId.TransactionType_Receivable:
        return this.$t('transactionTypesView.receivable')
      case ParameterTypeId.TransactionType_Debt:
        return this.$t('transactionTypesView.debt')
    }
  }

  private optionalColumnsChanged(selectedOptionalColumns: string[]) {
    this.tableKey = this.tableKey + 1

    this.selectableOptionalColumns.desc = selectedOptionalColumns.find(p => p === 'description') !== undefined
    this.selectableOptionalColumns.modifiedAt = selectedOptionalColumns.find(p => p === 'modifiedAt') !== undefined
    this.selectableOptionalColumns.accountingType = selectedOptionalColumns.find(p => p === 'accountingType') !== undefined
  }

  private excelExportClicked() {
    const tHeader = [this.$t('transactionsView.customer').toString(),
      this.$t('transactionsView.type').toString(),
      this.$t('transactionsView.description').toString(),
      this.$t('transactionTypesView.debt').toString(),
      this.$t('transactionsView.amount').toString(),
      this.$t('transactionsView.date').toString(),
      this.$t('table.createdAt').toString(),
      this.$t('table.modifiedAt').toString()]

    const filterVal = ['customer.title', 'type.name', 'description', 'is_debt', 'amount', 'date', 'created_at', 'modified_at']

    const query = Object.assign({}, service.defaultTransactionQuery)

    query.offset = 0
    query.limit = maxQueryLimit
    query.include_records_total = false
    query.customer_id = this.selectedCustomerId
    query.type_id = this.selectedTransactionTypeId
    query.is_debt = this.isDebt

    this.loading = true
    service.getTransactions(query)
      .then(
        (resp) => {
          this.loading = false
          const list = resp.data.items
          const data = formatJson(filterVal, list, this.$i18n.locale)
          exportJson2Excel(tHeader, data, this.fileName, undefined, undefined, this.autoWidth, this.bookType)
        },
        (err) => {
          console.error(err)
          this.loading = false
        }
      )
  }

  private setPage() {
    this.query.customer_id = null

    if (this.$route.query.customerId != null) {
      const customerId = this.$route.query.customerId as string
      const parsed = parseInt(customerId)

      if (!isNaN(parsed)) {
        this.query.customer_id = +customerId
        this.selectedCustomerId = +customerId
      }
    }

    this.loading = true
    this.query.offset = 0
    this.query.is_debt = null

    const customerQuery = defaultCustomerQuery
    customerQuery.limit = maxQueryLimit
    customerQuery.include_records_total = false

    const parameterQuery = defaultParameterQuery
    parameterQuery.limit = maxQueryLimit
    parameterQuery.include_records_total = false

    const txnPromise = service.getTransactions(this.query)
    const txnTypesPromise = getParameters(parameterQuery)
    const customerPromise = getCustomers(customerQuery)

    Promise.all([txnPromise, txnTypesPromise, customerPromise]).then((values) => {
      this.loading = false
      this.list = this.getPreparedList(values[0].data.items)
      this.total = values[0].data.records_total
      this.parameterList = values[1].data.items
      this.customerList = values[2].data.items
    },
    (err) => {
      console.error(err)
      this.loading = false
    })
  }

  private getDateStr(date: Date) {
    return getDateStr(date, this.$i18n.locale)
  }

  private getDatetimeStr(date: Date) {
    return getDatetimeStr(date, this.$i18n.locale)
  }

  private getPreparedList(list: ITransaction[]): ITransaction[] {
    list.forEach(function(value) {
      value.type_id = value.type.id
      value.customer_id = value.customer.id
    })

    const predicate = (element: ITransaction | null) => element?.attachment_name !== null

    this.showAttachmentsColumn = list.some(predicate)
    return list
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

  private downloadAttachment(name: string) {
    this.loading = true

    service.downloadAttachment(name)
      .then(
        (resp) => {
          this.loading = false
          const fileURL = window.URL.createObjectURL(new Blob([resp]))
          const fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute('download', name)
          document.body.appendChild(fileLink)

          fileLink.click()
        },
        (err) => {
          console.error(err)
          this.loading = false
        }
      )
  }

  private beforeFileUpload(file: File) {
    const isLt5M = file.size / 1024 / 1024 < 5
    if (isLt5M) {
      return true
    }
    this.$message({
      message: this.$t('transactionsView.fileSizeExceeded').toString(),
      type: 'warning'
    })
    return false
  }

  private onFileUploadSuccess(fileName: string, file: File) {
    if (fileName === '_deleted') {
      this.attachment.name = null
      this.attachment.file = null
      this.selectedTransaction.attachment_name = null
      return
    }
    this.attachment.name = fileName
    this.attachment.file = file
  }

  private getAttachmentName() {
    switch (this.editMode) {
      case true: {
        if (this.attachment.name === null && this.selectedTransaction.attachment_name !== null) {
          return this.selectedTransaction.attachment_name // still same attachment is valid
        }

        if (this.attachment.name === null && this.selectedTransaction.attachment_name === null) {
          return null // attachment is deleted
        }
        break
      }
      default: {
        if (this.attachment.name === null) {
          return null
        }
        break
      }
    }

    if (this.attachment.file === null) {
      return 'error'
    }

    return service.uploadAttachment(this.attachment.file)
      .then(
        (resp) => {
          this.loading = false
          return resp.data
        },
        (err) => {
          console.error(err)
          this.loading = false
          return 'error'
        }
      )
  }
}
</script>
