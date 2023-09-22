import { SoftDeleteDocument } from "mongoose-delete";

export default interface StorageInterface extends SoftDeleteDocument{
    url: string;
    filename: string;
}