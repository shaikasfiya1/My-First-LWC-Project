import { LightningElement } from 'lwc';
import customNameTemplate from "./customName.html";
import customRankTemplate from "./customRank.html";
import customImageTemplate from "./customImage.html";
export default class CustomDatatype extends LightningDataTable {
    static customTypes = {
        customeName: {
            template: customNameTemplate,
            standardCellLayout: true,
            typeAttributes: ["contactName"]
        },
        customRank: {
            template: customRankTemplate,
            standardCellLayout: false,
            typeAttributes: ["rankIcon"]
        },
        customImage: {
            template: customImageTemplate,
            standardCellLayout: true,
            typeAttributes: ["pictureUrl"]
        }
        
    }
}