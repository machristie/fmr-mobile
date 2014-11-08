({
    mainConfigFile: "js/main.js",
    baseUrl: "js",
    // Output directory
    dir: "build/js",
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
