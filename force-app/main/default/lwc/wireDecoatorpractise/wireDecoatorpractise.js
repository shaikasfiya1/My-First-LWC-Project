import { LightningElement, wire } from 'lwc';
import getAccountData from "@salesforce/apex/AccountHelper.getAccountData";
import UpdatedDate from '@salesforce/schema/DatacloudCompany.UpdatedDate';

//constants should be placed before export
const columns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Account Rating', fieldName: 'Rating', },
    { label: 'Account Industry', fieldName: 'Industry', },
];
export default class WireDecoatorpractise extends LightningElement {
    accounts;
    error;
    columns = columns;
    @wire(getAccountData) accountsFunction({ data, error }) {
        if (data) {
            console.log(data);
           let updatedAccount= data.map(currItem=>{
            let updatedObject={};
                if(!currItem.hasOwnProperty('Rating'))
                    {
                        updatedObject={...currItem,Rating:"Warm"};
                    }
                    else{
                        updatedObject={...currItem};
                    }
                    return updatedObject;
            });
            this.accounts=[...updatedAccount];
            this.error=null;
        }
        else if (error) {
            console.log(error);
            this.error=error;
            this.accounts=null;
        }
    }

   
}