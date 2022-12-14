import styled from "styled-components";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { store } from "../store";
import { useState, useEffect } from "react";
import { State, User } from "../types";

export default function EditModal(props: {
  editModal: boolean;
  setEditModal: (editModal: boolean) => void;
  editData: User | undefined;
  editToggle: () => void;
}) {
  const [name, setName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [gender, setGender] = useState<string | undefined>("male");
  const [street, setStreet] = useState<string | undefined>("");
  const [city, setCity] = useState<string | undefined>("");
  const [phone, setPhone] = useState<string | undefined>("");
  const updateRow = store((state) => state.updateRow);
  
  useEffect(() => {
    setName(props?.editData?.name);
    setEmail(props?.editData?.email);
    setGender(props?.editData?.gender);
    setStreet(props?.editData?.address.street);
    setCity(props?.editData?.address.city);
    setPhone(props?.editData?.phone);
  }, [props.editData])
console.log(props.editData?.phone);

  const handleModalClose = (response: any) => {
    if (response) {
      updateRow({
        name: response.name,
        email: response.email,
        phone: response.phone,
        address: {
          street: response.street,
          city: response.city,
        },
        gender: response.gender,
        id: response.id
      });
    }
  };

  const handleSave = () => {
    handleModalClose({
      id: props?.editData?.id,
      name,
      email,
      phone,
      street,
      city,
      gender,
    });
    props.editToggle();
  };

  const saveInfo: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={props.editModal}
      toggle={props.editToggle}
      modalTransition={{ timeout: 1000 }}
      style={{background:"red"}}
    >
      <ModalHeader>Add a new user</ModalHeader>
      <ModalBody>
        <Form onSubmit={saveInfo}>
          <label htmlFor="nameInp">Name</label>
          <QuestionInput
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="nameInp"
            placeholder="Write your fullname . . ."
            type="text"
            required
          />
          <label htmlFor="emailInp">Email</label>
          <QuestionInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="emailInp"
            placeholder="Write your Email . . ."
            type="text"
            required
          />
          <label htmlFor="genderInp">Gender</label>
          <Select
            name="gender"
            id="genderInp"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nottosay">Prefer not to say</option>
          </Select>
          <label htmlFor="addressInp">Address</label>
          <QuestionInput
            onChange={(e) => setCity(e.target.value)}
            value={city}
            id="addressInp"
            placeholder="City"
            type="text"
            required
          />
          <QuestionInput
            onChange={(e) => setStreet(e.target.value)}
            value={street}
            placeholder="Street"
            type="text"
            required
          />
          <label htmlFor="phoneInp">Phone</label>
          <QuestionInput
            onChange={(e) => setPhone(e.target.value)}
            id="phoneInp"
            placeholder="+995 555 12 34 56"
            type="text"
            value={phone}
            required
          />
          <Save onClick={handleSave}>Save</Save>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Cancel>Cancel</Cancel>
      </ModalFooter>
    </Modal>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const QuestionInput = styled.input`
  width: 80%;
  outline: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Select = styled.select`
  width: 80%;
  height: 30px;
  outline: none;
`;

const Cancel = styled.button`
  all: unset;
  margin-right: 5px;
`;

const Save = styled.button`
  margin-left: auto;
  width: 50px;
  border: 1.5px solid black;
  color: white;
  background-color: #00cd0a;
  border-radius: 8px;
`;
