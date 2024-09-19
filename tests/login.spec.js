import { Login } from '../POM/Login'
import { User } from "../POM/User";
import { User1 } from '../POM/User1';
const{test,expect}=require('@playwright/test')
test("Successful login",async({page})=>{
    const login = new Login(page)
    await login.launchPage()
    await login.loginDetails('7569147913')
    
    const user = new User(page)

    const usersArray = [
        
        // { full_name: 'another-test21', email: 'another@test.com', phone_number: '8876543210' },
        // { full_name: 'test-user20', email: 'test@test.com', phone_number: '8876123456' },
        { full_name: 'user-16', email: 'user13@test.com', phone_number: '8876111114' },
        { full_name: 'user-1', email: 'user1@test.com', phone_number: '8876111111' },
        { full_name: 'user-2', email: 'user2@test.com', phone_number: '8876222222' },
        { full_name: 'user-3', email: 'user3@test.com', phone_number: '8876333333' },
        { full_name: 'user-4', email: 'user4@test.com', phone_number: '8876444444' },
        { full_name: 'user-5', email: 'user5@test.com', phone_number: '9876555555' },
        { full_name: 'user-6', email: 'user6@test.com', phone_number: '8876666666' },
        { full_name: 'user-7', email: 'user7@test.com', phone_number: '8876777777' },
        { full_name: 'user-8', email: 'user8@test.com', phone_number: '8876888888' },
        { full_name: 'user-8', email: 'user8@test.com', phone_number: '8876888888' },
        { full_name: 'user-15', email: 'user11@test.com', phone_number: '8876111112' },
        { full_name: 'user-16', email: 'user12@test.com', phone_number: '8876111113' },
        { full_name: 'user-16', email: 'user13@test.com', phone_number: '8876111114' },
        { full_name: 'user-19', email: 'user14@test.com', phone_number: '8876111115' },
        { full_name: 'user-177', email: 'user15@test.com', phone_number: '8876111116' },
        { full_name: 'user-176', email: 'user10@test.com', phone_number: '8876101010' },
        { full_name: 'user-19', email: 'user19@test.com', phone_number: '8876111120' },
        { full_name: 'user-20', email: 'user20@test.com', phone_number: '8876111121' },
        { full_name: 'user-21', email: 'user21@test.com', phone_number: '8876111122' },
        { full_name: 'user-22', email: 'user22@test.com', phone_number: '8876111123' },
        { full_name: 'user-23', email: 'user23@test.com', phone_number: '8876111124' },
        { full_name: 'user-24', email: 'user24@test.com', phone_number: '8876111125' },
        { full_name: 'user-25', email: 'user25@test.com', phone_number: '8876111126' },
        { full_name: 'user-26', email: 'user26@test.com', phone_number: '8876111127' },
        { full_name: 'user-27', email: 'user27@test.com', phone_number: '8876111128' },
        { full_name: 'user-28', email: 'user28@test.com', phone_number: '8876111129' },
        { full_name: 'user-29', email: 'user29@test.com', phone_number: '8876111130' },
        { full_name: 'user-30', email: 'user30@test.com', phone_number: '8876111131' }
    ];
    for (const userObj of usersArray) {
        await user.createUser(userObj.full_name, userObj.email, userObj.phone_number);
        await page.waitForTimeout(2000); 
    }
    
    //creating user
    // await user.createUser('Durga','durga@test.com','7569147914')
    // await page.waitForTimeout(3000);

    //count all details
    await user.totalUsers()
    await page.waitForTimeout(3000)

    //search and extract user details
    console.log("USer details are....")
    await user.searchUser("ADMIN")
    await page.waitForTimeout(3000)

    await user.isScrollable()
    await page.waitForTimeout(3000)


})

