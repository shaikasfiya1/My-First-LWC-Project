import { LightningElement, wire } from 'lwc';
import getData from '@salesforce/apex/ContactsController.getContactData';
const columns = [
    //label is what we see in UI and fieldName is api name or custom property
    {
        label: 'FullName',
        fieldName: 'fullName'
    },
    {
        label: 'Title',
        fieldName: 'Title',
    },
    {},
    
    {
        label: 'Rank',
        fieldName: 'Rank__c',
        type: 'Number',
        cellAttributes: {
            class: {
                fieldName: "RankColor"
            }
        }
    },
    {
        label : 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        
    },
    {
        label : 'Email',
        fieldName : 'Email',
        type : 'email'
    },

    {
        label: 'Picture',
        fieldName: 'Picture__c',
        type:'URL'
    },
    {
        label: 'Account Name',
        fieldName: 'accountLink',
        type: 'url',
        //on Ui in datatable it will come as clickable Id, but we want clickable name so we are changing the label to accountName which is the custom property we added 
        typeAttributes: {
            label: {
                fieldName: 'accountName'
            },
            // to specify record should open in another tab upon clicking
            target: "_blank"
        }
    }
];
export default class CustomStyleDatatable extends LightningElement {
    contacts;
    columns = columns;
    //getting data from method through wire decorator
    @wire(getData)
    wiredContacts({ data, error }) {
        if (data) {
            //this.contacts=data;
            console.log(data);
            //iterating through data using map
            this.contacts = data.map((record) => {
                // this will make the id clickable
                let accountLink = "/" + record.AccountId;
                console.log(record.AccountId);
                let accountName = record.Account.Name;
                let fullName=record.FirstName+' '+record.LastName;
                // let RankColor;
                // if (record.Rank__c <= 5) {
                //     RankColor = "slds-text-color_success";
                // }
                // else if (record.Rank__c > 5) {
                //     RankColor = "slds-text-color_destructive";
                // }
//we can add properties to existing object using spread operator
//here we are additionally adding properties to the contact record that can be used to show in data table
//Example we adding firstname property that is combination of last name and first name and we are using that in columns
                return {
                    ...record,
                    // adding properties on the existing object
                    accountLink: accountLink,
                    accountName: accountName,
                    // RankColor: RankColor,
                    fullName:fullName
                }
            });
            console.log(data);

        }
        else {
            console.log(error);
        }
    }
}