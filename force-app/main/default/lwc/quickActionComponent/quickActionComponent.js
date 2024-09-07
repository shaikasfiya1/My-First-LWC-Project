import { LightningElement,api } from 'lwc';

export default class QuickActionComponent extends LightningElement {
@api invoke()
{
    console.log('@@ Action Called @@');
}
}