import { LightningElement ,track} from 'lwc';

export default class Personalcalculator extends LightningElement {
    num1="";
    num2="";
    changeHandler(event)
    {
        let label=event.target.name;
        let  val=event.target.value;
        if(label==="Num1")
        {
            this.num1=val;

        }
        else  if(label==="Num2")
        {
            this.num2=val;

        }
    }
    
result=0;
 
addfunction=(event)=>{
            this.res=parseInt(this.num1)+parseInt(this.num2);
            this.result=this.res;
            console.log("Working");
            console.log(this.num1);
            console.log(this.num2);
    }
    subfunction=(event)=>{
        this.res=parseInt(this.num1)-parseInt(this.num2);
        this.result=this.res;
        console.log("Working");
        console.log(this.num1);
        console.log(this.num2);
}
multiplyfunction=(event)=>{
    this.res=parseInt(this.num1)*parseInt(this.num2);
    this.result=this.res;
    console.log("Working");
    console.log(this.num1);
    console.log(this.num2);
}
dividefunction=(event)=>{
    this.res=parseInt(this.num1)/parseInt(this.num2);
    this.result=this.res;
    console.log("Working");
    console.log(this.num1);
    console.log(this.num2);
}
    
    
}