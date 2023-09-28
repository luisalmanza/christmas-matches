import PhotoInterface from "./photo.interface";

export default interface PlayerInterface {
    _id: string;
    name: string;
    nickname: string;
    mediaId: string;
    createdAt: string;
    updatedAt: string;
    photo: PhotoInterface;
    looser?: boolean;
}
