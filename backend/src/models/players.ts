import mongoose, { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

const PlayersSchema = new Schema(
    {
        name: {
            type: String
        },
        nickname: {
            type: String
        },
        mediaId: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

PlayersSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const PlayersModel = model("players", PlayersSchema);

export default PlayersModel;