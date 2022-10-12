import { statusErrorHandler } from './errors'

export const apiFetchSendCookie = async (url: string, method: string) => {
    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const { msg, error }: ApiStatusResponse = await res.json()
    // TODO: remove this log when tested
    if (msg == 'new_token') console.log('refreshed token')
    msg == 'new_token'
        ? apiFetchSendCookie(url, method)
        : statusErrorHandler({ msg, error })
    return statusErrorHandler({ msg, error })
}

export const apiFetchSendData = async (
    url: string,
    method: string,
    data: { [key: string]: string }
) => {
    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    const { msg, error }: ApiStatusResponse = await res.json()
    // TODO: remove this log when tested
    if (msg == 'new_token') console.log('refreshed token')
    msg == 'new_token'
        ? apiFetchSendCookie(url, method)
        : statusErrorHandler({ msg, error })
    return statusErrorHandler({ msg, error })
}
// FIXME: not working properly, returns invalid response
// export const apiFetchGetData = async (
//     url: string,
//     method: string,
//     data?: { [key: string]: string }
// ) => {
//     const res = await fetch(url, {
//         method: method,
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify(data)
//     })
//     let returnData = await res.json()
//     if (returnData.msg == 'new_token') {
//         console.log('refreshed token')
//         returnData = apiFetchGetData(url, method, data)
//     }
//     if (returnData.error != 0) {
//         const { msg, error }: ApiStatusResponse = returnData
//         console.log('errored' + error)
//         console.log(`send: ${method} ${url} ${data}`)
//         console.log(`got: ${JSON.stringify(returnData)}`)
//         return statusErrorHandler({ msg, error })
//     }
//     return returnData
// }