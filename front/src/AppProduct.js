import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/FormProduct";
import FormPack from "./components/FormPack";
import Grid from "./components/Grid";
import GridPack from "./components/GridPack";
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

const ToggleButton = styled.button`
  margin-top: 10px;
`;

function App() {
  const [products, setProducts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [packs, setPacks] = useState([]);

  const [isProductFormVisible, setIsProductFormVisible] = useState(true);
  const [isProductGridVisible, setIsProductGridVisible] = useState(true);

  const toggleFormAndGrid = () => {
    setIsProductFormVisible(!isProductFormVisible);
    setIsProductGridVisible(!isProductGridVisible);
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setProducts(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const getPacks = async () => {
    try {
      const res = await axios.get("http://localhost:8801");
      setPacks(res.data.sort((a, b) => (a.qty > b.qty ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (isProductFormVisible) {
      getProducts();
    } else {
      getPacks();
    }
  }, [isProductFormVisible]);

  return (
    <>
      <Container>
        <Title>{isProductFormVisible ? 'Produtos' : 'Pacotes'}</Title>
        <ToggleButton onClick={toggleFormAndGrid}>Alternar</ToggleButton>
        {isProductFormVisible ? (
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getProducts={getProducts} />
        ) : (
          <FormPack onEdit={onEdit} setOnEdit={setOnEdit} getPacks={getPacks} />
        )}
        {isProductGridVisible ? (
          <Grid products={products} setProducts={setProducts} setOnEdit={setOnEdit} />
        ) : (
          <GridPack packs={packs} setPacks={setPacks} setOnEdit={setOnEdit} />
        )}
        
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
