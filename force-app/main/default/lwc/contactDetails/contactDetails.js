import { LightningElement,api } from 'lwc';
export default class ContactDetails extends LightningElement 
{
    @api contact;
    clickHandler(event)
    {
        //prevent the anchor element from navigation
        event.preventDefault();
        //1. creation of custom event
        const selectionevent = new CustomEvent('selection',{
            detail : this.contact.Id
        });
        //2. dispatch the event 
        this.dispatchEvent(selectionevent);
    }
}