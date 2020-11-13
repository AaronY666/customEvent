import { isMobile, isObject } from './utils';

export default class CustomEvent {


    private _element: HTMLElement;

    /***************************************************************Mouse Event Flag*********************************************************************/

    //click
    private _clickItem = null;
    private _clickTimer = null;

    //right click
    private _rightClickItem = null;
    private _rightClickTimer = null;

    //mouse down
    private _mouseDownItem = null;

    //mouse up
    private _mouseUpItem = null;


    constructor(el: HTMLElement) {
        this._element = el;
        this._registerEvents();
    }

    private _registerEvents() {
        let el = this._element

        let ifMobile = isMobile();
        let MouseDown = 'mousedown', MouseMove = 'mousemove', MouseUp = 'mouseup'
        if (ifMobile) {
            MouseDown = 'touchstart', MouseMove = 'touchmove', MouseUp = 'touchend'
        }

        el.addEventListener(MouseDown, (e: MouseEvent | TouchEvent) => {
            //合成event事件
            this._packageEvent(e);

            // this._mouseUpItem = null;
            this._mouseDownItem = this.getTarget(e);
            //mousedown事件都会触发
            this.onPointDown?.(e);

            if (ifMobile) {
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


        })

        el.addEventListener(MouseMove, (e: MouseEvent | TouchEvent) => {
            //合成event事件
            this._packageEvent(e);

            this.onPointMove?.(e);

            //移动后取消移动端右键事件
            clearTimeout(this._rightClickTimer);
        })

        el.addEventListener(MouseUp, (e: MouseEvent | TouchEvent) => {
            //合成event事件
            this._packageEvent(e);

            //mousedown事件都会触发
            this._mouseUpItem = this.getTarget(e);
            this.onPointUp?.(e);
            clearTimeout(this._rightClickTimer);

            //右键mouseup
            if (this.getTarget(e) === this._rightClickItem && (<MouseEvent>e).button === 2) {

                this.onRightClick?.(e);
            }

            this._rightClickItem = null;

        })

        el.addEventListener('click', (e: MouseEvent | TouchEvent) => {
            //合成event事件
            this._packageEvent(e);

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

        })

        el.addEventListener('mouseover', (e: MouseEvent) => {
            let fromElement = e.relatedTarget || e['fromElement'];
            let toElement = e.target || e['toElement'];
            if (this.getTarget(e, fromElement) !== this.getTarget(e, toElement)) {

                this.onPointOver?.(e);
            }
        })

        el.addEventListener('mouseout', (e: MouseEvent) => {
            let fromElement = e.relatedTarget || e['fromElement'];
            let toElement = e.target || e['toElement'];
            if (this.getTarget(e, fromElement) !== this.getTarget(e, toElement)) {

                this.onPointOut?.(e);
            }
        })

    }

    private _packageEvent(e) {
        let touchEvent = e.changedTouches?.[0];
        if (!touchEvent || !isObject(touchEvent)) {
            return false;
        }
        for (let key in touchEvent) {
            e[key] = e[key] ? e[key] : touchEvent[key];
        }
    }

    public getTarget(e: MouseEvent | TouchEvent, targetElement?: HTMLElement) {
        return targetElement || e.target;
    }

    /***************************************************************Mouse Event Callback*********************************************************************/

    public onClick = null;
    public onRightClick = null;
    public onDoubleClick = null;
    public onPointDown = null;
    public onPointMove = null;
    public onPointUp = null;
    public onPointOver = null;
    public onPointOut = null;

}