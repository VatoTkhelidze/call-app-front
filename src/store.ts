import create from "zustand";
import axios from "axios";
import { State, User } from "./types";
export const store = create<State>((set) => ({
  data: [],
  loading: false,
  error: false,

  fetch: async () => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get("http://localhost:3001/");
      return set({ data: response.data, loading: false });
    } catch (error) {
      console.log(error);
    }
  },
  deleteRow: (id: number) =>
    set((state: State) => ({
      data: state.data.filter((person: User) => person.id !== id),
    })),
  addRow: (person: User) =>
    set((state: State) => ({
      data: [
        {
          name: person.name,
          id: new Date().getUTCMilliseconds(),
          email: person.email,
          address: {
            street: person?.address?.street,
            city: person?.address?.city,
          },
          phone: person.phone,
          gender: person.gender,
        },
        ...state.data,
      ],
    })),
  updateRow: (person: User) =>
    set((state: State) => ({
      data: state.data.map((item) => {
        if (item.id === person.id) {
          return {
            name: person.name,
            id: person.id,
            email: person.email,
            address: {
              street: person.address.street,
              city: person.address.city,
            },
            phone: person.phone,
            gender: person.gender,
          };
        } else {
          return item;
        }
      }),
    })),
}));
