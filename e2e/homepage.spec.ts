import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders the page heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "UltraKit" })).toBeVisible();
  });

  test("displays the starter kit badge", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Starter Kit")).toBeVisible();
  });

  test("shows component buttons", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Primary" })).toBeVisible();
  });
});
