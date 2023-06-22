export interface IVideo {
  _id: string;
  videoUrl: string;
  videoTitle: string;
  videoHastag: string;
  ownerVideo: {
    _id: string;
    avatarUrl: string;
    nickname: string;
    fullname: string;
  };
  like: any;
  comment: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
