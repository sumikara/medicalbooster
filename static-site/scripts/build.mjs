import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const sourceDir = root;
const pagesDir = path.join(sourceDir, "pages");
const distDir = path.join(sourceDir, "dist");
const assetsDir = path.join(sourceDir, "assets");
const distAssetsDir = path.join(distDir, "assets");

function readPartial(partialPath) {
  const filePath = path.join(sourceDir, `${partialPath}.html`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing partial: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function render(template) {
  return template.replace(/\{\{>\s*([^}]+?)\s*\}\}/g, (_, includePath) => {
    return readPartial(includePath.trim());
  });
}

function copyDir(source, target) {
  if (!fs.existsSync(source)) return;
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

fs.mkdirSync(distDir, { recursive: true });

for (const file of fs.readdirSync(pagesDir)) {
  if (!file.endsWith(".src.html")) continue;
  const source = fs.readFileSync(path.join(pagesDir, file), "utf8");
  const output = render(source);
  const outputName = file.replace(".src.html", ".html");
  fs.writeFileSync(path.join(distDir, outputName), output);
  console.log(`Built ${outputName}`);
}

copyDir(assetsDir, distAssetsDir);
if (fs.existsSync(assetsDir)) {
  console.log("Copied assets to dist/assets");
}
