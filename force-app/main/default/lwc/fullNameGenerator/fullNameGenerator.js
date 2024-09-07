import { LightningElement } from 'lwc';

export default class FullNameGenerator extends LightningElement {
   // outputvar="Output";
   outputvar =this.template.querySelector(".Output");
    superstars=['Spiderman','Superman','Batman','Ironman'];
    fname="";
    lname="";
    namefunction=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        if(name==="firstname")
        {
            this.fname=value;
        }
        else if(name==="lastname")
        {
            this.lname=value;
        }
    };
        displayMessage=false;
       handleChange=(event)=>
        {
            console.log(this.displayMessage);
            this.displayMessage=!this.displayMessage;
        };
    result="";
    res="";
    handleClick=(event)=>{
        console.log("Working");

        console.log(this.lname + " " + this.fname);
       this.res=`${this.fname} ${this.lname}`;
        this.result=this.res.toUpperCase();
    };
}