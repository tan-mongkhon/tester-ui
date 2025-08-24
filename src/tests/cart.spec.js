import {test,expect} from '@playwright/test'
import {LoginPage} from '../tests/pages/login.page'
import { ProductPage } from '../tests/pages/product.page';
// import { CartPage } from '../tests/pages/cart.page';

test('The cart badge should displays the correct number of items currently in the cart',async({page})=>{
    const login = new LoginPage(page);
    const product = new ProductPage(page);
    // const cart = new CartPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);

    const target = ['Sauce Labs Backpack' , 'Sauce Labs Bike Light'];
    await product.addProductByName(target);
    await product.goToCart();
    await expect(product.cartBadge).toHaveText('2');

})