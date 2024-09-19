exports.ProductLink = class ProductLink {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.product = "//div[@title='Product Combination']//*[name()='svg']";
        this.addNew = "//div[@class='sc-fAGzVM hIBZXE']//*[name()='svg']";
        this.purchaseItem = "//span[normalize-space()='Purchase']";
        this.productLineCodeInput = "#rc_select_1";
        this.productLineDescriptionInput = "#rc_select_2";
        this.productClassCodeInput = "//input[@id='rc_select_3']"; 
        this.productTypeCodeInput = "#rc_select_5"; 
        this.itemGroupCodeInput = "#rc_select_7"; 
        this.saveBtn = "//button[normalize-space()='Save']";
        this.resetBtn = "//button[normalize-space()='Reset']";
        this.successMsg = "//span[contains(text(),'Your Item Classification has been Successfully Add')]";
    }

    async createProductLink(productLineCode, productClassCode, productTypeCode, itemGroupCode) {
        await this.page.locator(this.product).click();
        await this.page.waitForSelector(this.addNew);
        await this.page.locator(this.addNew).click();
        await this.page.waitForSelector(this.purchaseItem);
        await this.page.locator(this.purchaseItem).check();

        await this.page.waitForSelector(this.productLineCodeInput, { state: 'visible' });
        await this.page.locator(this.productLineCodeInput).click();
        await this.page.locator(this.productLineCodeInput).fill(productLineCode);
        await this.page.locator(this.productLineCodeInput).press('Tab');

        try {
            await this.page.waitForTimeout(2000);
            const isFrozen = await this.page.locator(this.productLineDescriptionInput).isDisabled();
            if (isFrozen) {
                console.log(`Product line code with "${productLineCode}" item classification already exists.`);
                await this.page.locator(this.resetBtn).click();
            } else {
                await this.page.waitForSelector(this.productClassCodeInput, { state: 'visible' });
                await this.page.locator(this.productClassCodeInput).click();
                await this.page.locator(this.productClassCodeInput).fill(productClassCode);
                await this.page.locator(this.productClassCodeInput).press('Tab');

                await this.page.waitForSelector(this.productTypeCodeInput, { state: 'visible' });
                await this.page.locator(this.productTypeCodeInput).click();
                await this.page.locator(this.productTypeCodeInput).fill(productTypeCode);
                await this.page.locator(this.productTypeCodeInput).press('Tab');

                await this.page.waitForSelector(this.itemGroupCodeInput, { state: 'visible' });
                await this.page.locator(this.itemGroupCodeInput).click();
                await this.page.locator(this.itemGroupCodeInput).fill(itemGroupCode);
                await this.page.locator(this.itemGroupCodeInput).press('Tab');

                await this.page.locator(this.saveBtn).click();
                console.log(`New item classification with "${productLineCode}" created successfully.`);
                await this.page.locator(this.successMsg);
                await this.successMsg.waitFor({ state: 'visible', timeout: 5000 });
                await expect(this.successMsg).toBeVisible();
                console.log(successMsg);
            }
        } catch (error) {
            console.error("An error occurred while checking the frozen state:", error);
        }
    }
}
