import CryptoJs from "crypto-js"

export function hashedKey(data) {
    return CryptoJs.MD5(data).toString()
}