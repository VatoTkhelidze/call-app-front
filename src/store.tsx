import create from "zustand";
import axios from "axios";
import { User } from "./types";



type State = {
  data: User[];
  loading: boolean;
  error: boolean;
}


export function store(){
  const useStore = create((set) => ({
    data: [],
    loading: false,
    error: false,

    fetch:async () => {
      set(() => ({ loading: true }));
      try {
        const response = await axios.get('http://localhost:3001/');
        set({ data: await response.data, loading: false });
      } catch (error){
        console.log(error);
      }
    },
    deleteRow: (id: number) =>
      set((state: State) => ({
        data: state.data.filter((person: User) => person.id !==id),
      })),
    addRow: (person: User) =>
      set((state: State) => ({
        data: [
          {
            name: person.name,
            id: new Date().getUTCMilliseconds(),
            email: person.email,
            address: {
              street: person.address.street,
              city: person.address.city,
            },
            phone: person.phone,
            gender: person.gender
          },
          ...state.data,
        ],
      })),
    updateRow: (person: User) => 
      set((state: State) => ({
        data: state.data.map((item) => {
          if(item.id === person.id) {
            return{
              name: person.name,
              id: person.email,
              address: {
                street: person.address.street,
                city: person.address.city,
              },
              phone: person.phone,
              gender: person.gender,
            };
          } else{
            return item;
          }
        }),
      }))
  }))
}