/**
 * @license
 * Copyright (c) 2020 Michael Hunter. All rights reserved.
 * This code may only be used under the BSD style license found at
 */
import { LitElement } from 'lit-element';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class AcmballElement extends LitElement {
    static styles: import("lit-element").CSSResult;
    /**
     * balls space delimited 0 terminated
     */
    inputQuery: string;
    days: number;
    /**
     * Balles in the hours tray
     */
    hour: Array<number>;
    /**
     * Balls in the Five minute tray
     */
    fiveMinute: Array<number>;
    /**
     * Balls in the minute tray
     */
    minute: Array<number>;
    /**
     * Balls in the return queue
     */
    ballReturn: Array<number>;
    render(): import("lit-element").TemplateResult;
    private _onClick;
    /**
     * Given a number of balls determines how many days until the balls repeat
     *
     * @param numberOfBalls
     * @returns {number} - days till first repeat
     */
    daysUntilRepeat(numberOfBalls: number): number;
    /**
    * Tick one minute ball
    */
    private tickMinute;
    /**
    * Tick five minute ball
    *
    * @param ball
    */
    private tickFiveMinute;
    /**
    * Tick hour ball
    *
    * @param ball
    */
    private tickHour;
    /**
     * Resets the clock (i.e. return all balls to the main tray)
     *
     * @param numberOfBalls
     */
    private resetClock;
}
declare global {
    interface HTMLElementTagNameMap {
        'acmball-element': AcmballElement;
    }
}
//# sourceMappingURL=acmball-element.d.ts.map