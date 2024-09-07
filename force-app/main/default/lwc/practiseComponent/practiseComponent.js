import { LightningElement } from 'lwc';

export default class PractiseComponent extends LightningElement 
{
    constructor()
    {
      super();
      console.log("Constructor") 
    }
    connectedCallback()
    {
        console.log("Connected Callback");
    }
    renderedCallback()
    {
        console.log("Rendered Callback");
    }
    errorCallback(error,stack)
    {
        console.log("Error");
    }
    disconnectedCallback()
    {
        console.log("Disconnected");
    }
}