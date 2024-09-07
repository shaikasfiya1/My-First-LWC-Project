import { LightningElement } from 'lwc';

export default class ParentComposition extends LightningElement {
    firechildhandler()
    {
        console.log("Event Handled in Parent Component - At Child Compoenent");
    }
    firechildDivhandler()
    {
        console.log("Event Handled in Parent Component - At Div Compoenent");
    }
}