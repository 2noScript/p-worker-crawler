import { Page } from "playwright";
import { BaseAction } from "./_base";


export interface IClick{
    xpath:string,
    options?:Parameters<Page['click']>[1];
}

export  class Click extends BaseAction<IClick>{
    async handle(page: Page): Promise<void> {
      const {xpath,options}=this.config
      await page.click(xpath,options??{})
    }
}
