const dateFormat = (val) => {
    const date = new Date(val);
    const YY = date.getFullYear() + '/';
    const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1 ) + '/';
    const dd = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    const hh = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    const mm = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    // const ss = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
    return YY + MM + dd + hh + mm;
}

const timeFormat = (val) => {
    const date = new Date(val);
    const hh = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    const mm = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    // const ss = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
    return hh + mm;
}

const dateFormatString = (date, type = 0) => {
    if (type === 0) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`.replace(/\b(\w)\b/g, '0$1')
    }

    if (type === 1) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`.replace(/\b(\w)\b/g, '0$1')
    }
}

const downloadExcel = (data) => {
    function downloadExcel(json, type) {
        const tmp = json[0]
        const keyMap = []

        json.unshift({})

        Object.keys(tmp).forEach((key) => {
            keyMap.push(key)
            json[0][key] = key
        })

        const tmpdata = []

        json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
            v: v[k],
            position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
            v: v.v
        })

        const outputPos = Object.keys(tmpdata)
        const tmpWB = {
            SheetNames: ['mySheet'],
            Sheets: {
                'mySheet': Object.assign({},
                tmpdata,
                {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1]
                })
            }
        };
        const tmpDown = new Blob([s2ab(XLSX.write(tmpWB, {
            bookType: (type == undefined ? 'xlsx' : type),
            bookSST: false,
            type: 'binary'
        }))], {
            type: ""
        })

        const a  = document.createElement('a')

        a.download = 'aa.xlsx'
        a.href = URL.createObjectURL(tmpDown)
        a.click()

        URL.revokeObjectURL(tmpDown)
    }

    function s2ab(s) {
        const view = new Uint8Array(s.length)

        for (let i = 0; i != s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF
        }

        return view.buffer
    }

    // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    function getCharCol(n) {
        let temCol = '',
            s = '',
            m = 0

        while (n > 0) {
            m = n % 26 + 1
            s = String.fromCharCode(m + 64) + s
            n = (n - m) / 26
        }

        return s
    }

    downloadExcel(data)
}

function updatePosition(rect, popover, offsetX = 20, offsetY = 20) {
    const {x, y, bottom} = rect
    const width = popover.offsetWidth
    const height = popover.offsetHeight

    // 240 aside width
    // 72 header heigth
    popover.style.transformOrigin = '100% 0'
    popover.style.left = `${x - width - offsetX - 240}px`
    popover.style.top = `${y + offsetY - 72 + (document.scrollingElement && document.documentElement).scrollTop}px`

    if (bottom + height + 40 > innerHeight) {
        popover.style.transformOrigin = '100% 100%'
        popover.style.top = `${y - height - 72 + (document.scrollingElement && document.documentElement).scrollTop}px`
    }
}

export {dateFormat, timeFormat, dateFormatString, downloadExcel, updatePosition}