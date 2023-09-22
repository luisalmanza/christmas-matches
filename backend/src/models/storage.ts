import { Model, Schema, model } from "mongoose";
import mongooseDelete, { SoftDeleteModel } from "mongoose-delete";
import StorageInterface from "../interfaces/storage.interface";

const StorageSchema = new Schema<any>(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

StorageSchema.plugin(mongooseDelete, { overrideMethods: "all" });
interface StorageModel extends Model<StorageInterface>, SoftDeleteModel<StorageInterface> {}
const StorageModel = model<StorageInterface, StorageModel>("storage", StorageSchema);

export default StorageModel;