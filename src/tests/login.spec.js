import { expect } from "@playwright/test";
import { test } from "../tests/pages/base.ts"
import { LoginPage } from "./pages/login.page";
import { inValidUser, validUser } from "./test-data/user";


test("TC-001 Input fields should display as the data that was filled", async ({
  page,
}) => {
  const login = new LoginPage(page);

  await login.goto();
  await expect(page).toHaveURL("https://www.saucedemo.com/");

  await login.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/inventory\.html/);
});

test("TC-002 Should show an error message if log in without a username", async ({
  page,
}) => {
  const login = new LoginPage(page);

  await login.goto();
  await expect(page).toHaveURL("https://www.saucedemo.com/");

  await login.login("", "secret_sauce");

  await login.getErrorText();
  await expect(login.errorMessage).toContainText("Epic sadface");
});

for (const { username, password } of validUser) {
  test(`TC-005 Should logged in successfully with valid credentials ${username}`, async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.goto();

    await login.login(username, password);
    await expect(page).toHaveURL(/inventory\.html/);
  });
}

for (const { username, password } of inValidUser) {
  test(`TC-006 Should logged in fails with an error message when using invalid credentials ${username}`, async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(username, password);
    await login.getErrorText();
    await expect(login.errorMessage).toContainText("Epic sadface");
  });
}

