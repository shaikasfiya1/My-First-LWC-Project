import { LightningElement,wire } from 'lwc';
import getContactList from "@salesforce/apex/contactsContoller.getContactList";
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/contactDetails__c';

export default class ContactList extends LightningElement 
{
    @wire(MessageContext)
    messageContext;
    
        
    
    @wire(getContactList)
    contacts;
    selectedContact;
       selectionHandler(event)
    {
      
        let selectedContactId=event.detail;
        this.selectedContact = this.contacts.data.find((currItem)=>currItem.Id===selectedContactId);
        const payload = 
        {
            lmsData: this.selectedContact
        };
        publish(this.messageContext, recordSelected, payload);
    }
    ////////////////////////////////////////////////////
    
}