import { getObjectInfo, getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
export default class DynamicRecordAndObject extends LightningElement {
    value;
    @wire(getObjectInfo, {
        objectApiName: ACCOUNT_OBJECT
    })
    accountinfo;
    @wire(getPicklistValues, {
        recordTypeId: "$accountinfo.data.defaultRecordTypeId",
        fieldApiName: ACCOUNT_INDUSTRY
    })
    industryPickList;
    @wire(getPicklistValuesByRecordType,
        {
            objectApiName: ACCOUNT_OBJECT,
            recordTypeId: "$accountinfo.data.defaultRecordTypeId"
        }
    )
    accountinfo1;
    // outputFunction({ data, error }) 
    // {
    //     if (data) {

    //         console.log("my data ", data);

    //     }
    //     else if (error) {

    //         console.log("error ", error);
    //     }
    // }
    handleChange(event)
    {
        this.value = event.target.value;
    }
}