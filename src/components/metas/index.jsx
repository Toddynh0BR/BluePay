import * as S from './style';

import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';

// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.min.css';


import { api } from '../../services/api';
import Swal from 'sweetalert2';

import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";

export function Metas({id}) {
    const [sellers, setSellers] = useState(null);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    });// Alertas  

    function formatarData(dataString) {
     const data = new Date(dataString + "T12:00:00"); // Adicionamos o horário para evitar erro de fuso horário
  
     return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
     }).replace('.', ''); // Remove o ponto que o JS às vezes coloca após o mês (ex: "jan.")
    };// Formatar data 

    function calculatePercent(total, fixo) {
        let percent = total / fixo
        if (percent > 1.0) return 0.99
        if (percent == 0) return 0.01
        return percent
    };// Calcular porcentagem

    function calculateProximity(bigger, smaller) {
       const Result = bigger - smaller;

       return Result > 200 ? false : true;
    }; 

    function calculateProximity2(bigger, smaller) {
       const Result = bigger - smaller;

       return Result > 2 ? false : true;
    }; 


    async function fetchInfors() {
        try {
          const Response = await api.get('/show/goal');
        
          setMeta(Response.data.Metas);
          setSellers(Response.data.ProductsForSeller || []);
          setNumberS(Response.data.Metas.number);
          setValue(Response.data.Metas.value);
          setReward(Response.data.Metas.reward);

          setSNumber(Response.data.Metas.super_number);
          setSValue(Response.data.Metas.super_value);
          setSReward(Response.data.Metas.super_reward);
          setSuperDue(Response.data.Metas.super_due_date);

          return setLoading(false)
        } catch(error) {
          console.error(error);
          Toast.fire({
            icon: "error",
            title: error.data.error || 'Erro ao busca metas e vendedores'
          });
          setMeta({})
          setSellers([])
          return setLoading(false)
        };
    };

    useEffect(()=> {
      fetchInfors()
    }, []);

    const [sending, setSending] = useState(false)
    const [edit, setEdit] = useState(false);

    const [snumber, setNumberS] = useState(null);
    const [sreward, setReward] = useState(null);
    const [svalue, setValue] = useState(null);

    const [superNumber, setSNumber] = useState(null);
    const [superReward, setSReward] = useState(null);
    const [superValue, setSValue] = useState(null);
    const [superDue, setSuperDue] = useState(null);

    async function handleAddMeta() {
      setSending(true);
      console.log('enviando', snumber, svalue, sreward, superNumber, superValue, superReward, superDue)

      try {
        const Response = await api.put('/edit-goal', { 
                                       value: svalue,
                                       number: snumber,
                                       reward: sreward,
                                       super_value: superValue, 
                                       super_number: superNumber,
                                       super_reward: superReward,
                                       super_due_date: superDue
                                      });
        
        if (Response.status != 200) throw new Error(Response.data.error);

        Toast.fire({
          title: 'Meta alterada com sucesso!',
          icon: 'success'
        });

        setEdit(false);
        fetchInfors();

      } catch (error) {
        console.error(error)
        Toast.fire({
          title: error.message || error.response.data.error || 'Erro ao salvar meta.',
          icon: 'error'
        })
      } finally {
        setSending(false);
      };
    };

    if (loading || meta == null || sellers == null) return <S.Loading><div></div></S.Loading>;


    return !edit ?
     <S.Container>
      {
       id ?
        null
      :
       <div className="edit">
        <h1 onClick={()=> setEdit(true)}>Editar Meta</h1>
       </div>
      }
      
      <div className="top">
       <div className="meta">
        <h4>Meta de Venda</h4>
       
         <h3>{meta?.number || 0} Vendas  e</h3>
         
         <h2>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(meta?.value || 0.00)}</h2>
        <p>individual</p>
       </div>

       <div className="meta">
        <h4>Super Meta</h4>
       
         <h3>{meta?.super_number || 0} Vendas  e</h3>
         
         <h2>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(meta?.super_value || 0.00)}</h2>
       <p>individual</p>
       </div>

       <div className="meta">
        <h4>Premiação</h4>
         
         <h1>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(meta?.reward || 0.00)}</h1>
       
        {meta?.reward > 0 ? <p>Válido até fim do mês</p> : null}
       </div>

       <div className="meta">
        <h4>Super Premiação</h4>
         
         <h1>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(meta?.super_reward || 0.00)}</h1>
       
       {meta?.super_reward > 0 ? <p>Válido até {formatarData(meta.super_due_date)}</p> : null}
       </div>
      </div>

      <div className="gauges">
       <div className="content">
        <h2>Valor em Vendas dos Vendedores</h2>
         <div className="gauge">
          <GaugeChart id="gauge-chart2" 
           colors={[ "rgba(227, 89, 255, 1) ",  "rgba(133, 0, 199, 1)", "rgba(75, 0, 204, 1)", "rgba(0, 0, 198, 1)",]} 
           nrOfLevels={10} 
           hidenumber={true}
           percent={sellers && meta ?
            calculatePercent(sellers.map(seller => seller.value).reduce((total, value) => total + value, 0), meta.value * sellers.length) :
            0.0
           } 
           needleColor="rgba(75, 0, 204, 1)" 
           needleBaseColor="rgb(62, 4, 164)"
           
           animateDuration={20000}
           arcPadding={0.01}
         />
         <span>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(meta && sellers.length ? meta.value * sellers.length : 0.00)}</span>  
         <div className="bottom">
          <div className="actual">
           Atual: {
                sellers ? 
                new Intl
                   .NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'})
                   .format(sellers.map(seller => seller.value).reduce((total, value) => total + value, 0))
                :
                 0.00
                }
          </div>   
         </div> 
        </div>
       </div>
        
       <div className="content">
        <h2>Meta de Vendas</h2>
         <div className="gauge">
          <GaugeChart id="gauge-chart2" 
           colors={[ "rgba(227, 89, 255, 1) ",  "rgba(133, 0, 199, 1)", "rgba(75, 0, 204, 1)", "rgba(0, 0, 198, 1)",]} 
           nrOfLevels={20} 
           percent={sellers && meta ?
            calculatePercent(sellers.map(seller => seller.products).reduce((total, value) => total + value, 0), meta.number * sellers.length)
            :
            0.0
           } 
           needleColor="rgba(75, 0, 204, 1)" 
           needleBaseColor="rgb(62, 4, 164)"
           hideText
           arcPadding={0.01}
           animateDuration={20000}
         />
         <span>{meta && sellers.length ? meta.number * sellers.length : 0} Vendas</span>  
         <div className="bottom">
          <div className="actual">
           Atual: {
            sellers ?
            sellers.map(seller => seller.products).reduce((total, value) => total + value, 0)
            :
            0
           }
          </div>   
         </div> 
        </div>
       </div>
      </div>

      <div className="rankings">
        <div className="ranking">
         <h2>Ranking dos Vendedores</h2>
         <ul>
          { sellers ? 
           sellers.length ?
            sellers.sort((a, b) => b.value - a.value).map((seller, index)=> (
             <li key={seller.id}>
               <strong>{index + 1}º</strong>
               <img src={`https://pay-blue.onrender.com/${seller.avatar}`} alt="" />
               <p>{seller.name}</p>
               <div className="space"></div>
               <span>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(seller.value)}</span>
               { 
                index === sellers.sort((a, b) => b.value - a.value).length - 1 ?
                calculateProximity(sellers.sort((a, b) => b.value - a.value)[index - 1].value, seller.value) ? 
                 <FaChevronCircleUp size={20} color='green'/>: <FaChevronCircleDown size={20} color='red'/> 
                :
                index == 0 ?
                calculateProximity(seller.value, sellers.sort((a, b) => b.value - a.value)[index + 1].value) ? 
                 <FaChevronCircleDown size={20} color='red'/> : <FaChevronCircleUp size={20} color='green'/> 
                :
                calculateProximity(seller.value, sellers.sort((a, b) => b.value - a.value)[index + 1].value) ? 
                 <FaChevronCircleDown size={20} color='red'/> : <FaChevronCircleUp size={20} color='green'/> 
               }
             </li>
            ))
           :
           <p>Nenhum vendedor encontrado</p>
           :
           <p>Buscando vendedores...</p>
          }
         </ul>
        </div>

        <div className="ranking">
         <h2>Ranking de Vendas</h2>
           <ul>
          { sellers ? 
           sellers.length ?
            sellers.sort((a, b) => b.products - a.products).map((seller, index)=> (
             <li key={seller.id}>
               <strong>{index + 1}º</strong>
               <img src={`https://pay-blue.onrender.com/${seller.avatar}`} alt="" />
               <p>{seller.name}</p>
               <div className="space"></div>
               <span>{seller.products} {seller.products <= 1 ? 'Venda' : 'Vendas'}</span>
               { 
                index === sellers.sort((a, b) => b.products - a.products).length - 1 ?
                calculateProximity2(sellers.sort((a, b) => b.products - a.products)[index - 1].products, seller.products) ? 
                 <FaChevronCircleUp size={20} color='green'/>: <FaChevronCircleDown size={20} color='red'/> 
                :
                index == 0 ?
                calculateProximity2(seller.products, sellers.sort((a, b) => b.products - a.products)[index + 1].products) ? 
                 <FaChevronCircleDown size={20} color='red'/> : <FaChevronCircleUp size={20} color='green'/> 
                :
                calculateProximity2(seller.products, sellers.sort((a, b) => b.products - a.products)[index + 1].products) ? 
                 <FaChevronCircleDown size={20} color='red'/> : <FaChevronCircleUp size={20} color='green'/> 
               }
             </li>
            ))
           :
           <p>Nenhum vendedor encontrado</p>
           :
           <p>Buscando vendedores...</p>
          }
         </ul>
        </div>
      </div>

      { id ? 
      <div className="gauges">
       <div className="content">
        <h2>Seu Valor em Vendas</h2>
         <div className="gauge">
          <GaugeChart id="gauge-chart2" 
           colors={[ "rgba(227, 89, 255, 1) ",  "rgba(133, 0, 199, 1)", "rgba(75, 0, 204, 1)", "rgba(0, 0, 198, 1)",]} 
           nrOfLevels={10} 
           percent={sellers && meta ?
            calculatePercent(sellers.find(seller => seller.id === id).value, meta.value) :
            0.0
           } 
           needleColor="rgba(75, 0, 204, 1)" 
           needleBaseColor="rgb(62, 4, 164)"
           hideText
           animateDuration={10000}
           arcPadding={0.01}
         />
         <span>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(meta && sellers.length ? meta.value  : 0.00)}</span>  
         <div className="bottom">
          <div className="actual">
           Atual: {
                sellers ? 
                new Intl
                   .NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'})
                   .format(sellers.find(seller => seller.id === id).value)
                :
                 0.00
                }
          </div>   
         </div> 
        </div>
       </div>
        
       <div className="content">
        <h2>Seu Número de Vendas</h2>
         <div className="gauge">
          <GaugeChart id="gauge-chart2" 
           colors={[ "rgba(227, 89, 255, 1) ",  "rgba(133, 0, 199, 1)", "rgba(75, 0, 204, 1)", "rgba(0, 0, 198, 1)",]} 
           nrOfLevels={20} 
           percent={sellers && meta ?
            calculatePercent(sellers.find(seller => seller.id === id).products, meta.number)
            :
            0.0
           } 
           needleColor="rgba(75, 0, 204, 1)" 
           needleBaseColor="rgb(62, 4, 164)"
           hideText
           arcPadding={0.01}
           animateDuration={10000}
         />
         <span>{meta && sellers.length ? meta.number : 0} Vendas</span>  
         <div className="bottom">
          <div className="actual">
           Atual: {
            sellers ?
            sellers.find(seller => seller.id === id).products
            :
            0
           }
          </div>   
         </div> 
        </div>
       </div>
      </div>
      :
      null
      }
     </S.Container>
    :
     <S.Edit>
      <div className="top">
       <h3>Editar metas</h3>

       <h5 onClick={()=> setEdit(false)}>Cancelar</h5>
      </div>

       <div className="row">
        <div className="input-wrapper">
         <label htmlFor="number">Numero de Vendas</label>
         <input 
          id='number'
          min="1"
          type="number" 
          value={snumber}
          placeholder='Ex: 30'
          onChange={(e)=> setNumberS(e.target.value)}
         />
        </div>

        <div className="input-wrapper">
         <label htmlFor="value">Valor da meta</label>
         <InputNumber
          id='value'
          value={svalue}
          onValueChange={(e) => setValue(e.value)}
          mode="currency"
          currency="BRL"
          locale="pt-BR"
          min={0}
          placeholder="Ex: R$ 50.000,00"
        />
        </div>

        <div className="input-wrapper">
         <label >Premiação</label>
         <InputNumber
          value={sreward}
          onValueChange={(e) => setReward(e.value)}
          mode="currency"
          currency="BRL"
          locale="pt-BR"
          min={0}
          placeholder="Ex: R$ 5.000,00"
        />
        </div>     
       </div>

       <div className="row">
        <div className="input-wrapper">
         <label >Super Numero de Vendas</label>
         <input 
          min="1"
          type="number" 
          value={superNumber}
          placeholder='Ex: 60'
          onChange={(e)=> setSNumber(e.target.value)}
         />
        </div>

        <div className="input-wrapper">
         <label htmlFor="svalue">Super Valor da meta</label>
         <InputNumber
          id='svalue'
          value={superValue}
          onValueChange={(e) => setSValue(e.value)}
          mode="currency"
          currency="BRL"
          locale="pt-BR"
          min={0}
          placeholder="Ex: R$ 80.000,00"
        />
        </div>

        <div className="input-wrapper">
         <label htmlFor="value">Super Premiação</label>
         <InputNumber
          value={superReward}
          onValueChange={(e) => setSReward(e.value)}
          mode="currency"
          currency="BRL"
          locale="pt-BR"
          min={0}
          placeholder="Ex: R$ 8.000,00"
        />
        </div>

        <div className="input-wrapper">
         <label htmlFor="due">Vencimento da Super Premiação</label>
         <Calendar 
          value={superDue} 
          dateFormat="yy/mm/dd"
          placeholder='Ex: 26/04/2026'
          onChange={(e) => setSuperDue(e.value)} 
         />
 
        </div>
       </div>

       <div className="finalRow">
        <button onClick={()=> handleAddMeta()}>
          { sending ? 'Salvando...' : 'Salvar'}
        </button>
       </div>
     </S.Edit>
};