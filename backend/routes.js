export const BK_URL = 'http://localhost:4000/'

export const routes = {
    signup: 'auth/signup',
    login: 'auth/login',
    companyList: 'company/page/1'
}

export const fetcherfunc = async (url) => {
    return await fetch(url
        ,{
            // agent: new (require("https").Agent)({
            //     rejectUnauthorized: false,
            // })
        }
    )
}