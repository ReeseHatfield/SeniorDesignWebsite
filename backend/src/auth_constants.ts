// only a single user will ever be authed, dont bother storing in db
export const CORRECT_PW_HASH = "5822ee7f115dd6c762f6292eb50ee293"


// just give random hex for a session ID
export const genSessionID = (size: number) => {
    return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}