import * as vscode from "vscode";
import * as path from "path";
import { TextEncoder } from "util";
import IStorage from "../types/IStorage";

export default async function saveToFile(temporaryStorage: IStorage[])
{
    const workspace = vscode.workspace;
    const editor = vscode.window.activeTextEditor;

    if (!editor)
    {
        return;
    }

    if (workspace.workspaceFolders)
    {
        const fileName = editor.document.fileName.split("\\").pop();
        const filePath = path.join(workspace.workspaceFolders[ 0 ].uri.fsPath, "suteppu", `${ fileName }.suteppu`);
        const fileUri = vscode.Uri.file(filePath);

        let fileExists = true;

        try
        {
            await vscode.workspace.fs.stat(fileUri);
        }
        catch
        {
            fileExists = false;
        }

        if (fileExists)
        {
            if (!await showConfirmMessage())
            {
                return;
            }
        }

        await workspace.fs.writeFile(fileUri, new TextEncoder().encode(JSON.stringify(temporaryStorage)));

        vscode.window.showInformationMessage(`Steps successfully saved in ${ filePath }`, ...[ "Ok" ]);
    }
    else // Not in workspace mode
    {
        const options: vscode.SaveDialogOptions = {
            "title": "Save steps",
            filters: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Suteppu files": [ "suteppu" ]
            }
        };

        const fileUri = await vscode.window.showSaveDialog(options);

        if (fileUri)
        {
            const filePath = fileUri.fsPath;

            // To make sure file will always be saved with .suteppu extension
            if (filePath.endsWith(".suteppu"))
            {
                await workspace.fs.writeFile(fileUri, new TextEncoder().encode(JSON.stringify(temporaryStorage)));
            }
            else
            {
                await workspace.fs.writeFile(vscode.Uri.file(`${ filePath }.suteppu`), new TextEncoder().encode(JSON.stringify(temporaryStorage)));
            }

            vscode.window.showInformationMessage(`Steps successfully saved in ${ filePath }`, ...[ "Ok" ]);
        }
    }
}

async function showConfirmMessage()
{
    const status = await vscode.window
        .showInformationMessage(
            "Suteppu with this file name already exists. Overwrite file?",
            ...[ "Yes", "No" ]);

    switch (status)
    {
        case "Yes":
            return Promise.resolve(true);

        case "No":
            return Promise.resolve(false);
    }
}