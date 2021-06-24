export type AuthData = {
  name: string;
  email: string;
  password: string;
};

export type S3ImageType = {
  url: string;
  key: string;
};

export interface ConsultantType {
  _id: string;
  price?: number;
  experience: number;
  avgRating: number;
  promoDescription: string;
  nicheArea: string;
  elaboration: string;
  mainMarketingHead: string;
  website: string;
  facebook: string;
  linked: string;
  stripe_seller?: {
    charges_enabled: boolean;
  };
  promoImage: S3ImageType;
  consultantImage: S3ImageType;
  user?: any;
  phone: string;
}

export interface UserType {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  isConsultant: boolean;
}

export interface LoginResponseType {
  status: string;
  token: string;
  data: {
    user: UserType;
  };
}

export interface Category {
  _id?: string;
  name: string;
  image: {
    url: string;
    key: string;
  };
  content: string;
}

export interface BookingType {
  consultant: any;
  user: any;
  numOfDays: number;
  communicationType: string;
}

export interface ChatType {
  _id?: string;
  users: ["string", "string"];
}

export interface MessageType {
  _id?: string;
  sender: UserType;
  message: string;
  chatId: string;
}

export type base64Type = string | File | Blob | ProgressEvent<FileReader>;

export type ICommunicationType = "chat" | "voice" | "video";
