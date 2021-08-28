import * as vscode from "vscode";
import * as path from "path";
import { TextEncoder } from "util";
import IStorage from "../types/IStorage";

export default async function redoStep(temporaryStorage: IStorage[])
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

        await workspace.fs.writeFile(vscode.Uri.file(filePath), new TextEncoder().encode(JSON.stringify(temporaryStorage)));

        vscode.window.showInformationMessage("Steps successfully saved in :workspace folder:/suteppu/filename.ext.suteppu", ...[ "Ok" ]);
    }
}