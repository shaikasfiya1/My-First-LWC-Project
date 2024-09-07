import { LightningElement,wire } from 'lwc';
import accountList from "@salesforce/apex/AccountsController.getAllAccounts";
export default class AccountComponent extends LightningElement {
    @wire(accountList)
    accounts;
    selectedAccount
    selectedAccountHandler(event)
    {
        event.preventDefault();
        const accountId = event.target.dataset.id;
        this.selectedAccount = this.accounts.data.find((currItem)=>currItem.Id===accountId);
    }
}