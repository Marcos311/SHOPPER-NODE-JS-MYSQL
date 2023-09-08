import axios from "axios";
import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getPacks, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const pack = ref.current;

            pack.id.value = onEdit.id;
            pack.pack_id.value = onEdit.pack_id;
            pack.product_id.value = onEdit.product_id;
            pack.qty.value = onEdit.qty;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pack = ref.current;
        const quantity = parseInt(pack.qty.value);

        if (
            !pack.pack_id.value ||
            !pack.product_id.value ||
            isNaN(quantity)
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {

            await axios 
                .put("http://localhost:8801/" + onEdit.id, {
                    pack_id: pack.pack_id.value,
                    product_id: pack.product_id.value,
                    qty: pack.qty.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios 
                .post("http://localhost:8801/", {
                    pack_id: pack.pack_id.value,
                    product_id: pack.product_id.value,
                    qty: pack.qty.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        pack.pack_id.value = "";
        pack.product_id.value = "";
        pack.qty.value = "";

        setOnEdit(null);
        getPacks();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Id</Label>
                <Input name="id" />
            </InputArea>
            <InputArea>
                <Label>Código Pack</Label>
                <Input name="pack_id" />
            </InputArea>
            <InputArea>
                <Label>Código do Produto</Label>
                <Input name="product_id" />
            </InputArea>
            <InputArea>
                <Label>Quantidade</Label>
                <Input name="qty" />
            </InputArea>

            <Button type="submit">VALIDAR</Button>
        </FormContainer>
    );
};

export default Form;
