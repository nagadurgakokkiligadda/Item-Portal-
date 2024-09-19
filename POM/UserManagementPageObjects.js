class UserManagementPageObjects {
    constructor(page) {
        this.page = page;
        this.user = "[title='Users']";
        this.addUserBtn = '//div[@class="add-user"]';
        this.modalText = "//div[@class='sc-fPXMhL jfHDDj']";
        this.fullNameInput = '//input[@placeholder="Enter Full Name"]';
        this.emailInput = '//input[@placeholder="Enter Email"]';
        this.phoneNumberInput = '//input[@placeholder="Enter Phone Number"]';
        this.adminRadioBtn = '.ant-radio-input';
        this.createBtn = '//button[normalize-space()="Create"]';
        this.resetBtn = "//button[normalize-space()='Reset']";
        this.successMsg = '//span[normalize-space()="User Successfully created"]';
        this.userFailMsg = "//span[normalize-space()='User Already Created']";
        this.closeBtn = "//div[@class='sc-bVHBsO bkfYio']//*[name()='svg']";
        this.searchBar = "//input[@placeholder='search with Name , Email , Role']";
        this.tableContainer = "//div[@class='data-table-container']";
        this.tableRow = "//div[@class='data-table-container']//tr";
        this.profileIcon = "//div[@title='Naga Durga']";
        this.logOut = "//div[@class='sc-jXbVAB bVEWYo']";
    }

    async createUser(fullName, email, phoneNumber) {
        await this.page.locator(this.user).click();
        await this.page.locator(this.addUserBtn).click();
        await this.page.locator(this.modalText).waitFor();
        await this.page.locator(this.fullNameInput).fill(fullName);
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.phoneNumberInput).fill(phoneNumber);
        await this.page.locator(this.adminRadioBtn).last().check();
        await this.page.locator(this.createBtn).click();
        await this.page.waitForTimeout(2000);

        if (await this.page.locator(this.successMsg).isVisible()) {
            console.log(`${fullName}: ${await this.page.locator(this.successMsg).innerText()}`);
        } else {
            console.log(`${fullName}: ${await this.page.locator(this.userFailMsg).innerText()}`);
            await this.page.locator(this.closeBtn).click();
        }
        
        await this.page.waitForSelector(this.addUserBtn, { state: 'visible' });
    }

    async totalUsers() {
        const allRows = await this.page.$$(this.tableRow);
        console.log(`Total users found: ${allRows.length}`);
    }

    async searchUser(searchTerm) {
        await this.page.locator(this.searchBar).click();
        await this.page.locator(this.searchBar).fill(searchTerm);
        await this.page.keyboard.press('Enter');
        const rows = await this.page.$$(this.tableRow);
        console.log(`Total users found for the selected search term: ${rows.length}`);

        for (const row of rows) {
            const fullName = await row.$eval('td:nth-child(1)', el => el.innerText);
            const email = await row.$eval('td:nth-child(2)', el => el.innerText);
            const phoneNumber = await row.$eval('td:nth-child(3)', el => el.innerText);
            const role = await row.$eval('td:nth-child(4)', el => el.innerText);
            console.log(`Full Name: ${fullName}, Email: ${email}, Phone Number: ${phoneNumber}, Role: ${role}`);
        }
    }

    async isScrollable() {
        const container = await this.page.$(this.tableContainer);
        const scrollHeight = await container.evaluate(el => el.scrollHeight);
        const clientHeight = await container.evaluate(el => el.clientHeight);

        if (scrollHeight > clientHeight) {
            console.log('The list is scrollable.');
        } else {
            console.log('The list is not scrollable.');
        }
    }

    async logout() {
        await this.page.locator(this.profileIcon).click();
        await this.page.locator(this.logOut).click();
    }
}

module.exports = { UserManagementPageObjects };
