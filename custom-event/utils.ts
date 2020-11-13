export function isMobile(): boolean {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return true;

    } else {
        return false;
    }
};

export function isObject(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
};