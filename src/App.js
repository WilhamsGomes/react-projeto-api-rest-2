import './App.css';
import { useState } from 'react';
import api from "./service/api";

function App() {

  const [cep, setCep] = useState("")
  const [dados, setDados] = useState({})
  
  const consultarCep = (e) => {
    e.preventDefault();

    if(cep){

      let url = cep.trim() + '/json' 
      
      api.get(url).then((response) =>{
         if(!response.data.erro){
            var resultado = JSON.stringify(response.data);
            setDados(JSON.parse(resultado));
           
         }
         else{
            setDados({});
           
         }
      })
      .catch((error) =>{
        setDados({});
       
      }); 
    }

  }

  return (
    <div className="App">

        <h1>Consultar <span>CEP</span> </h1>

        <input type="number" name="cep" placeholder="ex: 46400-000" onChange={(e) => setCep(e.target.value)}></input>
        <button type="button" onClick={consultarCep}>Pesquisar</button>

        <div className="conteiner">
            <div className="titulo">
              <h3>CEP: {dados.cep}</h3>
              <p>{dados.localidade}, {dados.uf} </p>
            </div>

            <div className="conteiner-infos"> 
              <div className="infos-direita">
                <p> <span> Logradouro: </span> {dados?.logradouro}</p>
                <p> <span> CEP: </span> {dados?.cep} </p>
                <p> <span> Bairro: </span> {dados?.bairro}</p> 
              </div>
              <div className="infos-direita">
                <p> <span> Cidade: </span> {dados?.localidade}</p>
                <p> <span> UF: </span> {dados?.uf} </p>
                <p> <span> Código DDD: </span> {dados?.ddd}</p>
              </div>
            </div>

        </div>
        
    </div>
  );
}

export default App;
