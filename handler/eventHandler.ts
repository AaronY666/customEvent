import { isMobile, packageEvent } from "../common/utils"

export function pointDownHandler(e: MouseEvent | TouchEvent) {
    //合成event事件
    packageEvent(e);

    // this._mouseUpItem = null;
    this._mouseDownItem = this.getTarget(e);
    //mousedown事件都会触发
    this.onPointDown?.(e);

    if (isMobile()) {
        //移动端处理右键事件
        this._rightClickTimer = setTimeout(() => {
            this.onRightClick?.(e);
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
    packageEvent(e);

    this.onPointMove?.(e);

    //移动后取消移动端右键事件
    clearTimeout(this._rightClickTimer);
}

export function pointUpHandler(e: MouseEvent | TouchEvent) {
    //合成event事件
    packageEvent(e);

    //mousedown事件都会触发
    this._mouseUpItem = this.getTarget(e);
    this.onPointUp?.(e);
    clearTimeout(this._rightClickTimer);

    //右键mouseup
    if (this.getTarget(e) === this._rightClickItem && (<MouseEvent>e).button === 2) {

        this.onRightClick?.(e);
    }

    this._rightClickItem = null;

}

export function clickHandler(e: MouseEvent | TouchEvent) {
    //合成event事件
    packageEvent(e);

    //判断单击还是双击
    clearTimeout(this._clickTimer);


    if (this.getTarget(e) === this._clickItem) {
        //双击事件
        this.onDoubleClick?.(e);
        this._clickItem = null;
    } else if (this._mouseDownItem === this._mouseUpItem) {
        //单击事件
        this.onClick?.(e);
        this._clickItem = this.getTarget(e);
    }

    this._mouseDownItem = null;
    this._mouseUpItem = null;
    this._clickTimer = setTimeout(() => {
        this._clickItem = null;
    }, 500)

}

export function mouseOverHandler(e: MouseEvent) {
    let fromElement = e.relatedTarget || e['fromElement'];
    let toElement = e.target || e['toElement'];
    if (this.getTarget(e, fromElement) !== this.getTarget(e, toElement)) {

        this.onPointOver?.(e);
    }
}

export function mouseOutHandler(e: MouseEvent) {
    let fromElement = e.relatedTarget || e['fromElement'];
    let toElement = e.target || e['toElement'];
    if (this.getTarget(e, fromElement) !== this.getTarget(e, toElement)) {

        this.onPointOut?.(e);
    }
}
