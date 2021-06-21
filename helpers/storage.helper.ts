export const store = (key: string, data: string) => {
    localStorage.setItem(key, data);
}
export const get = (key: string) => {
    return localStorage.getItem(key);
}