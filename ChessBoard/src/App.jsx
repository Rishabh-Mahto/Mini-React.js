import "./App.css";
import ChessBoard from "./components/ChessBoard";
import styled from "styled-components";

const AppStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <AppStyle>
      <h1 style={{}}>Chess Board</h1>
      <ChessBoard />
    </AppStyle>
  );
}

export default App;
