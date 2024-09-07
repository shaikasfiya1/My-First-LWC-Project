import { LightningElement } from 'lwc';

export default class ChildComposition extends LightningElement {
    clickHandler()
    {
        let myCustomEvent=new CustomEvent("fire",{
            // This is not supported in lightning  pages
            // bubbles : false,
            // composed : true
            bubbles : true,
            composed : true
        });
        this.dispatchEvent(myCustomEvent);
    }
}