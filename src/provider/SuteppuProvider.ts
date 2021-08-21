import * as vscode from "vscode";
import IStorage from "../types/IStorage";

class Suteppu extends vscode.TreeItem
{
    constructor(
        public readonly label: string,
    )
    {
        super(label);
        this.tooltip = label;
    }
}

export class SuteppuProvider implements vscode.TreeDataProvider<Suteppu>
{
    private _onDidChangeTreeData: vscode.EventEmitter<Suteppu | undefined | null | void> = new vscode.EventEmitter<Suteppu | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<Suteppu | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor(private storage: IStorage[]) { }

    getTreeItem(element: Suteppu): vscode.TreeItem | Thenable<vscode.TreeItem>
    {
        return element;
    }

    getChildren(element?: Suteppu): vscode.ProviderResult<any[]>
    {
        if (!element)
        {
            return Promise.resolve(this.getStorageData());
        }
    }

    private getStorageData(): Suteppu[]
    {
        const data: Suteppu[] = [];

        for (let i = 0; i < this.storage.length; i++)
        {
            const label = `[Step #${ this.storage.length - i }]`;
            data.unshift(new Suteppu(label));
        }

        return data;
    }

    public refresh(): void
    {
        this._onDidChangeTreeData.fire();
    }
}