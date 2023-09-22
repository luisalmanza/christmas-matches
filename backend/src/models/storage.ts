import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

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
const StorageModel = model("storage", StorageSchema);

export default StorageModel;