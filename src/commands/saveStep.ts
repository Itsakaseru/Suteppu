import * as vscode from "vscode";

export default function saveStep(temporaryStorage: any)
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

        console.info(editor.document.fileName);

        console.info({ selectedText, startAtLine, endAtLine, textStartAt, textEndAt });
    }
}