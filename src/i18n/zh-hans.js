/* eslint-disable */

export default {
  misc: {
    pls_wait: '请稍候...',
    loading: '正在加载',
    unknow_error: '发生未知错误，请刷新后重试',
    fetch_data_fail: '部分数据获取失败，可能是网络断开，请刷新重试',
    save_fail: '保存失败，请刷新重试',
    delete_fail: '删除失败，请刷新重试',
    search: '查询',
    confirm: '确认',
    close: '关闭',
    view: '查看',
    modify: '修改',
    edit: '编辑',
    manage: '管理',
    add: '添加',
    delete: '删除',
    save: '保存',
    cancel: '取消',
    unit: '单位',
    filter_options: '过滤条件',
    title: '标题',
    icon: '图标',
    name: '名称',
    type: '类型',
    description: '介绍',
    state: '状态',
    operation: '操作',
    empty: '无',
    not_set: '未设置',

    next_step: '下一步',
    previous_step: '上一步'
/*
$t('misc.')
{{$t('misc.')}}
*/
  },

  app: {
    area: {
      cn: '中国区域',
      na: '北美区域'
    },
    lang: '语言',
    lang_options: {
      zh_cn: '中文',
      en_us: '英语'
    },
    timezone: '时区',

    console_footer: 'Eva Cloud developer console',
    icp_license: '网站备案号: 12312412321523 公司信息'
  },

  nav: {
    dashboard: '仪表盘',

    product_definition: '产品定义',
    device_manage: '设备管理',
    user_list: '用户列表',
    user_feedback: '用户反馈',

    processing: '运营',
    documentation: '文档'
  },

  auth: {
    login: '登陆',
    logout: '注销',
    email: '邮箱',
    pwd: '密码',
    repeat_pwd: '重复密码',
    forgot: '忘记密码？',
    no_account: '还没有账户？',
    has_account: '已经有一个账号了？',
    go_register: '注册一个',
    register: '注册',
    change_pwd: '修改密码',

    email_format_wrong: '邮箱格式错误，请检查后再试',
    pwd_format_wrong: '密码格式错误，至少需要8位，包含小写字母及数字',
    rpwd_not_match: '两次密码输入不一致，请检查后再试',
    account_not_exist: '用户不存在',
    credential_wrong: '邮箱或密码错误',
    email_taken: '该邮箱已经注册',

    go_verify_email: '一封包含验证链接的邮件已经发送到您填写的邮箱，请查看邮件并跟随邮件内指引操作。',
    verify_success: '邮箱验证成功',
    go_login_2: '前往登陆',
    go_login_1: '您的邮箱已经验证成功，请',
    verify_failed: '邮箱验证出错',
    verify_failed_msg: '您的邮箱验证失败，可能是由验证链接过期或复制不完整导致，请检查链接是否复制正确，或于登录后点击右上角头像重发。',
    resent_verify_email: '重发验证邮件',
    resent_success: '发送成功',
    wait_for_cd: '请等待倒计时结束后再次发送',
    might_cd_wrong: '发送验证邮件失败，可能是网络断开或请求过于频繁，请稍后再试',

    retrive_pwd: '找回密码',
    input_retrive_email: '请输入要找回密码的邮箱',
    go_retrive_email: '一封包含重置链接的邮件已经发送到您填写的邮箱，请查看邮件并跟随邮件内指引操作。',
    not_registed: '没有该邮箱的注册记录',
    send_reset_link: '发送重置密码链接',
    reset_success: '密码重置成功，请',
    relogin: '重新登陆',
    reset_pwd: '重置密码',

    change_pwd_success: '修改密码成功！',
    old_pwd: '旧密码：',
    new_pwd: '新密码：',
    repeat_new_pwd: '重复新密码：',
    input_old_pwd: '请输入旧密码',
    input_new_pwd: '请输入新密码',
    input_new_pwd_again: '请再次输入新密码'
  },

  dashboard: {
    today_new_device: '新激活设备（今日）',
    today_active_device: '在线设备',
    today_increase_user: '新增用户（今日）',
    today_total_user: '总用户数',

    select_time: '选择时间周期：',
    week: '过去7天',
    month: '过去30天',

    chart_fail: '图表模块加载失败，请刷新重试',

    device_increase: '新增设备',
    device_active: '活跃设备',
    device_total: '总设备',
    user_increase: '新增用户',
    user_active: '活跃用户',
    user_total: '总用户',

    report: '报表',
    download_report: '下载报表（CSV）',
    date: '日期'
  },

  device_manage: {
    product: '产品',
    p_all_product: '所有产品',
    p_band: '手环',
    p_weight: '体重秤',
    is_active: '是否激活',
    user_phone: '用户手机',
    union_id: '出厂ID',
    device_id: '设备ID',

    device_list: '设备列表',
    device_icon: '设备图标',
    belong_product: '所属产品',
    belong_user: '所属用户',
    binding_state: '绑定状态',

    binding_state_1: '于',
    binding_state_2: '绑定',
    binding_state_3: '解绑'
  },

  user_manage: {
    user_id: '用户ID',
    user_list: '用户列表',
    register_date: '注册时间'
  },

  feedback_manage: {
    type: '反馈类型',
    t_all: '所有类型',
    t_question: '咨询',
    t_thanks: '感谢',
    t_complain: '投诉',
    t_error: '报错',
    is_handled: '是否已处理',

    feedback_list: '用户反馈列表',
    feedback_date: '反馈时间',
    handle_date: '处理时间'
  },

  product_definition: {
    product_definition: '产品定义',
    develop: '开发调试',
    production: '批量投产',

    create_product: '创建产品',
    quick_create: '或快速创建',

    product_list: '产品列表',
    network_type: '联网类型',

    credential: '凭据',
    union_id: 'Union ID',
    secrect_key: 'Secrect Key',

    std_func: '标准功能',
    custom_func: '自定义功能',

    std_data: '标准数据',
    custom_data: '自定义数据',

    debug_device: '调试设备',
    buy_dev_device: '购买开发设备',
    buy_module: '购买模块',

    choose_module: '选择模块',
    buy_quantity: '采购数量',
    shipping_info: '收货信息',

    shipping_name: '收货人姓名',
    shipping_phone: '联系电话',
    shipping_addr: '收货地址',

    submit_buy_request: '提交采购申请',

    basic_info: {
      edit_info: '编辑产品信息',
      product_model: '产品型号',
      product_model_desc: '可按产品实际型号输入',
      firmware_version: '固件版本',
      product_firmware_version_desc: '请填写产品的固件版本信息',
      module_model: '模组型号',
      desc_description: '如产品特点，销售地区，创建人等',

      load_fail: '加载失败',
      upload_fail: '上传失败',
      unknow_error: '未知错误',
      select_icon: '选择图标'
    },

    func: {
      name: '功能点',
      trans_type: '数据传输类型',
      type: '功能点类型',
      prop: '功能点属性',

      datatype: {
        enum: '枚举值',
        value: '数值',
        value_1: '数值：从#{dataType.startValue}到#{dataType.endValue}，间隔#{dataType.interval}，倍数#{dataType.multiple}',
        bool: '布尔',
        string: '字符串'
      }
    }
  }
/*
$t('dashboard.')
{{$t('dashboard.')}}
*/
}
