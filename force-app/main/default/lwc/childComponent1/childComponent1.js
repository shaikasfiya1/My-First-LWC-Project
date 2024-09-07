import { LightningElement } from 'lwc';

export default class ChildComponent1 extends LightningElement {
    clickHandler()
    {
        //1. Create custom Event
        let mycustomEvent=new CustomEvent("displaymsg");
        //2. Dispatch Event
        this.dispatchEvent(mycustomEvent);
    }
}