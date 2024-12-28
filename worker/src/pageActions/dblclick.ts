import { Page } from "playwright";
import { BaseAction } from "./_base";

export interface IDoubleClick {
    xpath: string;
    options?: Parameters<Page['dblclick']>[1]; 
}

export class DoubleClick extends BaseAction<IDoubleClick> {
    async handle(page: Page): Promise<void> {
        const { xpath, options } = this.config;
        await page.dblclick(xpath, options ?? {});
    }
}
