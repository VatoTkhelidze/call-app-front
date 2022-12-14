import { store } from "../store";
import DataTable, { TableColumn } from "react-data-table-component";
import { User, State } from "../types";
import styled from "styled-components";
import PlusIcon from "../imgs/plus-icon.png";

interface Props {
  modal: boolean;
  editToggle: () => void;
  setModal: (modal: boolean) => void;
  toggle: () => void;
  setEditData: (user: User) => void;
}

export default function Table(props: Props) {
  const data = store((state: State) => state.data);
  const removeUser = store((state) => state.deleteRow);

  const customStyles = {
    headCells: {
      style: {
        marginTop: "30px",
      },
    },
  };

  const columns: any = [
    {
      name: "ID",
      selector: (user: User) => user.id,
    },
    {
      name: "Person",
      selector: (user: User) => user.name,
    },
    {
      name: "Phone",
      selector: (user: User) => user.phone,
    },
    {
      name: "Email",
      selector: (user: User) => user.email,
    },
    {
      name: "Gender",
      selector: (user: User) => user.gender,
    },
    {
      name: "City",
      selector: (user: User) => user.address.city,
    },
    {
      name: "Street",
      selector: (user: User) => user.address.street,
    },
    {
      name: "Remove",
      selector: (user: User) => (
        <Xbutton onClick={() => removeUser(user.id)}>Remove User</Xbutton>
      ),
    },
  ];


  return (
    <>
      <AddButton onClick={props.toggle}>
        <Plus src={PlusIcon} /> Add User
      </AddButton>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={data}
        onRowDoubleClicked={(row) => {
          props.setEditData(row)
          props.editToggle()
        }}
      />
    </>
  );
}

const AddButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 10px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 10px;
  border: 1.5px solid black;
`;
const Xbutton = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  border: 1.5px solid black;
  background: red;
  color: white;
  :hover {
    background: gray;
  }
`;

const Plus = styled.img`
  width: 30px;
  height: 30px;
`;
