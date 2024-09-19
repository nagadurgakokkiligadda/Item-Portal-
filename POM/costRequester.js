exports.costRequester = class costRequester {
    constructor(page) {
        this.page = page;
        this.items =  "[title='Items']"
        this.item_dropdown="//span[@class='ant-select-selection-item']"
        this.item_options="div[class='ant-select-item-option-content']"
        this.searchItem = "//input[@placeholder='Search for items...']"
        this.searchIcon = "//button[@type='button']//*[name()='svg']"
        this.createNewButton = "//span[normalize-space()='Create a new item']"
        this.siteId = "//input[@id='siteId']"
        this.requester = "//input[@id='requester']"
    }
    async createNewItem(itemType,searchItem){
        await this.page.locator(this.item_dropdown).click();
        const dropdown_list = await this.page.$$(this.item_options)
        for(const list of dropdown_list){
            const itemValue = await list.textContent()
            if(itemValue == itemType){
                console.log("Selected Item type  is:",await itemValue)
                await list.click()
            }
        }
        await this.page.locator(this.searchItem).fill(searchItem)
        console.log("The item you are searching is:",await searchItem)
        await this.page.locator(this.searchIcon).click()
        await this.page.locator(this.createNewButton).click()   
    }
    async requesterLevel(siteId,requester){
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.siteId).fill(siteId)
        await this.page.locator(this.requester).fill(requester)
        
    }
}
