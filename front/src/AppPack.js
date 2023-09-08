import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/FormPack.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [packs, setPacks] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getPacks = async () => {
    try{
      const res = await axios.get("http://localhost:8801");
      setPacks(res.data.sort((a, b) => (a.qty > b.qty ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getPacks();
  }, [setPacks]);

  return (
    <>
      <Container>
        <Title>Produtos</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getPacks={getPacks}/>
        <Grid products={packs} setPacks={setPacks} setOnEdit={setOnEdit}/>
      </Container>
      <ToastContainer autoClose={3000} postion={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
