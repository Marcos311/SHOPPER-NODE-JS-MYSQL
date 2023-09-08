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
    background-color: green;
    color: white;
    height: 42px;
`;

const Form = ({ getProducts, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const product = ref.current;

            product.code.value = onEdit.code;
            product.name.value = onEdit.name;
            product.cost_price.value = onEdit.cost_price;
            product.sales_price.value = onEdit.sales_price;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = ref.current;
        const salesPrice = parseFloat(product.sales_price.value);
        const costPrice = parseFloat(product.cost_price.value);

        if (
            !product.code.value ||
            !product.name.value ||
            isNaN(salesPrice) ||
            isNaN(costPrice)
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (costPrice > salesPrice) {
            return toast.warn("Preço de venda inferior ao preço de custo!");
        }

        if (onEdit) {
            const originalSalesPrice = onEdit.sales_price;
            const priceDifference = Math.abs(originalSalesPrice - salesPrice);
            const maxPriceDifference = originalSalesPrice * 0.10;

            if (priceDifference > maxPriceDifference) {
                return toast.warn("O reajuste não pode ser maior ou menor que 10% do preço atual!");
            }


            await axios 
                .put("http://localhost:8800/" + onEdit.code, {
                    code: product.code.value,
                    name: product.name.value,
                    cost_price: product.cost_price.value,
                    sales_price: product.sales_price.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios 
                .post("http://localhost:8800/", {
                    code: product.code.value,
                    name: product.name.value,
                    cost_price: product.cost_price.value,
                    sales_price: product.sales_price.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        product.code.value = "";
        product.name.value = "";
        product.cost_price.value = "";
        product.sales_price.value = "";

        setOnEdit(null);
        getProducts();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Código</Label>
                <Input name="code" />
            </InputArea>
            <InputArea>
                <Label>Nome</Label>
                <Input name="name" />
            </InputArea>
            <InputArea>
                <Label>Custo do Produto</Label>
                <Input name="cost_price" />
            </InputArea>
            <InputArea>
                <Label>Preço de Venda</Label>
                <Input name="sales_price" />
            </InputArea>
            <Button type="submit">VALIDAR</Button>
        </FormContainer>
    );
};

export default Form;
