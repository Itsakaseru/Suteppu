import { TextDecoder } from "util";
import * as vscode from "vscode";
import { SuteppuProvider } from "../provider/SuteppuProvider";
import IStorage from "../types/IStorage";

export default async function loadFromFile(suteppu: SuteppuProvider, temporaryStorage: IStorage[])
{
    const workspace = vscode.workspace;

    const options: vscode.OpenDialogOptions = {
        canSelectMany: false,
        openLabel: "Open",
        "defaultUri": workspace.workspaceFolders ? workspace.workspaceFolders[ 0 ].uri : undefined,
        filters: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "Suteppu files": [ "suteppu" ]
        }
    };

    const fileUri = await vscode.window.showOpenDialog(options);

    if (!fileUri)
    {
        return;
    }

    if (temporaryStorage.length > 0)
    {
        if (!await showConfirmMessage())
        {
            return;
        }
    }

    const file = await workspace.fs.readFile(fileUri[ 0 ]);
    const newStorage = JSON.parse(new TextDecoder().decode(file));

    temporaryStorage.length = 0;
    temporaryStorage.push(...newStorage);

    suteppu.refresh();
}

async function showConfirmMessage()
{
    const status = await vscode.window
        .showInformationMessage(
            "Do you want to do this? All unsaved steps will be overwritten!",
            ...[ "Yes", "No" ]);

    switch (status)
    {
        case "Yes":
            return Promise.resolve(true);

        case "No":
            return Promise.resolve(false);
    }
}