import Landing from "./pages/Landing";
import Characters from "./pages/Characters";
import { Routes, Route } from "react-router-dom";
import Films from "./pages/Films";


export default function App(){
  return(  <div>
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/characters" element={<Characters />} />
    <Route path="/films" element={<Films />} />
    </Routes>
    </div>
    
  );



}