({
    mainConfigFile: "js/main.js",
    // Copy entire app to 'dir', optimizing CSS as we go
    appDir: ".",
    baseUrl: "js",
    // Output directory
    dir: "build",
    // We'll only optimize the modules listed below
    skipDirOptimize: true,
    paths: {
        "requirejs": "../bower_components/requirejs/require"
    },
    modules: [
        {
            name: "main"
        },
        {
            name: "requirejs"
        }
    ]
})
