import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        font-family: 'poppins', sans-serif;
    }

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        background-color: #00FFC7;;
    }


    header {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    }`;



export default Global;