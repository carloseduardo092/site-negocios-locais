import Hero from "./components/Hero";
import Services from "./components/Services";
import CTA from "./components/CTA";
import Exemplo from "./Exemplo"; 
import ExemploLanchonete from "./ExemploLanchonete";  
import "./styles.css";


import { BrowserRouter,Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <CTA />
            </>
          }
        />
        <Route path="/exemplo" element={<Exemplo />} />
         <Route path="/lanchonete" element={<ExemploLanchonete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
