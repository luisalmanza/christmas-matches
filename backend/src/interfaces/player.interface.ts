import { SoftDeleteDocument } from "mongoose-delete";

export default interface PlayerInterface extends SoftDeleteDocument {
    name: string;
    nickname: string;
    mediaId: any;
}