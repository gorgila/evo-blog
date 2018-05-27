const pluralize = (time, label) => time + label

export const timeAgo = time => {
    const preg = /^[\d]+$/
    const timestamp = preg.test(time)

    if (!timestamp) {
        time = Date.parse(time) / 1000
    }

    const between = Date.now() / 1000 - Number(time)
    if (between < 60) {
        return 'now'
    } else if (between < 3600) {
        return pluralize(parseInt(between / 10, 10), ' minutes before')
    } else if (between < 8640) {
        return pluralize(parseInt(between / 3600, 10), ' hours before')
    }
    return pluralize(parseInt(between / 86400, 10) === 0 ? 1 : parseInt(between / 86400, 10), 'days before')
}

export const timeYmd = timestamp => {
    const preg = /^[\d]+$/
    const isTimestamp = preg.test(timestamp)
    if (!isTimestamp) {
        let time = Date.parse(timestamp)
        time /= 1000
        timestamp = time
    }

    const tmp = new Date(timestamp * 1000)
    const year = tmp.getFullYear()
    const mouth = tmp.getMonth() + 1
    const day = tmp.getDate()
    return year + '-' + (mouth < 10 ? '0' + mouth : mouth) + '-' + (day < 10 ? '0' + day : day)
}