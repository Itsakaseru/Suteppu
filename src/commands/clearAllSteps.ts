import * as vscode from "vscode";
import { SuteppuProvider } from "../provider/SuteppuProvider";
import IStorage from "../types/IStorage";

export default async function clearAllSteps(suteppu: SuteppuProvider, temporaryStorage: IStorage[])
{
    if (temporaryStorage.length === 0)
    {
        return;
    }

    if (await showConfirmMessage())
    {
        temporaryStorage.length = 0;
        suteppu.refresh();
    }
}

async function showConfirmMessage()
{
    const status = await vscode.window
        .showInformationMessage(
            "Do you really want to do this?",
            ...[ "Yes", "No" ]);

    switch (status)
    {
        case "Yes":
            return Promise.resolve(true);

        case "No":
            return Promise.resolve(false);
    }
}