import { BaseAction, IBaseActionConfig } from "./_base"
import { Click } from "./click"
import { DoubleClick } from "./dblclick";

export type PageActionsType = "click" | "dbclick";

type IActionStore = {
    [key in PageActionsType]: any;
};

const actionsStore: IActionStore = {
    click:Click,
    dbclick:DoubleClick
}

class PageActions {
    constructor() {}
    build(actionType:PageActionsType,config:IBaseActionConfig) {
        return new actionsStore[actionType]()
    }
}
