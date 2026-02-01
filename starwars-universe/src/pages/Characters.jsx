import { useEffect, useState } from "react";

function Characters(){

    const [characters, setCharacters] = useState([]);
    const [selected, setSelected] = useState([]);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function loadCharacters() {
    setLoadingList(true);
    setError("");
    setSelected(null);

    try{

    }catch(e){
setError(e.message || "Failed to load characters .");
    }finally{
        setLoadingList(false);
    }
}

useEffect(()=>{loadCharacters();},[]);

    return(
        <div>

        </div>
    );
}

export default Characters;