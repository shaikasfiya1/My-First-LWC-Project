import { api, LightningElement } from 'lwc';
import DFP_Complete from '@salesforce/label/c.DFP_Complete';
import DFP_Current from '@salesforce/label/c.DFP_Current';
import DFP_Upcoming from '@salesforce/label/c.DFP_Upcoming';
export default class DynamicFlowProgressLWC extends LightningElement {
    //To store the list of steps
    @api stepList;
    // To store the current step
    @api currentStep;
    @api currentStepPercentage;
    label = {
        DFP_Complete,
        DFP_Current,
        DFP_Upcoming
    };
    //Array of steps
    stepsArray;
    //No of steps
    countTotalSteps;
    //So that we can grey out steps after current step
    countToCurrent;
    connectedCallback() {
        //Array of steps
        const stepListArray = this.stepList.split(',');
        let countTotalSteps = stepListArray.length;
        let stepsArrayTemp = [];
        let afterCurrent = false;
        let countToCurrent = 0;
        let currentCount = 0;
        //Iterating through array of steps
        for (let i = 0; i < stepListArray.length; i++) {
        //---------------To check if the step is final step or not
            currentCount = i + 1;
            let isFinalStep = false;
            if (currentCount == countTotalSteps) 
            {
                isFinalStep = true;
            }
        //----------------------------------------------------------
        //trim() removes whitespace from both the ends
            let cleanArrayValue = stepListArray[i].trim();
            if (afterCurrent == false) {
                if (cleanArrayValue == this.currentStep) 
                    {
                    if (isFinalStep == true) {
                        stepsArrayTemp.push({
                            'label': cleanArrayValue,
                            'status': 'Complete',
                            'showCurrent': false,
                            'showComplete': false,
                            'showFinalComplete': true,
                            'showUpcoming': false,
                            'finalStep': true
                        });
                        countToCurrent++;
                    }
                    else {
                        stepsArrayTemp.push({
                            'label': cleanArrayValue,
                            'status': 'Current',
                            'showCurrent': true,
                            'showComplete': false,
                            'showUpcoming': false,
                            'finalStep': false
                        });
                        afterCurrent = 'true';
                        countToCurrent++;
                    }
                }
                else {
                    stepsArrayTemp.push({
                        'label': cleanArrayValue,
                        'status': 'Complete',
                        'showCurrent': false,
                        'showComplete': true,
                        'showUpcoming': false,
                        'finalStep': isFinalStep
                    });
                    countToCurrent++;
                }
            }
            else {
                stepsArrayTemp.push({
                    'label': cleanArrayValue,
                    'status': 'Upcoming',
                    'showCurrent': false,
                    'showComplete': false,
                    'showUpcoming': true,
                    'finalStep': false
                });
            }
        }
        this.stepsArray = stepsArrayTemp;
    }
}