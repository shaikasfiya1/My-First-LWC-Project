import { LightningElement,track } from 'lwc';
import stateList from '@salesforce/apex/FilterDistricts.stateList'
import districtList from '@salesforce/apex/FilterDistricts.populateDistricts'
export default class StateDistrictData extends LightningElement {
    @track value;
    @track options =[];
    @track isDistrictVisible=false;
    @track districtoptions=[];
    connectedCallback(){
        this.stateValueList();
    }
    stateValueList(){
        stateList().then(result=>{
            console.log('result',result);
            this.options = result.map((obj)=>{
               return{label:obj.State__c,value:obj.State__c};
            });
          
        }).catch(error=>{
            console.log('error',error);
        })
    }
    selectState(event){
        console.log('event',event.target.value);
        this.selectedStateValue = event.target.value;
    }
    handleClick(){
        this.isDistrictVisible = true;
        this.districtValueList();
    }
    districtValueList(){
        districtList({selectedStateValues:this.selectedStateValue})
        .then(data=>{
            console.log('this.districtoptions',data);
            //this.districtoptions =data;
            this.districtoptions = data.map((obj)=>{
               return{label:obj,value:obj};
            });
            
        })
        .catch(error=>{
            console.log('error',error);
        })

    }

}