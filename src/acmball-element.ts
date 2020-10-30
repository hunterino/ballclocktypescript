/**
 * @license
 * Copyright (c) 2020 Michael Hunter. All rights reserved.
 * This code may only be used under the BSD style license found at
 */

import {LitElement, html, customElement, property, css} from 'lit-element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('acmball-element')
export class AcmballElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  /**
   * balls space delimited 0 terminated
   */
  @property()
  inputQuery:string = '27';


  @property({type: Number})
  days:number = 0;
  
  /**
   * Balles in the hours tray
   */
  @property({type: Array})
  hour: Array<number> = [];

  /**
   * Balls in the Five minute tray
   */
  fiveMinute: Array<number>  = [];

  /**
   * Balls in the minute tray
   */
  minute: Array<number>  = [];

  /**
   * Balls in the return queue
   */
  @property({type: Array})
  ballReturn :  Array<number> = [];


  render() {
    return html`
      <h1>Ball Clock - ${this.inputQuery}!</h1>
      <input type="text" .value="${this.inputQuery}"/>
      <button @click=${this._onClick} part="button">
        Compute 
      </button> 
      <p>Days: ${this.days}</p>
      <slot></slot>
    `;
  }

  private _onClick() {
    this.days = this.daysUntilRepeat(Number(this.inputQuery));
  }

  /**
   * Given a number of balls determines how many days until the balls repeat
   *
   * @param numberOfBalls
   * @returns {number} - days till first repeat
   */
  daysUntilRepeat(numberOfBalls: number){
    if(numberOfBalls < 27 || 127 < numberOfBalls)
      return NaN;
    this.resetClock(numberOfBalls);
    let initialBallReturn = this.ballReturn.slice(0);

    let minutes = 0;

    while(1) {
      minutes++;
      this.tickMinute();
      
      //Compare arrays
      // this will only be true at 1:00, so do a 1 check first
      if((initialBallReturn.length == this.ballReturn.length) && initialBallReturn.every((value, index) => value === this.ballReturn[index] )){
          break;
      }
    }
    let totalDays = minutes / 60 / 24;
    return totalDays;
  }

/**
* Tick one minute ball
*/
  private tickMinute(){
    let ball = this.ballReturn.shift();
    let ballnum:number = ball!==undefined? ball: 0;
    if (ballnum == 0) {
      // this shouldn't happen
      console.log("ball 0");
    }
    if(this.minute.length >= 4){
      this.ballReturn = this.ballReturn.concat(this.minute.reverse().splice(0));
      this.tickFiveMinute(ballnum);
    }
    else{
      this.minute.push(ballnum);
    }
  }

/**
* Tick five minute ball
*
* @param ball
*/
  private tickFiveMinute(ball: number){
    if(this.fiveMinute.length >= 11){
      this.ballReturn = this.ballReturn.concat(this.fiveMinute.reverse().splice(0));
      this.tickHour(ball);
    }
    else{
      this.fiveMinute.push(ball);
    }
  }

/**
* Tick hour ball
*
* @param ball
*/
  private tickHour(ball: number){
    if(this.hour.length >= 11){
      console.log("12 hour: " + this.hour.length);
      this.ballReturn = this.ballReturn.concat(this.hour.reverse().splice(0));
      this.ballReturn.push(ball);
    }
    else{
      this.hour.push(ball);
    }

  }

/**
 * Resets the clock (i.e. return all balls to the main tray)
 *
 * @param numberOfBalls
 */
  private resetClock(numberOfBalls: number){
    this.hour = [];
    this.fiveMinute = [];
    this.minute = [];
    this.ballReturn = [];

    for(let i = 0; i < numberOfBalls; i++){
      this.ballReturn.push(i + 1);
    }
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'acmball-element': AcmballElement;
  }
}
