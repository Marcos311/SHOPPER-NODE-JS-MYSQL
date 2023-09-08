import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Table = styled.table`
    width: 180%;
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 1000px;
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

const Grid = ({ packs, setPacks, setOnEdit }) => {

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8801/" + id)
            .then(({ data }) => {
                const newArray = packs.filter((pack) => pack.id !== id);

                setPacks(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));
        
        setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>Código do Pack</Th>
                    <Th>Código do Produto</Th>
                    <Th>Quantidade</Th>
                </Tr>
            </Thead>
            <Tbody>
                {packs.map((item, i) => (
                    <Tr key={i}>
                        <Td width="10%">{item.id}</Td>
                        <Td width="20%">{item.pack_id}</Td>
                        <Td width="30%">{item.product_id}</Td>
                        <Td width="20%">{item.qty}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)}/>
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)}/>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;