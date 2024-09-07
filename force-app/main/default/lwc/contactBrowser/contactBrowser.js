import { LightningElement, wire } from 'lwc';
import getContactListByFilter from '@salesforce/apex/ContactBrowserController.getContactListByFilter';
export default class ContactBrowser extends LightningElement {
    columns = [
        { label: 'Name',  fieldName: 'Name' , type: 'text' },
        { label: 'Email', fieldName: 'Email', type: 'email' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' }
    ];
    selectedAccountId = "";
    selectedIndustry = "";
    contactList;
    @wire(getContactListByFilter, {
        accountId: "$selectedAccountId",
        Industry: "$selectedIndustry"
    })
    filteredcontacts({data,error})
    {
        if(data){
            console.log('data : ',data);
            this.contactList = data;
        }else if(error){
            console.log('error',error);
        }
    }
    handleFilterChange(event) 
    {
        this.selectedAccountId = event.detail.accountId;
        this.selectedIndustry = event.detail.Industry;
    }
}