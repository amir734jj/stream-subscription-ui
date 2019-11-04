class ContractorProfilePhoto {
  id: string;
  mimeType: string;
  bytes: Uint8Array;
  name: string;
}

export default class Contractor {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  profilePhoto: ContractorProfilePhoto;
}
