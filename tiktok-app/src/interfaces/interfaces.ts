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

export interface ILoggingUser {
  username: string;
  password: string;
}

export interface ISignUpUser {
  username: string;
  password: string;
  nickname: string;
  fullname: string;
}

export interface ICurrentUser {
  _id: string;
  username: string;
  nickname: string;
  fullname: string;
  avatarUrl: string;
  role: string;
  token: string;
  follow: any;
  following: any;
  myVideo: IVideo[];
  videoliked: any;
  updatedAt: string;
  createdAt: string;
  status: string;
  __v: number;
}

export interface IAccountItem {
  avatarUrl: string;
  nickname: string;
  fullname: string;
  _id?: string;
}
export interface IUploadingVideo {
  userId: string;
  videoTitle: string;
  videoHastag: string;
  videoUrl: string;
}
