import * as vscode from "vscode";

export async function moveFile(
  sourceUri: vscode.Uri
) {
  const targetUri = await vscode.window.showSaveDialog({ defaultUri: sourceUri });
  if (!targetUri) {
    return;
  }
  await vscode.workspace.fs.rename(sourceUri, targetUri);
  return targetUri;
}

export async function copyFile(sourceUri: vscode.Uri) {
  const targetUri = await vscode.window.showSaveDialog({
    defaultUri: sourceUri,
  });
  if (!targetUri) {
    return;
  }
  await vscode.workspace.fs.copy(sourceUri, targetUri);
  return targetUri;
}

export async function newFile(defaultUri?: vscode.Uri) {
  const uri = await vscode.window.showSaveDialog({ defaultUri });
  if (!uri) {
    return;
  }
  await vscode.workspace.fs.writeFile(uri, new Uint8Array());
  return uri;
}

export async function newFolder(defaultUri?: vscode.Uri) {
  const uri = await vscode.window.showSaveDialog({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    filters: { Folders: [] },
    defaultUri,
  });
  if (!uri) {
    return;
  }
  await vscode.workspace.fs.createDirectory(
    uri.with({ path: uri.path.replace(/\.undefined$/, "") })
  );
  return uri;
}
