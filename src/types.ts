type ApiShortPdItem = {
  id: number;
  value: string;
};

interface Calendar {}

interface Candidate {
  email: String;
  key: String;
  hasPhoto: Boolean;
  isPhotoAccepted: Boolean;
  photo?: String;
  name: String;
  surname1: String;
  surname2?: String;
  fullName: String;
  city: String;
  province: ApiShortPdItem;
  publicProfileLink: String;
  status: number;
  validatedMail: number;
  accountCreation: Calendar;
  lastCVUpdate?: Calendar;
  lastInscripcion?: Calendar;
  extendedBannerAttributes: String;
  subSegment: String;
  id: number;
  emailHash: String;
}

export type OperationPath = 'candidate' | 'dictionary' | 'curriculum' | 'offer' | 'application' | 'coverletter';
