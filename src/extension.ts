import * as vscode from "vscode";
import saveStep from "./commands/saveStep";
import redoStep from "./commands/redoStep";

export function activate(context: vscode.ExtensionContext)
{
	console.log('[Suteppu] is now active!');

	const temporaryStorage: any = [];

	let cmdSaveStep = vscode.commands.registerCommand('suteppu.saveStep', () => saveStep(temporaryStorage));
	let cmdRedoStep = vscode.commands.registerCommand('suteppu.reStep', () => redoStep(temporaryStorage));

	context.subscriptions.push(cmdSaveStep);
	context.subscriptions.push(cmdRedoStep);
}

// this method is called when your extension is deactivated
export function deactivate() { }
