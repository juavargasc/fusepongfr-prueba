export const BK_URL = 'https://fusepongbk.herokuapp.com/'

export const routes = {
    signup: 'auth/signup',
    login: 'auth/login',
    companyList: 'company/page/1',
    me: 'user/',
    project: 'project/item/'
}

export const fetcherfunc = async (url) => {
    return await fetch(url
        ,{
            agent: new (require("https").Agent)({
                rejectUnauthorized: false,
            })
        }
    )
}