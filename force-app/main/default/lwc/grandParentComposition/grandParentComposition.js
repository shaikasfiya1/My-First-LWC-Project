import { LightningElement } from 'lwc';

export default class GrandParentComposition extends LightningElement {
    firechildHandler()
    {
        console.log("Event Handled in Grand Parent Component");
    }
}