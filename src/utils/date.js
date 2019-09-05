
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};


function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};

//获取最近几天的开始和结束时间
export function getRecentDateStartEnd(dates) {
    if (!dates) dates = 0;
    var now = new Date().getTime();
    var start = new Date(now);
    start.setDate(start.getDate() - dates)
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    const end = new Date(now);
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);
    return {start: start, end: end}
}


//获取几天前的开始和结束时间
export function getDateStartEnd(dates) {
    if (!dates) dates = 0;
    var start = new Date();
    start.setDate(start.getDate() - dates)
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    return {start: start, end: new Date(start.getTime() + 86399000)}
}

export function datePickInfo() {
    return  [{
            text: '今天',
            onClick(picker) {
                var dates = getDateStartEnd()
                picker.$emit('pick', [dates.start, dates.end]);
            }
        }, {
            text: '昨天',
            onClick(picker) {
                var dates = getDateStartEnd(1)
                picker.$emit('pick', [dates.start, dates.end]);
            }
        }, {
            text: '最近3天',
            onClick(picker) {
                var dates = getRecentDateStartEnd(3)
                picker.$emit('pick', [dates.start, dates.end]);
            }
        }, {
            text: '最近7天',
            onClick(picker) {
                var dates = getRecentDateStartEnd(7)
                picker.$emit('pick', [dates.start, dates.end]);
            }
        }, {
            text: '最近30天',
            onClick(picker) {
                var dates = getRecentDateStartEnd(30)
                picker.$emit('pick', [dates.start, dates.end]);
            }
        }]
}
