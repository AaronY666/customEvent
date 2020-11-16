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


export function packageEvent(e) {
    let touchEvent = e.changedTouches?.[0];
    if (!touchEvent) {
        return false;
    }
    for (let key in touchEvent) {
        if (e[key] === undefined) {
            e[key] = touchEvent[key];
        }
    }
}