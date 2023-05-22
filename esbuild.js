const esbuild = require('esbuild');
const { sassPlugin } = require("esbuild-sass-plugin");

let ctx = esbuild
    .context({
        entryPoints: ["app/Application.tsx", "app/style.scss"],
        outdir: "public/assets",
        bundle: true,
        minify: true,
        plugins: [sassPlugin()],
    })

    ctx.then(ctx => ctx.watch().then(console.log('watching...')))