import * as vscode from "vscode";

export default async function redoStep(temporaryStorage: any)
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
}