import { LightningElement } from 'lwc';

export default class ParentComponent1 extends LightningElement {
    displayMessage=false;
    displayMessageHandler(event)
    {
        this.displayMessage=true;
    }
}