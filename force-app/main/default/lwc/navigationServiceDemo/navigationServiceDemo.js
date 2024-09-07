import { LightningElement } from 'lwc';
import {NavigationMixin} from "lightning/navigation"
import ActionName from '@salesforce/schema/AIInsightAction.ActionName';
import {encodeDefaultFieldValues} from "lightning/pageReferenceUtils";
//because we can extend only one class but we need to extend NavigationMixin 
export default class NavigationServiceDemo extends NavigationMixin(LightningElement) {
clickHandler()
{
    //from page reference
    let pageRef = 
    {
        type: "standard__namedPage",
        attributes: {
            pageName: 'home'
        }
    };
    //from library
    this[NavigationMixin.Navigate](pageRef);
}
clickHandler1()
{
    //from page reference
    let pageRef = 
    {
        type: "standard__objectPage",
        attributes: {
            objectApiName: "Position__c",
            actionName : "list"
        },
        state: {
            filterName: "Open_Positions"
        }
    };
    //from library
    this[NavigationMixin.Navigate](pageRef);
}
clickHandler2()
{
    const defaultValues = encodeDefaultFieldValues({
        Industry : "Energy",
        Rating : "Hot"
    });
    let pageRef=
    {
        type : 'standard__objectPage',
        attributes : {
            objectApiName : 'Account',
            actionName : 'new'
    },
    state : {
        defaultFieldValues: defaultValues
    }
};
this[NavigationMixin.Navigate](pageRef);
}
}