import { LightningElement,track } from 'lwc';

export default class SampleComponent extends LightningElement {
    greeting="Hello";
    @track
    welcome="Hi this is decorator sample";
    clickbtnfunc(event){
    alert("First alert from LWC");
    this.welcome="Changed on Button Click";
    }
     @track myobj={fname:"Asfiya", lname: "Shaik"};
    showOnClick(event)
    {
        this.myobj.fname="Asfi";
    }
    
}