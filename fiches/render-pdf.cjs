const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const fiches = [
  "fiche-fevrier-2026",
  "fiche-mars-2026",
  "fiche-avril-2026",
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  const outDir = path.resolve(__dirname, "pdf");
  fs.mkdirSync(outDir, { recursive: true });

  for (const name of fiches) {
    const src = "file://" + path.resolve(__dirname, `${name}.html`);
    const out = path.join(outDir, `${name}.pdf`);
    await page.goto(src, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    console.log("Generated:", out);
  }

  await browser.close();
})();
