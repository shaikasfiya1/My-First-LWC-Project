import { LightningElement,api } from 'lwc';

export default class ChildComponent extends LightningElement {
   @api display;
   @api parentfruits;
   @api canEatFruits=false;
}