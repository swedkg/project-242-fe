export interface Message {
  id?: number;
  request_id?: number;
  fullfilment_id?: number;
  sender_id?: number;
  receiver_id?: number;
  message?: string;
  status?: number;
  fullfilment_status?: boolean;
}
