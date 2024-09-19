// test.spec.js
import { Login } from "../POM/Login";
import { User1 } from "../POM/User1";
const { test, expect } = require('@playwright/test');

test("User Creation", async ({ browser }) => {
    const context = await browser.newContext({
        viewport: { width: 1200, height: 600 },
    });
    const page = await context.newPage();

    const login = new Login(page);
    await login.launchPage();
    await login.loginDetails('7569147913');

    const user = new User1(page);
    await user.launchUserPage();

    const extendedUsersArray = Array.from({ length: 5 }, (v, i) => ({
        fullName: `test-${1201 + i}`,
        email: `user${1201 + i}@test.com`,
        phoneNumber: `888100${1201 + i}`
    }));

    async function createUsers() {
        const times = [];
        const gaps = [];
        const recordCreationCounts = [];
        const startTime = performance.now();
        let previousEndTime = startTime;

        let recordCount = 0;
        let recordsInOneMinute = 0;
        const interval = setInterval(() => {
            recordCreationCounts.push(recordsInOneMinute);
            recordsInOneMinute = 0;
        }, 60000);
        for (const userObj of extendedUsersArray) {
            const userStartTime = performance.now();
            await user.createUser(userObj.fullName, userObj.email, userObj.phoneNumber);
            const userEndTime = performance.now();

            times.push(userEndTime - userStartTime);
            gaps.push(userStartTime - previousEndTime);

            previousEndTime = userEndTime;
            recordCount++;
            recordsInOneMinute++;
        }

        clearInterval(interval);

        const totalTimeTaken = performance.now() - startTime;
        const averageTimeTaken = times.reduce((a, b) => a + b, 0) / times.length;
        const averageTimeGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
        const recordsPerMinute = recordCreationCounts.reduce((a, b) => a + b, 0) / recordCreationCounts.length;

        console.log(`Total time taken for bulk user creation: ${(totalTimeTaken / 1000).toFixed(2)} seconds`);
        console.log(`Average time taken per user creation: ${(averageTimeTaken / 1000).toFixed(2)} seconds`);
        console.log(`Average time gap between user creations: ${(averageTimeGap / 1000).toFixed(2)} seconds`);
        console.log(`Average records created per minute: ${recordsPerMinute}`);

        return {
            totalTimeTaken,
            averageTimeTaken,
            averageTimeGap,
            recordsPerMinute
        };
    }

    await createUsers();
    // await user.handlePagination()
    await user.logout()
    await page.waitForTimeout(3000)
    // await login.launchPage();
    await login.loginDetails('7569147913');
    await context.close()
});
