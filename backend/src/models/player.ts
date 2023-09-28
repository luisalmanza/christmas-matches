import mongoose, { Model, Schema, model } from "mongoose";
import mongooseDelete, { SoftDeleteModel } from "mongoose-delete";
import PlayerInterface from "../interfaces/player.interface";

const PlayerSchema = new Schema<PlayerInterface>(
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
);

PlayerSchema.static("findAllData", function findAllData() {
    const joinData: any = this.aggregate([
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "photo"
            }
        },
        {
            $unwind: "$photo"
        },
        {
            $project: {
                _id: 1,
                name: 1,
                nickname: 1,
                mediaId: 1,
                createdAt: 1,
                updatedAt: 1,
                "photo._id": 1,
                "photo.url": 1,
                "photo.filename": 1,
                "photo.createdAt": 1,
                "photo.updatedAt": 1
            }
        }
    ]);

    return joinData;
});

PlayerSchema.static("findOneItem", function findOneItem(id) {
    const joinData: any = this.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "photo"
            }
        },
        {
            $unwind: "$photo"
        }
    ]);

    return joinData;
});

PlayerSchema.plugin(mongooseDelete, { overrideMethods: "all" });
interface PlayerModel extends Model<PlayerInterface>, SoftDeleteModel<PlayerInterface> {
    findAllData(): any;
    findOneItem(id: number): any;
}
const PlayerModel = model<PlayerInterface, PlayerModel>("players", PlayerSchema);

export default PlayerModel;