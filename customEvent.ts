import { isMobile } from './common/utils';

import {
    pointDownHandler, pointMoveHandler, pointUpHandler,
    mouseOverHandler, mouseOutHandler, clickHandler
} from "./handler/eventHandler"

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

        el.addEventListener(MouseDown, pointDownHandler.bind(this))

        el.addEventListener(MouseMove,pointDownHandler.bind(this))

        el.addEventListener(MouseUp,pointDownHandler.bind(this))

        el.addEventListener('click',pointDownHandler.bind(this))

        el.addEventListener('mouseover',pointDownHandler.bind(this))

        el.addEventListener('mouseout',pointDownHandler.bind(this))

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