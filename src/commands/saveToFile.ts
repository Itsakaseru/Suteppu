import * as vscode from "vscode";
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