import * as vscode from "vscode";
import { SuteppuProvider } from "../provider/SuteppuProvider";
import IStorage from "../types/IStorage";

export default function saveStep(suteppu: SuteppuProvider, temporaryStorage: IStorage[])
{
    const editor = vscode.window.activeTextEditor;

    if (editor)
    {
        const document = editor.document;
        const selection = editor.selection;

        const textStartAt = selection.start.character;
        const textEndAt = selection.end.character;
        const startAtLine = selection.start.line;
        const endAtLine = selection.end.line;

        const selectedText = document.getText(selection);

        const data = {
            text: selectedText,
            startAtLine,
            endAtLine,
            textStartAt,
            textEndAt
        };

        temporaryStorage.push(data);

        // Delete selected text
        editor.edit(builder =>
        {
            builder.delete(selection);
        });

        console.log(temporaryStorage);

        suteppu.refresh();
    }
}