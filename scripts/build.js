const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const outputRoot = path.join(projectRoot, "build");

const jsxFiles = [
  "tweaks-panel.jsx",
  "components/hero.jsx",
  "components/learn.jsx",
  "components/chapters.jsx",
  "components/closers.jsx",
  "app.jsx",
];

fs.rmSync(outputRoot, { recursive: true, force: true });

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

console.log(`Built ${jsxFiles.length} files into ${path.relative(projectRoot, outputRoot)}/`);
