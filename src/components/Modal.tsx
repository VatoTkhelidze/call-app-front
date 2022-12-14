import styled from "styled-components";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { store } from "../store";
import { useState } from "react";
import { State, User } from "../types";

export default function AddQuestion(props: {
  modal: boolean;
  setModal: (modal: boolean) => void;
  toggle: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const addUser = store((state) => state.addRow);
  
  
  const handleModalClose = (response: any) => {
    if (response) {
      addUser({
        name: response.name,
        email: response.email,
        phone: response.phone,
        address: {
          street: response.street,
          city: response.city,
        },
        gender: response.gender,
      });
    }
  };

  const handleSave = () => {
    handleModalClose({
      id: new Date().getUTCMilliseconds(),
      name,
      email,
      phone,
      street,
      city,
      gender,
    });
    props.toggle();
  };

  const saveInfo: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      email !== "" &&
      gender !== "" &&
      street !== "" &&
      city !== "" &&
      phone !== ""
    ) {
      
    }
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={props.modal}
      toggle={props.toggle}
      modalTransition={{ timeout: 1000 }}
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
            type="number"
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
