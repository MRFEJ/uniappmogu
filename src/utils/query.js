const BASEURL = "http://192.168.1.79:3000/api/"

const query = ({ url = "", method = "GET", data = {}, tisName = "加载中..." }) => {
    const header = {
        Authorization: ""
    }
    if (uni.getStorageSync("my_token")) {
        header.Authorization = uni.getStorageSync("my_token")
    }
    uni.showLoading({
        title: tisName, //提示的内容,
        mask: true, //显示透明蒙层，防止触摸穿透,
    });
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${BASEURL}${url}`, //仅为示例，并非真实接口地址。
            method,
            data,
            header,
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            },
            complete: (res) => {
                uni.hideLoading()
            }
        });
    })
}

export default query