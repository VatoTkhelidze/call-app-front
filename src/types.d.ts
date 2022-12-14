export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
};

export type State = {
  data: User[];
  loading: boolean;
  error: boolean;
  fetch: () => Promise<void>;
  addRow: any;
  deleteRow: (id:number)=> void;
  updateRow: (person:User)=> void;
};
