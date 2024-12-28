import { Page } from "playwright";

export interface IBaseActionConfig {
    [key: string]: any;
}

export abstract class BaseAction<T extends IBaseActionConfig>{
    constructor(protected config: T) {
       this.config=config
    }
    abstract handle(page:Page):Promise<void>
}