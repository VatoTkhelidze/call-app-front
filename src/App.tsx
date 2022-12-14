import React, { useEffect } from 'react';
import Table from './components/Table';
import { store } from './store';
import { State, User } from './types';
import { useState } from "react";
import Modal from "./components/Modal";
import EditModal from './components/EditModal';
import Chart from './components/Chart';




function App() {
  const callFetch = store((state: State) => state.fetch)
  useEffect(()=>{
    callFetch();
  },[callFetch])

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [editModal, setEditModal] = useState(false);
  const editToggle = () => setEditModal(!editModal);
  const [editData, setEditData] = useState<User | undefined>();

  

  return (
    <>
      <Chart/>
      <Modal toggle={toggle} modal={modal} setModal={setModal}/>
      <EditModal editData={editData} editToggle={editToggle} editModal={editModal} setEditModal={setEditModal}/>
      <Table setEditData={setEditData} editToggle={editToggle} toggle={toggle} modal={modal} setModal={setModal}/>
    </>
  )
}

export default App;
