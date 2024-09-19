class User1 {
    constructor(page) {
        this.page = page;
        this.userNav = "[title='Users']";
        this.addUserBtn = "//div[@class='sc-eIceNc bBJBCf']";
        this.fullNameInput = '//input[@placeholder="Enter Full Name"]';
        this.emailInput = "//input[@placeholder='Enter Email']";
        this.phoneNumberInput = '//input[@placeholder="Enter Phone Number"]';
        this.roleRadioBtn = '.ant-radio-input';
        this.createBtn = '//button[normalize-space()="Create"]';
        this.resetBtn = "//button[normalize-space()='Reset']";
        this.successMsg = "//span[normalize-space()='User Successfully created']";
        this.userFailMsg = "//span[normalize-space()='User Already Created']";
        this.closeBtn = "//div[@class='sc-imwrwD cDhqYw']//*[name()='svg']";
        this.tableContainer = "//table[@class='sc-hoMrV gLqMop']";
        this.tableRow = "//tbody/tr";
        this.prevBtn = "//span[@aria-label='left']//*[name()='svg']";
        this.nextBtn = "//span[@aria-label='right']//*[name()='svg']";
        this.profileIcon = "//div[@title='Naga Durga']";
        this.logOut = "//div[@class='sc-jXbVAB bVEWYo']";
        this.searchBar = "//input[@placeholder='search with Name , Email , Role']";
    }

    async launchUserPage() {
        await this.page.locator(this.userNav).click();
    }

    async createUser(fullName, email, phoneNumber) {
        await this.page.locator(this.addUserBtn).click();
        await this.page.locator(this.fullNameInput).fill(fullName);
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.phoneNumberInput).fill(phoneNumber);
        await this.page.locator(this.roleRadioBtn).last().check();
        await this.page.locator(this.createBtn).click();

        try {
            await Promise.race([
                this.page.locator(this.successMsg).waitFor({ state: 'visible' }),
                this.page.locator(this.userFailMsg).waitFor({ state: 'visible' })
            ]);

            if (await this.page.locator(this.successMsg).isVisible()) {
                console.log(`User ${fullName} created successfully.`);
            } else if (await this.page.locator(this.userFailMsg).isVisible()) {
                console.log(`User ${fullName} already exists.`);
                await this.page.locator(this.closeBtn).click();
            }
        } catch (error) {
            console.error(`Error handling user creation for ${fullName}: ${error}`);
        }

        await this.page.locator(this.addUserBtn).waitFor({ state: 'visible' });
    }

    async validateFields(fullName, email, phoneNumber) {
        await this.page.locator(this.addUserBtn).click();
        await this.page.locator(this.fullNameInput).fill(fullName);
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.phoneNumberInput).fill(phoneNumber);
        await this.page.locator(this.createBtn).click();

        if (await this.page.locator(this.emailErr).isVisible()) {
            console.log(`Email Error: ${await this.page.locator(this.emailErr).innerText()}`);
        }
        if (await this.page.locator(this.mobileErr).isVisible()) {
            console.log(`Mobile Error: ${await this.page.locator(this.mobileErr).innerText()}`);
        }
        if (await this.page.locator(this.fullNameErr).isVisible()) {
            console.log(`Full Name Error: ${await this.page.locator(this.fullNameErr).innerText()}`);
        }
        if (await this.page.locator(this.roleErr).isVisible()) {
            console.log(`Role Error: ${await this.page.locator(this.roleErr).innerText()}`);
        }
    }

    async getFieldLengths() {
        const fullNameValue = await this.page.locator(this.fullNameInput).inputValue();
        const emailValue = await this.page.locator(this.emailInput).inputValue();
        const phoneNumberValue = await this.page.locator(this.phoneNumberInput).inputValue();

        const fullNameLength = fullNameValue.length;
        const emailLength = emailValue.length;
        const phoneNumberLength = phoneNumberValue.length;

        console.log(`Full Name length: ${fullNameLength}`);
        console.log(`Email length: ${emailLength}`);
        console.log(`Phone Number length: ${phoneNumberLength}`);

        return {
            fullNameLength,
            emailLength,
            phoneNumberLength
        };
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
        const profileIconLocator = this.page.locator(this.profileIcon);
        await profileIconLocator.waitFor({ state: 'visible' });
        await profileIconLocator.first().click(); 
        await this.page.locator(this.logOut).waitFor({ state: 'visible' });
        await this.page.locator(this.logOut).click();
    }
}

module.exports = { User1 };
