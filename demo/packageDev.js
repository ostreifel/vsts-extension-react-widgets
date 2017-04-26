var exec = require("child_process").exec;

// Package extension
var command = `tfx extension create --manifest-globs ./demo/vss-extension.json`;
exec(command, (error, stdout) => {
    if (error) {
        console.error(`Could not create package: '${error}'`);
        return;
    }

    console.log(`Package created`);
});