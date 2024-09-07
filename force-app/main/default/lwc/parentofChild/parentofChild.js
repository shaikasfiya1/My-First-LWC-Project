import { LightningElement } from 'lwc';

export default class ParentofChild extends LightningElement {
    displayMessage=false;
    displayMessageHandler(event)
    {
        this.displayMessage=true;
    }
}