import * as vscode from "vscode";
import { SuteppuProvider } from "../provider/SuteppuProvider";
import IStorage from "../types/IStorage";
import { IStats } from "../types/IStats";

export default async function redoStep(suteppu: SuteppuProvider, temporaryStorage: IStorage[], status: IStats)
{
    const editor = vscode.window.activeTextEditor;

    if (!editor)
    {
        status.reStep = true;
        return;
    }

    const data = temporaryStorage.pop();

    if (!data)
    {
        status.reStep = true;
        return;
    }

    const startPos = new vscode.Position(data.startAtLine, data.textStartAt);

    const endPos = new vscode.Position(data.endAtLine, data.textEndAt);

    await editor.edit(builder =>
    {
        builder.insert(startPos, data.text);
    }).then(() => {
        status.reStep = true;
    });

    const regex = /\S/gm;

    if (data.text.match(regex))
    {
        editor.selection = new vscode.Selection(startPos, endPos);
    }

    suteppu.refresh();
}