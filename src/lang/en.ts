export default {
  site: {
    title: 'koruq accounting app'
  },
  route: {
    dashboard: 'Dashboard',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'Mixin',
    backToTop: 'Back To Top',
    draggableDialog: 'Draggable Dialog',
    draggableKanban: 'Draggable Kanban',
    draggableList: 'Draggable List',
    draggableSelect: 'Draggable Select',
    charts: 'Charts',
    barChart: 'Bar Chart',
    lineChart: 'Line Chart',
    mixedChart: 'Mixed Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    table: 'Table',
    dynamicTable: 'Dynamic Table',
    draggableTable: 'Draggable Table',
    inlineEditTable: 'Inline Edit Table',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboard: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    profile: 'Profile',
    adminSettings: 'Admin Settings',
    customers: 'Customers',
    transactions: 'Transactions',
    settings: 'Settings',
    transactionTypes: 'Transaction Types',
    dataImport:'Data import',
    themePreferences: 'Theme Preferences',
    transactionTypesTooltip: 'You can set your own types for any kind of transaction'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    theme: 'Theme',
    size: 'Global Size',
    profile: 'Profile',
    language: 'Language'
  },
  login: {
    title: 'Login Form',
    logIn: 'Login',
    tryDemo: 'Try Demo',
    username: 'Username',
    email: 'Email',
    emailRequired: 'Please input correct email address',
    or: 'OR',
    facebook: 'Login with Facebook',
    gmail: 'Login with Google',
    register: 'Sign up for free',
    password: 'Password',
    passwordRequired: 'The password can not be less than 6 digits',
    forgotPassword: 'Forgot password?',
    comingSoon: 'Coming soon!',
    any: 'any',
    capsLockOn: 'Caps lock is On',
    socialLoginSuccess: 'Social media login succeeded, you are being directed to home page',
  },
  signup: {
    title: 'Register Form',
    logIn: 'Already have an account?  Log in',
    submit: 'Sign up',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    passwordConfirmationRequired: 'Password does not match',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  forgotPassword: {
    title: 'Reset Password',
    logIn: 'Go to Login page',
    submit: 'Send login link',
    email: 'Email',
    resetPasswordLinkSent: 'We sent your password reset link to {0}'
  },
  resetPassword: {
    title: 'Reset Password',
    logIn: 'Go to Login page',
    submit: 'Send',
    password: 'New password',
    securityCodeNotFound: 'Security code not found, please try to reset your password again',
    saved: 'Your new password has been saved. You are being redirected to login page'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    createRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  roles: {
    demo_user: 'Demo user',
    admin: 'Admin',
    user: 'Standart user'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.',
    changeLanguageTips: 'Switch Language Success'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Importance',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'Reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    createdAt: 'Created at',
    createdAtTooltip: 'Created date',
    modifiedAt: 'Modified at',
    modifiedAtTooltip: 'Last modified date',
    selectColumns: 'Select columns',
    menu: 'Table menu',
    showColumnSelectionOptions: 'Show column selector',
    hideColumnSelectionOptions: 'Hide column selector',
    exportToExcel: 'Export to Excel'
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive\'s \'include\' currently does not support caching based on routes, so now it\'s cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or don\'t use keep-alive\'s \'include\' to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme color',
    showTagsView: 'Open tags-view',
    showSidebarLogo: 'Sidebar logo',
    fixedHeader: 'Fixed header',
    sidebarTextTheme: 'Sidebar text theme',
    paginationAlign: 'Align table pagination to',
    paginationAlignLeft: 'Left bottom',
    paginationAlignRight: 'Right bottom'
  },
  messages: {
    languageModified: 'Language is set to English',
    success: 'Success',
    confirm: 'Do you want to continue?',
    saved: 'Saved successfully',
    deleted: 'Record has been deleted.',
    error: 'Error'
  },
  form: {
    search: 'Search',
    save: 'Save',
    saveChanges: 'Save changes',
    cancel: 'Cancel',
    approve: 'Approve',
    create: 'Create',
    delete: 'Delete',
    select: 'Select',
    selectDate: 'Pick a date'
  },
  tableActions: {
    name: 'Actions',
    edit: 'Edit',
    delete: 'Delete'
  },
  fileUpload:{
    fileAmountExceeded:'Only 1 file upload is supported.',
    unsupportedFile:'Only supports upload .xlsx, .xls, .csv suffix files'
  },
  dashboardView: {
    goodMorning: 'Good morning,',
    goodDay: 'Good day,',
    goodEvening: 'Good evening,',
    boss: 'boss!',
    membership: 'Membership',
    membershipCreatedAt: 'Member since: ',
    membershipExpiresAt: 'Expire date: ',
    leftDays: 'Remaining days: ',
    customers: 'Customers',
    receivablesTotal: 'Customer Receivables',
    debtsTotal: 'Customer Debts',
    transactionTotal: 'Transaction Count',
    lastUpdated: 'Last updated at'
  },
  customersView: {
    title: 'Title',
    authorizedPersonName: 'Authorized person',
    phoneNumber: 'Phone',
    receivablesAmount: 'Receivables',
    debtsAmount: 'Debts',
    remainingBalance: 'Balance',
    remainingBalanceTooltipDebt: '{0} owes you {1}',
    remainingBalanceTooltipReceivable: '{0} will receive {1} from you',
    remainingBalanceTooltipZero: 'For {0}, debts and receivables aggregrate are equal',
    createdAt: 'Created at',
    modifiedAt: 'Modified at',
    goToTransactions: 'Go to transactions',
    createCustomer: 'Create customer',
    updateCustomer: 'Edit customer',
    titleRequired: 'Title field is required',
    deleteCustomerWarning: 'Customer information and transactions will be deleted permanantly',
    titlePlaceholder: 'Owner or company name'
  },
  transactionTypesView: {
    name: 'Name',
    namePlaceholder: 'Invoice, bill, etc.',
    debtOrReceivable: 'R/D?',
    debtOrReceivableTooltip: 'Receivable/Debt',
    order: 'Display order',
    orderLabelTooltip: 'Pass 0 if you want alphabetically',
    actions: 'Actions',
    nameRequired: 'Name field is required',
    debtOrReceivableRequired: 'Debt/Receivable field is required',
    orderRequired: 'Display order field is required',
    deleteParameterWarning: 'Transaction type will be deleted permanantly',
    updateTransactionType: 'Edit transaction type',
    createTransactionType: 'Create transaction type',
    receivable: 'Receivable',
    debt: 'Debt',
    debtOrReceivableDescription1: 'Muhasebe terimi olarak, alan hesap borçludur veren hesap alacaklıdır.',
    debtOrReceivableDescription2: 'Fatura, çek, senet gibi evrakları da para gibi düşünebilirsiniz.',
    debtOrReceivableDescription3: 'Fatura benzeri bir işlem tanımlarken "Borç" seçmelisiniz çünkü faturayı alan taraf cari olduğu için fatura kaydı sonucunda cari borçlanır.',
    debtOrReceivableDescription4: 'Tahsilat benzeri bir işlem tanımlarken "Alacak" seçmelisiniz çünkü parayı veren taraf cari olduğu için işlem sonucunda cari alacaklı olur.'
  },
  transactionsView: {
    transactionType: 'Transaction type',
    customer: 'Customer',
    type: 'Type',
    amount: 'Amount',
    amountPlaceholder: 'Transaction amount',
    date: 'Date',
    description: 'Description',
    descriptionPlaceholder: 'Transaction description',
    dateTooltip: 'Transaction date',
    createTransaction: 'Create transaction',
    updateTransaction: 'Update transaction',
    customerRequired: 'Customer field is required',
    transactionTypeRequired: 'Transaction type field is required',
    amountRequired: 'Amount field is required',
    dateRequired: 'Transaction date field is required',
    deleteTransactionWarning: 'Transaction will be deleted permanantly',
    fileName: 'transactions',
    downloadAttachment: 'Download attachment',
    fileUploadDescription: 'Drop file here or',
    browse: 'Browse',
    browseAnother: 'Browse another file',
    attachment: 'Attachment',
    fileSizeExceeded:'Max 5mb file size is supported',
    fileAmountExceeded:'Only 1 file upload is supported. You can try uploading .zip or .rar files for more',
    uploadFailed: 'Unexpected problem occured while uploading attachment'
  },
  profileView: {
    account: 'Account',
    changePassword: 'Change password',
    password: 'Password',
    newPassword: 'New password',
    title: 'Title',
    authorizedPersonName: 'Authorized Person'
  },
  paidUserErrorView: {
    title: 'Premium subscription is required!',
    description: 'This action requires a Premium account',
    action: 'How can I claim a Premium account?',
  },
  dataImportView: {
    basicTemplateName:'basic-import-template.xlsx',
    detailedTemplateName:'detailed-import-template.xlsx',
    basicTabTitle: 'Basic',
    detailedTabTitle: 'Detailed',
    basic: 'Basic import',
    detailed: 'Detailed import',
    downloadTemplate: 'Download template',
    basicImportTooltip1:'Basic import creates only 2 transactions for your each customer which are typed as \'Receivable\' and \'Debt\'.',
    basicImportTooltip2:'If you don\'t need all of the transactions in details for your each customer, you may prefer this method in order to avoid unnecessary paperwork.',
    detailedImportTooltip1:'In detailed import, every row inside the template is being considered as a transaction.',
    detailedImportTooltip2:'You may prefer this method when you need all transactions for your each customer.'
  },
  errorMessages: {
    sessionTimeOut: 'Your session has expired. You are being redirected to login page',
    socialMediaProviderFailure:'Social media login has failed, please try to login with your credentials or try again later',
    USER_NOT_FOUND: 'User not found',
    PHONE_NUMBER_FIELD_SHOULD_BE_MIN_10_MAX_12_CHARS: 'Phone number should contain between 10 and 12 chars',
    AUTHORIZED_PERSON_NAME_FIELD_SHOULD_BE_MIN_3_MAX_50_CHARS: 'Authorized person name should contain between 3 and 50 chars',
    UNEXPECTED_ERROR: 'Something went wrong, please try again later',
    PARAMETER_NAME_FIELD_SHOULD_BE_MIN_3_MAX_100_CHARS: 'Name should be min 3 max 100 chars',
    PARAMETER_NAME_FIELD_IS_REQUIRED: 'Name field is required',
    CUSTOMER_ID_FIELD_SHOULD_BE_BETWEEN_1_AND_2147483647: 'CustomerId should be an integer',
    USERNAME_OR_PASSWORD_INCORRECT: 'Username or password is incorrect',
    DATE_TEXT_FIELD_IS_REQUIRED: 'Date field is required',
    EMAIL_FIELD_SHOULD_BE_MAX_50_CHARS: 'Email should be max 50 chars',
    USER_ALREADY_EXISTS: 'There is already an account using this email',
    TITLE_FIELD_SHOULD_BE_MIN_3_MAX_100_CHARS: 'Title should be min 3 max 100 chars',
    SECURITY_CODE_EXPIRED: 'Security code has expired, please try to reset your password again',
    SECURITY_ERROR: 'Security code is invalid, please try to reset your password again',
    DESCRIPTION_FIELD_SHOULD_BE_MIN_3_MAX_250_CHARS: 'DEscription should be min 3 max 100 chars'
  }
}
