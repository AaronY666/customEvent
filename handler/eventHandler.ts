import { isMobile, packageEvent } from "../common/utils"

export function pointDownHandler(e: MouseEvent | TouchEvent) {
    //合成event事件
    this._packageEvent(e);

    // this._mouseUpItem = null;
    this._mouseDownItem = this.getTarget(e);
    this._startX = (e as MouseEvent).clientX;
    this._startY = (e as MouseEvent).clientY;

    //mousedown事件都会触发
    this.onPointDown?.(e);

    if (isMobile()) {
        //移动端处理右键事件
        this._rightClickTimer = setTimeout(() => {
            this.onRightClick?.(e);
            this._mouseDownItem = null;
        }, 500);


    } else {
        //pc端处理右键事件
        if ((<MouseEvent>e).button === 2) {
            this._rightClickItem = this.getTarget(e);
        }

    }
}

export function pointMoveHandler(e: MouseEvent | TouchEvent) {
    //合成event事件
    this._packageEvent(e);

    this.onPointMove?.(e);

    //移动后取消移动端右键事件
    const moveX = Math.abs((e as MouseEvent).clientX - this._startX);
    const moveY = Math.abs((e as MouseEvent).clientY - this._startY);
    if (moveX > 5 || moveY > 5) {
        clearTimeout(this._rightClickTimer);
        if (isMobile()) {
            this._mouseDownItem = null;
        }
    }
}

export function pointUpHandler(e: MouseEvent | TouchEvent, onClickCallback) {
    //合成event事件
    this._packageEvent(e);

    //mousedown事件都会触发
    this._mouseUpItem = this.getTarget(e);
    this.onPointUp?.(e);
    clearTimeout(this._rightClickTimer);

    //右键mouseup
    if (this.getTarget(e) === this._rightClickItem && (<MouseEvent>e).button === 2) {

        this.onRightClick?.(e);
    } else if (this._mouseDownItem === this._mouseUpItem) {
        clickHandler(e, onClickCallback);
    }
    this._rightClickItem = null;


}

function clickHandler(e: MouseEvent | TouchEvent,onClickCallback) {
    //合成event事件
    this._packageEvent(e);

    //判断单击还是双击
    clearTimeout(this._clickTimer);


    if (this.getTarget(e) === this._clickItem) {
        //双击事件 
        this._clickItem = null;
        setTimeout(() => {
            this.onDoubleClick?.(e);
        })
    } else if (this._mouseDownItem === this._mouseUpItem) {
        //单击事件
        this._clickItem = this.getTarget(e);
        setTimeout(() => {
            onClickCallback?.(e);
        })
    }

    this._mouseDownItem = null;
    this._mouseUpItem = null;
    this._clickTimer = setTimeout(() => {
        this._clickItem = null;
    }, 500)


}

export function mouseOverHandler(e: MouseEvent) {
    if (isMobile()) {
        return;
    }

    let fromElement = e['fromElement'];
    if (fromElement === undefined) {
        fromElement = e.relatedTarget
    }
    let toElement = e['toElement'];
    if (toElement === undefined) {
        toElement = e.target
    }
    if (this.getTarget(e, fromElement) !== this.getTarget(e, toElement)) {

        this.onPointOver?.(e);
    }
}

export function mouseOutHandler(e: MouseEvent) {
    if (isMobile()) {
        return;
    }
    let fromElement = e['fromElement'];
    if (fromElement === undefined) {
        fromElement = e.target
    }
    let toElement = e['toElement'];
    if (toElement === undefined) {
        toElement = e.relatedTarget
    }
    if (this.getTarget(e, fromElement) !== this.getTarget(e, toElement)) {

        this.onPointOut?.(e);
    }
}
