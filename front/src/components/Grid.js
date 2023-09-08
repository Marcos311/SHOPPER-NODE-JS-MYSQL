import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import React, { useState } from "react";

const Table = styled.table`
    width: 150%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 2000px;
    margin: 20px auto;
    word-break: break-all;    
    margin-left: -160px;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
    
    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
`;

const Grid = ({ products, setProducts, setOnEdit }) => {

    const handleEdit = (item) => {
        setOnEdit(item);
    };
    

    const handleDelete = async (code) => {
        await axios
            .delete("http://localhost:8800/" + code)
            .then(({ data }) => {
                const newArray = products.filter((product) => product.code !== code);

                setProducts(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));
        
        setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Código</Th>
                    <Th>Nome</Th>
                    <Th>Custo do Produto</Th>
                    <Th>Preço de Venda</Th>
                </Tr>
            </Thead>
            <Tbody>
                {products.map((item, i) => (
                    <Tr key={i}>
                        <Td width="5%">{item.code}</Td>
                        <Td width="30%">{item.name}</Td>
                        <Td width="10%">{item.cost_price}</Td>
                        <Td width="10%">{item.sales_price}</Td>
                        <Td alignCenter width="3%">
                            <FaEdit onClick={() => handleEdit(item)}/>
                        </Td>
                        <Td alignCenter width="3%">
                            <FaTrash onClick={() => handleDelete(item.code)}/>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;