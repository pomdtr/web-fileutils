# File Utils

A clone of the [File Utils Extension](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils) with support for remote workspaces.

Do not install both extensions, because one will overwrite the other.

## Notice

This extension works best when the simple dialog is used for file operations. To enable it, add the following to your settings.json:

```json
"files.simpleDialog.enable": true
```

## Disclaimer

**Important:** This extension due to the nature of it's purpose will create files on your hard drive and if necessary create the respective folder structure. While it should not override any files during this process, I'm not giving any guarantees or take any responsibility in case of lost data.
