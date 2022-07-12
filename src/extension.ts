// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposables = [
    vscode.commands.registerCommand("fileutils.newFile", async () => {
      const uri = await vscode.window.showSaveDialog();
      if (!uri) {
        return;
      }
      await vscode.workspace.fs.writeFile(uri, new Uint8Array());
      vscode.commands.executeCommand("vscode.open", uri);
    }),
    vscode.commands.registerCommand("fileutils.newFolder", async () => {
      const uri = await vscode.window.showSaveDialog({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        filters: { Folders: [] },
      });
      if (!uri) {
        return;
      }
      await vscode.workspace.fs.createDirectory(
        uri.with({ path: uri.path.replace(/\.undefined$/, "") })
      );
      return uri;
    }),
    vscode.commands.registerCommand("fileutils.duplicate", async () => {
      const sourceUri = vscode.window.activeTextEditor?.document.uri;
      if (!sourceUri) {
        return;
      }

      const targetUri = await vscode.window.showSaveDialog({
        defaultUri: sourceUri,
      });
      if (!targetUri) {
        return;
      }

      await vscode.workspace.fs.copy(sourceUri, targetUri);
      await vscode.commands.executeCommand("vscode.open", targetUri);
    }),
    vscode.commands.registerCommand("fileutils.move", async () => {
      const sourceUri = vscode.window.activeTextEditor?.document.uri;
      if (!sourceUri) {
        return;
      }
      const targetUri = await vscode.window.showSaveDialog({
        defaultUri: sourceUri,
      });
      if (!targetUri) {
        return;
      }

      await vscode.workspace.fs.rename(sourceUri, targetUri);
      await vscode.commands.executeCommand("vscode.open", targetUri);
    }),

    vscode.commands.registerCommand("fileutils.remove", async () => {
      if (!vscode.window.activeTextEditor) {
        return;
      }
      const documentUri = vscode.window.activeTextEditor.document.uri;

      await vscode.commands.executeCommand(
        "workbench.action.closeActiveEditor"
      );
      await vscode.workspace.fs.delete(documentUri);
    }),
  ];

  context.subscriptions.push(...disposables);
}

// this method is called when your extension is deactivated
export function deactivate() {}
