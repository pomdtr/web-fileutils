// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { newFile, newFolder, copyFile, moveFile } from "./fileutils";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposables = [
    vscode.commands.registerCommand("fileutils.newFile", async () => {
      const targetUri = await newFile();
      if (targetUri) {
        vscode.commands.executeCommand("vscode.open", targetUri);
      }
    }),
    vscode.commands.registerCommand("fileutils.newFolder", newFolder),
    vscode.commands.registerCommand("fileutils.duplicate", async () => {
      const sourceUri = vscode.window.activeTextEditor?.document.uri;
      if (!sourceUri) {
        return;
      }
      const targetUri = await copyFile(sourceUri);
      if (targetUri) {
        await vscode.commands.executeCommand("vscode.open", targetUri);
      }
    }),
    vscode.commands.registerCommand("fileutils.move", async () => {
      const sourceUri = vscode.window.activeTextEditor?.document.uri;
      if (!sourceUri) {
        return;
      }
      await vscode.commands.executeCommand(
        "workbench.action.closeActiveEditor"
      );
      const targetUri = await moveFile(sourceUri);
      if (targetUri) {
        await vscode.commands.executeCommand("vscode.open", targetUri);
      }
    }),
    vscode.commands.registerCommand("fileutils.remove", async () => {
      if (!vscode.window.activeTextEditor) {
        return;
      }
	  const documentUri = vscode.window.activeTextEditor.document.uri;
      await vscode.commands.executeCommand(
        "workbench.action.closeActiveEditor"
      );
      await vscode.workspace.fs.delete(
		documentUri
      );
    }),
  ];

  context.subscriptions.push(...disposables);
}

// this method is called when your extension is deactivated
export function deactivate() {}
