const global = {
  // 跟进状态
  followStatusList: [
    {name: '六级：很有兴趣', id: 1},
    {name: '五级：较感兴趣/后续有需要/可加微信保持沟通', id: 2},
    {name: '四级：晚点联系', id: 3},
    {name: '三级：关机/未接通/可再拨打', id: 5},
    {name: '二级：挂断/不回复/强硬抵触', id: 4},
    {name: '一级：空号/无效/资料不符', id: 6}
  ],
  // 沟通详情
  communicationStatus: [
    {name: '没有金币', id: 1},
    {name: '不在服务区域', id: 2},
    {name: '业务操作不了', id: 3},
    {name: '不感兴趣（备注：利润低、距离远、操作繁琐等）', id: 4},
    {name: '没有看到', id: 5},
    {name: '没有绑定公众号', id: 6},
    {name: '没联系上', id: 7}
  ],
  // 跟进次数
  followUpCountList: [
    {name: '0次', id: 0},
    {name: '1次', id: 1},
    {name: '2次', id: 2},
    {name: '3次', id: 3},
    {name: '4次', id: 4},
    {name: '5次', id: 5},
    {name: '6次', id: 6}
  ],
  // 上架状态
  statusList: [
    {name: '待上架',id: 0},
    {name: '已上架',id: 1}
  ],
  // 结束原因
  endDemandReason: [
    {name: '已经在对接中',id: 1},
    {name: '已经处理好了',id: 2},
    {name: '目前需要重新考虑',id: 3},
    {name: '目前暂时不需要办理了',id: 4},
    {name: '关机/停机/空号',id: 6},
    {name: '入驻服务商',id: 7},
    {name: '内部测试',id: 8},
    {name: '表明来意被挂断',id: 9}
  ],
  // 询价状态
  inqueryStatus: [
    {name: '报价中',id: 1},
    {name: '超时未报价',id: 2},
    {name: '已购买',id: 3},
    {name: '反馈价格',id: 4}
  ],
  // 处理状态
  visitTypeStatus: [
    {name: '未回访',id: 1},
    {name: '已回访',id: 2}
  ],
  // 需求状态
  demandStatus: [
    {name: '无效需求',id: -1},
    {name: '待预审',id: 0},
    {name: '需求待分发',id: 1},
    {name: '商户未响应',id: 2},
    {name: '商户报价中',id: 3},
    {name: '询价已结束',id: 4}
  ]
}
export default global
