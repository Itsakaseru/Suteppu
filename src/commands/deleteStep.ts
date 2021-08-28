import { Suteppu, SuteppuProvider } from "../provider/SuteppuProvider";
import IStorage from "../types/IStorage";

export default function deleteStep(suteppu: SuteppuProvider, temporaryStorage: IStorage[], step: Suteppu)
{
    temporaryStorage.splice(parseInt(step.id), 1);
    suteppu.refresh();
}