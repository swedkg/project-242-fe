export interface Message {
  id?: number;
  requester_id?: number;
  user_id?: number;
  request_id?: number;
  isActive?: boolean;
  message?: string;
  timestamp?: number;
}
