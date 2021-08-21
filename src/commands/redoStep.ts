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

    await editor.edit(builder =>
    {
        const position = new vscode.Position(data.startAtLine, data.textStartAt);
        builder.insert(position, data.text);
    });

    suteppu.refresh();
}