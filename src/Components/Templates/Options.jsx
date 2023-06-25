import React, { useEffect } from "react";
import {Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addTemplate } from "../../Features/UserSlice";
import { useNavigate } from "react-router-dom";
 const Options = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleChange=(num)=>{
         dispatch(addTemplate(num));
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
      navigate("/form")
    };
    const handleCancel = () => {

      setIsModalOpen(false);
      navigate("/profile")
    };
    useEffect(()=>{
      showModal();
    })
  return (
    <div>
      <Modal title="Choose Your Template" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p onClick={()=>handleChange(1)}>Template 1</p>
        <p onClick={()=>handleChange(2)}>Template 2</p>
        <p onClick={()=>handleChange(3)}>Template 3</p>
      </Modal>
    </div>
  );
};
export default Options