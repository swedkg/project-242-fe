export interface AidRequest {
  // body: any;
  id: number;
  title: string;
  desc: string;
  lat: number;
  lng: number;
  status: boolean;
  owner_id: number;
  responders: {
    ids: Array<number>;
    details: object;
  };
  isOneTime: boolean;
  // isUser?: boolean;
}
