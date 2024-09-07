import { LightningElement, track } from 'lwc';

export default class ToDoTaskManager extends LightningElement {
    //initialize with blank values
    taskname = "";
    taskdate = null;
    //this will hold the array that will be displayed in TO -Do List
    incompletetask = [];
    //This will hold the array that will be displayed IN COMPLETED LIST
    completetask = [];
    
    //getting the values of task name and task date
    //--------------------1. This is only to get the task name and task date 
    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "taskname") {
            this.taskname = value;
        }
        else if (name === "taskdate") {
            this.taskdate = value;
        }

    }
    //when reset button is clicked then make it blank
    //------------------2. when reset button is clicked
    resetHandler(event) {
        this.taskname = "";
        this.taskdate = null;
    }

    //when add task button is clicked
    //------------------------3. When add task button is clicked. 
    /*                         Validations : 1. If Task date is Null then Auto Populate it with Current Date
                                             2. If Combination of Task date and Task Name is Already present in
                                              incompletetask array i.e in To-Do list then show error message near task name
    */
    addTaskHandler() {
        //validation 1 
        if (this.taskdate === null) {
            //this wil get the current date if not provided
            //because we don't want Timestamp we are slicing it
            //converting to ISOString because salesforce org accepts it in ISOstring form
            this.taskdate = new Date().toISOString().slice(0, 10);
            //without slice it will be like this 2024-05-14T06:32:34.891Z
        }
        //This function Checks if task is Empty and If task name in not empty then checks for duplicate
        if (this.validateTask()) {
                this.incompletetask = [
                ...this.incompletetask,
                {
                    taskname: this.taskname,
                    taskdate: this.taskdate
                }
            ];
            //after the task is sent to to do , the values must reset again
            this.resetHandler();
            //the tasks should be in sorted manner based on date
            this.sortTaskmethod()
        }
    }
    //Validation 2 
    validateTask() {
        let element = this.template.querySelector(".taskname");
        console.log("element" + element);
        let isValid = true;
        //Condition1 --Check if task is Empty
        //Condition2 --If task name in not empty then check for duplicate
        if (!this.taskname) {
            isValid = false;
        }
        else {
            //if find method finds item in array it will return task item  else it will return not found
            let taskItem = this.incompletetask.find((currItem) =>
                currItem.taskname === this.taskname &&
                currItem.taskdate === this.taskdate);
            console.log(taskItem);
            if (taskItem) {
                isValid = false;
                //to set error message 
                element.setCustomValidity("Task is already available");
            }
        }
        if (isValid) {
            //no message if task is valid
            element.setCustomValidity("");

        }
        //to display error message 
        element.reportValidity();

        return isValid;
    }
    //sorts based on date , oldest date first
    //how this works is, it will take first two items from incomplete array and substracts them
    //Inside sort method we have an arrow function that will take a and b as input 
    /*  Eg :   { taskname: "Task 1", taskdate: "2024-05-17" },
    { taskname: "Task 2", taskdate: "2024-05-15" },
    { taskname: "Task 3", taskdate: "2024-05-16" }
     */

    /* The sort method uses the return value of the compare function to determine the order of the elements:
If the compare function returns a negative value (dateA - dateB < 0), a is placed before b.
If it returns a positive value (dateA - dateB > 0), a is placed after b.
If it returns 0, the order of a and b remains unchanged.
*/
    sortTask(inputArr) 
    {
        let sortedarray = inputArr.sort((a, b) => {
            const dateA = new Date(a.taskdate);
            const dateB = new Date(b.taskdate);
            return dateA - dateB;
        });
        return sortedarray;
    }
    //This function passed the incomplete array to the sort function and replaces the unsorted array with sorted ones
    sortTaskmethod() {
        let sortedArray = this.sortTask(this.incompletetask);
        this.incompletetask = [...sortedArray];
        //stringify will convert to string format so that we can see it in console
        console.log("final result", JSON.stringify(this.incompletetask));
    }
//WHen delete icon is clicked then that item should be removed
    removalHandler(event) {
        //if clicked on delete icon that task should be removed from incomplete items array
        let index = event.target.name;
        this.incompletetask.splice(index, 1);
        //Again sorting
        this.sortTaskmethod()


    }
    //When check icon is clicked , the item is removed from the incomplete array and moved to the completed items list
    
    completetaskHandler(event) {
        let index = event.target.name;
        let removeitem = this.incompletetask.splice(index, 1);
        //Again sorting
        this.sortTaskmethod()

        //if clicked then that should be removed from incomplete array and added to new completed task array and displayed on Completed items

        this.completetask = [...this.completetask, removeitem[0]];

    }
    //When item is dragged from To-Do list(incomplete array) 
    //event.dataTransfer is an object that holds the data being dragged during a drag-and-drop operation. 
    //It provides methods to add and retrieve data associated with the drag operation.
    dragStartHandler(event) {
        event.dataTransfer.setData("index", event.target.dataset.item);
    }
    //To prevent default behavior when dragged
    allowDrop(event) {
        event.preventDefault();
    }
    //Retrieves the index of the dragged item and calls refreshData to update the task lists.
    dropElementHandler(event) {
        let index = event.dataTransfer.getData("index");
        this.refreshData(index);
    }
    //After dragging removing the item from incomplete list
    refreshData(index) {
        let removeitem = this.incompletetask.splice(index, 1);
        this.sortTaskmethod()

        //if clicked then that should be removed from incomplete array and added to new completed task array and displayed on Completed items

        this.completetask = [...this.completetask, removeitem[0]];

    }


}