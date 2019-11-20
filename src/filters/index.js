/**
 * 联系状态过滤器
 * @function followStatusFilter
 * @param followStatus Number 联系状态
 */
export function followStatusFilter(followStatus) {
  switch (followStatus) {
    case 1:
      return '六级：很有兴趣'
      break;
    case 2:
      return '五级：较感兴趣/后续有需要/可加微信保持沟通'
      break;
    case 3:
      return '四级：晚点联系'
      break;
    case 4:
      return '二级：挂断/不回复/强硬抵触'
      break;
    case 5:
      return '三级：关机/未接通/可再拨打'
      break;
    case 6:
      return '一级：空号/无效/资料不符'
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
 * 时间过滤器
 * @function statusFilters
 * @param time Number 时间
 */
export function timeFilters(time) {
  if(time > 3600) {
    let hour = Math.floor(time / 3600)
    let minuter = Math.floor((time % 3600) / 60)
    let second = Math.floor(time % 60)
    return (hour > 9 ? hour : '0' + hour) + ':' + (minuter > 9 ? minuter : '0' + minuter) + ':' + (second > 9 ? second : '0' + second)
  } else {
    let minuter = Math.floor(time / 60)
    let second = Math.floor(time % 60)
    return (minuter > 9 ? minuter : '0' + minuter) + ':' + (second > 9 ? second : '0' + second)
  }
}

/**
 * 
 * @function demandStatusFilters
 * @param demandStatus Number 需求状态
 */
export function demandStatusFilters(demandStatus) {
  switch (demandStatus) {
    case 1:
      return '需求待分发'
      break;
    case 2:
      return '商户未响应'
      break;
    case 3:
      return '商户报价中'
      break;
    case 4:
      return '询价已结束'
      break;
  }
}

/**
 * 
 * @function inquiryFilters
 * @param status Number 询价单状态
 */
export function inquiryFilters(status) {
  switch (status) {
    case 1:
      return '报价中'
      break;
    case 2:
      return '超时未报价'
      break;
    case 3:
      return '已购买'
      break;
    case 4:
      return '反馈价格'
      break;
  }
}

/**
 * 
 * @function endResonFilters
 * @param endReson Number 询价单状态
 */
export function endResonFilters(endReson) {
  switch (endReson) {
    case 1:
      return '已经在对接中'
      break;
    case 2:
      return '已经处理好了'
      break;
    case 3:
      return '目前需要重新考虑'
      break;
    case 4:
      return '目前暂时不需要办理了'
      break;
    case 5:
      return '系统关闭'
      break;
    case 6:
      return '关机/停机/空号'
      break;
    case 7:
      return '入驻服务商'
      break;
    case 8:
      return '内部测试'
      break;
    case 9:
      return '表明来意被挂断'
      break;
  }
}
