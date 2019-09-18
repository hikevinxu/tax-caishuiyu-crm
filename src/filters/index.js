/**
 * 联系状态过滤器
 * @function followStatusFilter
 * @param followStatus Number 联系状态
 */
export function followStatusFilter(followStatus) {
  switch (followStatus) {
    case 1:
      return '很有兴趣'
      break;
    case 2:
      return '较感兴趣'
      break;
    case 3:
      return '一般/可继续跟进'
      break;
    case 4:
      return '挂断/不回复/强硬抵触'
      break;
    case 5:
      return '关机/未接通/可再拨打'
      break;
    case 6:
      return '空号/无效/资料不符'
      break;
    case 7:
      return '完结需求'
      break;
    default: 
      return '无'
      break;
  }
}

/**
 * 启用-停用
 * @function statusFilters
 * @param status Number 状态码
 */
export function statusFilters(status) {
  switch (status) {
    case 0:
      return '已停用'
      break;
    case 1:
      return '已启用'
      break;
    default: 
      return ''
      break;
  }
}

/**
 * 上下架过滤器
 * @function 
 * @param status Number 上下架状态码
 */
export function shelfFilters(status) {
  switch (status) {
    case true:
      return '已上架'
      break;
    case false:
      return '已下架'
      break;
  }
}

/**
 * 上下架过滤器
 * @function statusFilters
 * @param status Number 上下架状态码
 */
export function validFilters(valid) {
  switch (valid) {
    case true:
      return '是'
      break;
    case false:
      return '否'
      break;
  }
}

/**
 * 
 * @function goTypeFilters
 * @param goType Number 跳转类型
 */
export function goTypeFilters(goType) {
  switch (goType) {
    case 1:
      return 'H5URL'
      break;
    case 2:
      return '原生'
      break;
    case 3:
      return '无跳转'
      break;
  }
}

/**
 * 原生页面过滤器
 * @function pageUrlFilters
 * @param status Number 上下架状态码
 */
export function pageUrlFilters(status) {
  switch (status) {
    case "main/home/queryService/company":
      return '公司详情页'
      break;
    case "main/home/queryService/servicer":
      return '服务详情页'
      break;
    default: 
      return ''
      break;
  }
}

