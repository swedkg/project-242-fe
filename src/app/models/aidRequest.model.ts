export interface AidRequest {
  id?: number;
  title?: string;
  isOneTime?: boolean;
  isUser?: boolean;
  lat?: number;
  lng?: number;
  fulfilled?: boolean;
  requester_id?: number;
  description?: string;
}
