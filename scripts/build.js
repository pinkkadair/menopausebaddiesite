const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const outputRoot = path.join(projectRoot, "build");
const publicRoot = path.join(projectRoot, "public");

const jsxFiles = [
  "tweaks-panel.jsx",
  "components/hero.jsx",
  "components/learn.jsx",
  "components/chapters.jsx",
  "components/closers.jsx",
  "app.jsx",
];

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.rmSync(publicRoot, { recursive: true, force: true });

for (const sourcePath of jsxFiles) {
  const absoluteSourcePath = path.join(projectRoot, sourcePath);
  const outputPath = path.join(outputRoot, sourcePath.replace(/\.jsx$/, ".js"));
  const sourceCode = fs.readFileSync(absoluteSourcePath, "utf8");
  const result = esbuild.transformSync(sourceCode, {
    loader: "jsx",
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    legalComments: "none",
    minify: true,
    sourcemap: false,
    target: "es2019",
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${result.code}\n`);
}

const publicFiles = [
  "index.html",
  "styles.css",
  "site-config.js",
  "robots.txt",
  "sitemap.xml",
  "menopause-baddie-launch.html",
];

const publicDirectories = [
  "assets",
  "build",
];

fs.mkdirSync(publicRoot, { recursive: true });

for (const filePath of publicFiles) {
  fs.copyFileSync(path.join(projectRoot, filePath), path.join(publicRoot, filePath));
}

for (const directoryPath of publicDirectories) {
  fs.cpSync(path.join(projectRoot, directoryPath), path.join(publicRoot, directoryPath), { recursive: true });
}

console.log(`Built ${jsxFiles.length} files into ${path.relative(projectRoot, outputRoot)}/`);
console.log(`Prepared Vercel output in ${path.relative(projectRoot, publicRoot)}/`);
