import { LightningElement, wire } from 'lwc';
import getContactData from '@salesforce/apex/ContactandAccountController.getContactDetails';

const columns = [
    { label: 'Contact Name', fieldName: 'Name' },
    { label: 'Contact Email', fieldName: 'Email' },
    { label: 'Account Name', fieldName: 'AccountName' },
    { label: 'Last Name', fieldName: 'LastName' }
];

export default class ContactDatatableComponent extends LightningElement {
    @wire(getContactData) contactdetails;
    columns = columns;
}
