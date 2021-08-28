import * as vscode from "vscode";
import { SuteppuProvider } from "../provider/SuteppuProvider";
import IStorage from "../types/IStorage";

export default async function redoStep(suteppu: SuteppuProvider, temporaryStorage: IStorage[])
{
    const editor = vscode.window.activeTextEditor;

    if (!editor)
    {
        return;
    }

    const data = temporaryStorage.pop();

    if (!data)
    {
        return;
    }

    const startPos = new vscode.Position(data.startAtLine, data.textStartAt);

    const endPos = new vscode.Position(data.endAtLine, data.textEndAt);

    await editor.edit(builder =>
    {
        builder.insert(startPos, data.text);
    });

    const regex = /\S/gm;

    if (data.text.match(regex))
    {
        editor.selection = new vscode.Selection(startPos, endPos);
    }

    suteppu.refresh();
}