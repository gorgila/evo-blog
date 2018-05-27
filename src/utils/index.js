import Vue from 'vue'
import ls from 'store2'

export const inBrowser = typeof window !== 'undefined'

export const ua = () => {
    const userAgentInfo = inBrowser ? navigator.userAgent : ''
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
    let flag = 'PC'
    for (let a = 0; a < Agents.length; a++) {
        if (userAgentInfo.indexOf(Agents[a]) > 0) {
            flag = Agents[a]
            break
        }
    }
    return flag
}

export const ssp = path => {
    if (!inBrowser) return

    const clientHeight = document.documentElement.clientHeight,
        scrollTop = ls.get(path)

    if (scrollTop) {
        Vue.nextTick().then(() => {
            if (document.body.clientHeight >= scrollTop + clientHeight) {
                window.scrollTo(0, scrollTop)
            }
            ls.remove(path)
        })
    }
}

export const strlen = str => {
    let charCode = -1
    const len = str.length
    let readLength = 0

    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
            readLength += 1
        } else {
            readLength += 2
        }
    }

    return readLength
}