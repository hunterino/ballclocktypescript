/**
 * @license
 * Copyright (c) 2020 Michael Hunter. All rights reserved.
 * This code may only be used under the BSD style license found at
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css } from 'lit-element';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
let AcmballElement = class AcmballElement extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * balls space delimited 0 terminated
         */
        this.inputQuery = '27';
        this.days = 0;
        /**
         * Balles in the hours tray
         */
        this.hour = [];
        /**
         * Balls in the Five minute tray
         */
        this.fiveMinute = [];
        /**
         * Balls in the minute tray
         */
        this.minute = [];
        /**
         * Balls in the return queue
         */
        this.ballReturn = [];
    }
    render() {
        return html `
      <h1>Ball Clock - ${this.inputQuery}!</h1>
      <input type="text" .value="${this.inputQuery}"/>
      <button @click=${this._onClick} part="button">
        Compute 
      </button> 
      <p>Days: ${this.days}</p>
      <slot></slot>
    `;
    }
    _onClick() {
        this.days = this.daysUntilRepeat(Number(this.inputQuery));
    }
    /**
     * Given a number of balls determines how many days until the balls repeat
     *
     * @param numberOfBalls
     * @returns {number} - days till first repeat
     */
    daysUntilRepeat(numberOfBalls) {
        if (numberOfBalls < 27 || 127 < numberOfBalls)
            return NaN;
        this.resetClock(numberOfBalls);
        let initialBallReturn = this.ballReturn.slice(0);
        let minutes = 0;
        while (1) {
            minutes++;
            this.tickMinute();
            //Compare arrays
            // this will only be true at 1:00, so do a 1 check first
            if ((initialBallReturn.length == this.ballReturn.length) && initialBallReturn.every((value, index) => value === this.ballReturn[index])) {
                break;
            }
        }
        let totalDays = minutes / 60 / 24;
        return totalDays;
    }
    /**
    * Tick one minute ball
    */
    tickMinute() {
        let ball = this.ballReturn.shift();
        let ballnum = ball !== undefined ? ball : 0;
        if (ballnum == 0) {
            // this shouldn't happen
            console.log("ball 0");
        }
        if (this.minute.length >= 4) {
            this.ballReturn = this.ballReturn.concat(this.minute.reverse().splice(0));
            this.tickFiveMinute(ballnum);
        }
        else {
            this.minute.push(ballnum);
        }
    }
    /**
    * Tick five minute ball
    *
    * @param ball
    */
    tickFiveMinute(ball) {
        if (this.fiveMinute.length >= 11) {
            this.ballReturn = this.ballReturn.concat(this.fiveMinute.reverse().splice(0));
            this.tickHour(ball);
        }
        else {
            this.fiveMinute.push(ball);
        }
    }
    /**
    * Tick hour ball
    *
    * @param ball
    */
    tickHour(ball) {
        if (this.hour.length >= 11) {
            console.log("12 hour: " + this.hour.length);
            this.ballReturn = this.ballReturn.concat(this.hour.reverse().splice(0));
            this.ballReturn.push(ball);
        }
        else {
            this.hour.push(ball);
        }
    }
    /**
     * Resets the clock (i.e. return all balls to the main tray)
     *
     * @param numberOfBalls
     */
    resetClock(numberOfBalls) {
        this.hour = [];
        this.fiveMinute = [];
        this.minute = [];
        this.ballReturn = [];
        for (let i = 0; i < numberOfBalls; i++) {
            this.ballReturn.push(i + 1);
        }
    }
};
AcmballElement.styles = css `
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;
__decorate([
    property()
], AcmballElement.prototype, "inputQuery", void 0);
__decorate([
    property({ type: Number })
], AcmballElement.prototype, "days", void 0);
__decorate([
    property({ type: Array })
], AcmballElement.prototype, "hour", void 0);
__decorate([
    property({ type: Array })
], AcmballElement.prototype, "ballReturn", void 0);
AcmballElement = __decorate([
    customElement('acmball-element')
], AcmballElement);
export { AcmballElement };
//# sourceMappingURL=acmball-element.js.map