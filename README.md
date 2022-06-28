# File Utils

An clone of the [File Utils Extension](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils) with browser support.

Do not install both extensions, because one will be overwritten by the other.

## Settings

This extension use the system file dialog for file selection. You can change this behavior by setting the `files.simpleDialog.enable` setting to true.

```jsonc
{
  // Enables the simple file dialog. The simple file dialog replaces the system file dialog when enabled.
  "files.simpleDialog.enable": false,
}
```

## Disclaimer

**Important:** This extension due to the nature of it's purpose will create files on your hard drive and if necessary create the respective folder structure. While it should not override any files during this process, I'm not giving any guarantees or take any responsibility in case of lost data.
