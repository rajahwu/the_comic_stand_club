import { hashedKey } from "./md5hash"

const publicAPIKEY = process.env.REACT_APP_PUBLIC_MARVEL_API_KEY
const privateAPIKEY = process.env.REACT_APP_PRIVATE_MARVEL_API_KEY

const marvelAPIKeys = {
    public: publicAPIKEY,
    private: privateAPIKEY
}

const timeStamp = Date.now()

const hashedParam = hashedKey(timeStamp + marvelAPIKeys.private + marvelAPIKeys.public)

export const MARVEL_API_KEY = `ts=${timeStamp}&apikey=${marvelAPIKeys.public}&hash=${hashedParam}`
