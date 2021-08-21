import * as vscode from "vscode";
import saveStep from "./commands/saveStep";
import redoStep from "./commands/redoStep";
import saveToFile from "./commands/saveToFile";
import loadFromFile from "./commands/loadFromFile";
import { SuteppuProvider } from "./provider/SuteppuProvider";

export function activate(context: vscode.ExtensionContext)
{
	console.log("[Suteppu] is now active!");

	const temporaryStorage: any = [];

	const suteppu = new SuteppuProvider(temporaryStorage);

	vscode.window.registerTreeDataProvider(
		"suteppu-storage",
		suteppu
	);

	vscode.window.createTreeView("suteppu-storage", {
		treeDataProvider: suteppu
	});

	let cmdSaveStep = vscode.commands.registerCommand("suteppu.saveStep", () => saveStep(suteppu, temporaryStorage));
	let cmdRedoStep = vscode.commands.registerCommand("suteppu.reStep", () => redoStep(suteppu, temporaryStorage));
	let cmdSaveToFile = vscode.commands.registerCommand("suteppu.saveToFile", () => saveToFile(temporaryStorage));
	let cmdLoadFromFile = vscode.commands.registerCommand("suteppu.loadFromFile", () => loadFromFile(suteppu, temporaryStorage));

	context.subscriptions.push(cmdSaveStep);
	context.subscriptions.push(cmdRedoStep);
	context.subscriptions.push(cmdSaveToFile);
	context.subscriptions.push(cmdLoadFromFile);
}

// this method is called when your extension is deactivated
export function deactivate() { }
