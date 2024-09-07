import { LightningElement, wire, api } from 'lwc';
// This is child component
import searchRecords from "@salesforce/apex/customLookupController.searchRecords";
// This is to pass in setTimeout function
const DELAY = 300; //3 seconds
export default class CustomLookupComponent extends LightningElement {
    //Initially assigning API name as account 
    @api apiName = "Account";
    searchvalue;
    //Initially assigning label with Account
    @api objectLabel = "Account";
    //Intially assigning icon with standard account
    @api iconName = "standard:account";

    delayTimeout;
    // Creating one object with selectedId and selectedName
    selectedRecord = {
        selectedId: "",
        selectedName: ""
    }
    displayOptions = false;
    @wire(searchRecords,
        {
            // to make the variable reactive , use dollar symbol
            objectApiName: "$apiName",
            searchKey: "$searchvalue"
        }

    )
    outputs;
    get isRecordSelected() {
        return this.selectedRecord.selectedId === "" ? false : true;
    }
    
    changeHandler(event) {
        //To clear the timeout
        window.clearTimeout(this.delayTimeout);
        let enteredValue = event.target.value;
        //if we write like this, every time user enters some input, wire will be called and apex method executes, to avoid apex method from getting called frequently
        //debouncing - do not update the reactive property as long as the function is being called within a delay - use setTimeout()
        this.delayTimeout = setTimeout(() => {
            this.searchvalue = enteredValue;
            this.displayOptions = true;
        }, DELAY);
    }
    clickHandler(event) {
        let selectedId = event.currentTarget.dataset.item;
        console.log("selectedId " + selectedId);
        let outputRecord = this.outputs.data.find(
            (currItem) => currItem.Id === selectedId
        );
        this.selectedRecord = {
            selectedId: outputRecord.Id,
            selectedName: outputRecord.Name
        };
        this.sendSelection();
        this.displayOptions = false;
    }
    removalSelectionHandler(event) {
        this.selectedRecord = {
            selectedId: "",
            selectedName: ""
        };
        this.sendSelection();
        this.displayOptions = false;
    }
    sendSelection()
    {
      let mySelectionEvent=  new CustomEvent("selecterec",{
        detail : this.selectedRecord.selectedId
      })
      this.dispatchEvent(mySelectionEvent);
    }

}