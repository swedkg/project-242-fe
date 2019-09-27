export interface AidRequest {
  id?: number;
  title?: string;
  desc?: string;
  lat?: number;
  lng?: number;
  status?: boolean;
  owner_id?: number;
  isOneTime?: boolean;
  // isUser?: boolean;
}
