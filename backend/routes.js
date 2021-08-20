export const BK_URL = 'https://fusepongbk.herokuapp.com/'

export const routes = {
    signup: 'auth/signup',
    login: 'auth/login',
    companyList: 'company/page/1',
    me: 'user/',
    project: 'project/item/',
    userStorie: 'user-storie/item/',
    ticket: 'ticket/item/',
    comment: 'comment/item/',
    createStorie: 'user-storie/create',
    updateStorie: 'user-storie/update',
    createTicket: 'ticket/create',
    updateTicket: 'ticket/update',
    createComment: 'comment/create'
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