import * as S from "./style";

import { useAuth } from '../../hooks/auth';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Swal from 'sweetalert2';

import { InputNumber } from 'primereact/inputnumber';
import BluePayOne from '../../assets/BluePay.png';

import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { IoReload } from "react-icons/io5";

export function Calculator() {
    const { Logout, User } = useAuth();
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
    });//Alertas    

    ////////////////////////////////////////////////////////
    ////////            Calculadora                 ////////
    ////////////////////////////////////////////////////////
    const [payContext, setPayContext] = useState('parcelado');//contexto de pagamento ex: misto, parcelado, avista
    const [parcelas, setParcelas] = useState(1);//numero de parcelas
    const [methodP, setMethodP]= useState('');//metodo de pagamento das parcelas
    const [price, setPrice] = useState(0.00);//preço do produto a ser comprado

    const [parcelase, setParcelasE] = useState(1);//parcelas da entrada(se entranceM for igual a credito)
    const [entrance, setEntrance] = useState(0.00);//valor da entrada
    const [entranceM, setEntranceM] = useState('pix')//forma de pagamento da entrada ex pix, boleto, credito
    const [entranceP, setEntranceP] = useState(0.00)

    const [finalE, setFinalE] = useState(0.00)//preço final da entrada
    const [finalP, setFinalP] = useState(0.00);//preço final das parcelas
    const [finalA, setFinalA] = useState(0.00)//preço final avista

    const formatarDinheiro = new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',});

    function primeirosDoisNomes(nomeCompleto) {
   if (!nomeCompleto) return "";

   const partes = nomeCompleto.trim().split(/\s+/); // separa por espaços múltiplos

   if (partes.length <= 2) {
    return nomeCompleto.trim(); // se tiver 1 ou 2 nomes, retorna tudo
  }

   return `${partes[0]} ${partes[1]}`;
    };

    const TaxasCredito = {
  1: 0.059,   // 5,9%
  2: 0.109,   // 10,9%
  3: 0.119,   // 11,9%
  4: 0.129,   // 12,9%
  5: 0.1399,  // 13,99%
  6: 0.1459,  // 14,59%
  7: 0.1659,  // 16,59%
  8: 0.1759,  // 17,59%
  9: 0.179,   // 17,9%
 10: 0.209,   // 20,9%
 11: 0.2199,  // 21,99%
 12: 0.229    // 22,9%
    };//taxas de crédito por número de parcelas

    function calcularTaxaCredito(valorTotal, parcelasCount) {
  const parcelasNum = Number(parcelasCount) || 1;
  const taxaCredito = TaxasCredito[parcelasNum] || TaxasCredito[1];
  return Number((valorTotal * taxaCredito).toFixed(2));
    }

    useEffect(() => {
  // PAGAMENTO PARCELADO
  if (payContext === 'parcelado') {
    if (!parcelas || !methodP || !price) return;

    const valorParcela = price / parcelas;

    const taxa = methodP === 'credito'
      ? calcularTaxaCredito(price, parcelas)
      : 4.99 * parcelas;

    setFinalP((price + taxa) / parcelas);
  }

  // PAGAMENTO MISTO
  if (payContext === 'misto') {
    if (!parcelas || !methodP || !price || !entrance) return;
    if (entrance > price) return;

    const valorParcela = (price - entrance) / parcelas;

    const taxa = methodP === 'credito'
      ? calcularTaxaCredito(valorParcela, 1)
      : 4.99;

    setFinalP(valorParcela + taxa);

    if (entrance && entranceM) {
      let taxae;

      if (entranceM === 'credito') {
        if (!parcelase) return;
        taxae = calcularTaxaCredito(entrance, parcelase);

        setEntranceP((entrance + taxae) / parcelase)
      } else {
        taxae = 4.99;
      }

      setFinalE(entrance + taxae);
    }
  }

  // PAGAMENTO À VISTA
  if (payContext === 'avista') {
    if (!methodP || !price) return;

    const valorFinal = price;

    const taxa = methodP === 'credito'
      ? calcularTaxaCredito(valorFinal, 1)
      : 4.99;

    setFinalA(valorFinal + taxa);
  }
     }, [payContext, parcelas, methodP, price, entrance, entranceM, parcelase]);

    ////////////////////////////////////////////////////////
    ////////         Calculadora Fim                ////////
    ////////////////////////////////////////////////////////    

    ////////////////////////////////////////////////////////
    ////////              Clientes                  ////////
    ////////////////////////////////////////////////////////   
    
    const [reload, setReload] = useState(false);
    const [clients, setClients] = useState(null);
    const [modified, setModified] = useState([]);   
    const [closed, setClosed] = useState([])
    const [saving, setSaving] = useState(false)

    async function FetchUsers() {
      setReload(true);
      setClients(null)
      setModified([])
      
      setTimeout(async ()=> {
        try {
        const response = await api.get('/clients');
        
          setClients(response.data || []);
       
       } catch(error) {
        console.error(error)
        return Toast.fire({
                    icon: "error",
                    title: error.response.data.error || 'Erro ao buscar clientes'
                });
       } finally {
        setReload(false)
       }
      }, 2400)

    };

    function toggleValue(id) {
     setClosed(prev =>
        prev.includes(id)
          ? prev.filter(v => v !== id) 
          : [...prev, id]             
      );
    };

    function updateClientField(id, field, value) {
  setModified(prev => {
    const exists = prev.find(item => item.id === id);

    if (exists) {
      return prev.map(item =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      );
    }

    const original = clients.find(item => item.id === id);
    return [...prev, { ...original, [field]: value }];
  });
    };

    async function handleSave() {
     // validação antes de enviar
     for (const item of modified) {
     // verifica nome
     if (!item.name || item.name.trim() === "") {
       alert(`O campo nome do cliente ID ${item.id} não pode estar vazio.`);
       setSaving(false)
      return;
     }

     // verifica email
     if (item.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(item.email)) {
        alert(`Email inválido para o cliente ID ${item.id}`);
        setSaving(false)
        return;
      }
     }

     // verifica senha
     if (item.password && item.password.length < 6) {
      alert(`A senha do cliente ID ${item.id} deve ter pelo menos 6 caracteres.`);
      setSaving(false)
      return;
     }

     // verifica CPF
     if (item.cpf && item.cpf.replace(/\D/g, "").length !== 11) {
      alert(`CPF inválido para o cliente ID ${item.id}`);
      setSaving(false)
      return;
     }

     // verifica CNPJ
     if (item.cnpj && item.cnpj.replace(/\D/g, "").length !== 14) {
      alert(`CNPJ inválido para o cliente ID ${item.id}`);
      setSaving(false)
      return;
     }
     
  }

  // se passar na validação, envia os dados
  try {
    for (const item of modified) {
      await api.put(`/edit/user`, {
        id: item.id,
        name: item.name || '',
        email: item.email || '',
        password: item.password || '',
        cpf: item.cpf || null,
        cnpj: item.cnpj || null
      });
    }

    Toast.fire({
                    icon: "success",
                    title: 'Informações atualizadas com sucesso!'
                });
    setModified([]); // limpa o array de modificados
  } catch (error) {
    console.error(error);
    alert("Ocorreu um erro ao salvar as alterações.");
  } finally {
    setSaving(false)
  }
    };

    useEffect(()=> {
FetchUsers()
    }, [])

    

    if (!User?.id) return <S.Loading><div></div></S.Loading>;

    return(
     <S.Container>
      <S.Main>
        <header>
         <div>
          <img src={BluePayOne} alt="BluePay" />
         
         <h2>
          Olá {primeirosDoisNomes(User.name)}! <br />
          <h5>Acesse seu(s) link(s) de pagamento aqui.</h5>
         </h2>
  
         </div>
  
         <TbLogout2 onClick={()=> Logout()} size={30} fontWeight='bold' color='#333333'/>
        </header>

        <div className="content">
         <div className="calculator">
          <h3>Calculadora de juros/taxas</h3>

          <div className="row">
         <div className="input-wrapper">
         <label htmlFor="price" >Valor do Produto</label>
         <div className="priceDiv">
          <div className="real">R$</div>
          <InputNumber id="price" onChange={(e)=> setPrice(e.value)} mode="currency" currency="BRL" locale="pt-BR" placeholder="0,00"/>
         </div>
         </div>  

         <div className="input-wrapper">
         <label htmlFor="method" >Contexto de Pagamento</label>
          <select value={payContext} onChange={(e)=> {setPayContext(e.target.value); setMethodP(e.target.value == 'avista' ? 'credito' : 'boleto')}} id="method" >
              <option value="parcelado">Parcelado Boleto/Pix</option>
              <option value="avista">Cartão de Crédito</option>
              <option value="misto">Misto</option>
          </select>
         </div>  
          </div>     
        
          {
              payContext === 'parcelado' ?
               <div className="row">
          <div className="input-wrapper">
  <label htmlFor="parcelas">Número de parcelas</label>

  <div className="priceDiv">
    <select
      value={parcelas}
      onChange={(e) => setParcelas(Number(e.target.value))}
      id="parcelas"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <option key={i+1} value={i+1}>{i+1}</option>
      ))}
    </select>

    <div className="incrementDecrement">
      <p onClick={() => setParcelas(prev => prev === 12 ? 12 : prev + 1)}>+</p>
      <p onClick={() => setParcelas(prev => prev === 1 ? 1 : prev - 1)}>–</p>
    </div>
  </div>
          </div>

         <div className="input-wrapper">
         <label htmlFor="method" >Forma de Pagamento</label>
          <select value={methodP} onChange={(e)=> setMethodP(e.target.value)} id="method" >
              <option value="boleto">Boleto</option>
              <option value="pix">Pix</option>
          </select>
         </div>  
               </div>    
              :
                payContext === 'avista' ?
  //              <div className="row">
 
  //               { methodP == 'credito' ? 
  //                <div className="input-wrapper">
  // <label htmlFor="parcelas">Número de parcelas</label>

  // <div className="priceDiv">
  //   <select
  //     value={parcelas}
  //     onChange={(e) => setParcelas(Number(e.target.value))}
  //     id="parcelas"
  //   >
  //     {Array.from({ length: 12 }, (_, i) => (
  //       <option key={i+1} value={i+1}>{i+1}</option>
  //     ))}
  //   </select>

  //   <div className="incrementDecrement">
  //     <p onClick={() => setParcelas(prev => prev === 12 ? 12 : prev + 1)}>+</p>
  //     <p onClick={() => setParcelas(prev => prev === 1 ? 1 : prev - 1)}>–</p>
  //   </div>
  // </div>
  //         </div>
  //         :
  //         null              
  //               }
  //              </div>    
  null
              :
               <div className="row">
                <div className="input-wrapper">
         <label htmlFor="method" >Forma de Pagamento das Parcelas</label>
          <select value={methodP} onChange={(e)=> setMethodP(e.target.value)} id="method" >
              <option value="boleto">Boleto</option>
              <option value="pix">Pix</option>
          </select>
                </div>  

                 <div className="input-wrapper">
  <label htmlFor="parcelas">Número de parcelas</label>

  <div className="priceDiv">
    <select
      value={parcelas}
      onChange={(e) => setParcelas(Number(e.target.value))}
      id="parcelas"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <option key={i+1} value={i+1}>{i+1}</option>
      ))}
    </select>

    <div className="incrementDecrement">
      <p onClick={() => setParcelas(prev => prev === 12 ? 12 : prev + 1)}>+</p>
      <p onClick={() => setParcelas(prev => prev === 1 ? 1 : prev - 1)}>–</p>
    </div>
  </div>
          </div>
    
               </div>   
          }

          { 
            payContext == 'misto' ?
               <div className="row">
<div className="input-wrapper">
         <label htmlFor="pricee" >Valor da Entrada</label>
         <div className="priceDiv">
          <div className="real">R$</div>
          <InputNumber id="pricee" onChange={(e)=> setEntrance(e.value)} mode="currency" currency="BRL" locale="pt-BR" placeholder="0,00"/>
         </div>
         </div>  
 

                <div className="input-wrapper">
         <label htmlFor="methode" >Pagamento entrada</label>
          <select value={entranceM} onChange={(e)=> setEntranceM(e.target.value)} id="methode" >
              <option value="boleto">Boleto</option>
              <option value="credito">Cartão de Crédito</option>
              <option value="pix">Pix</option>
          </select>
                </div>  

                { entranceM == 'credito' ? 
                 <div className="input-wrapper">
  <label htmlFor="parcelase">Parcelas Entrada</label>

  <div className="priceDiv">
    <select
      value={parcelase}
      onChange={(e) => setParcelasE(Number(e.target.value))}
      id="parcelase"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <option key={i+1} value={i+1}>{i+1}</option>
      ))}
    </select>

    <div className="incrementDecrement">
      <p onClick={() => setParcelasE(prev => prev === 12 ? 12 : prev + 1)}>+</p>
      <p onClick={() => setParcelasE(prev => prev === 1 ? 1 : prev - 1)}>–</p>
    </div>
  </div>
          </div>
          :
          null              
                }
               </div>   
           :
            null
          }

          <div className="rowF">
           <h1>Valor Final:</h1>   
           
            { payContext == 'misto' ? <span><strong>Entrada:</strong> {formatarDinheiro.format(finalE)}</span>: null}
            { payContext == 'misto' && entranceM == 'credito' ? <span><strong>Parcelas da Entrada:</strong> {formatarDinheiro.format(entranceP)}</span>: null}
            { payContext == 'misto' || payContext == 'parcelado' ? <span><strong>Parcelas:</strong> {formatarDinheiro.format(finalP)}</span>: null}
            { payContext == 'avista' ? <span><strong>Avista:</strong> {formatarDinheiro.format(finalA)}</span>: null}
            {payContext == 'avista' && methodP == 'credito' ? 
             <p>
Valor da Venda ----	 {formatarDinheiro.format(price)} <br />
Cartão -----------------	Parcelas <br />
Crédito 1x  -----------	{formatarDinheiro.format((calcularTaxaCredito(price, 1) + price )/ 1)} <br />
Crédito 2x  -----------	{formatarDinheiro.format((calcularTaxaCredito(price, 2) + price )/ 2)} <br />
Crédito 3x  -----------	{formatarDinheiro.format((calcularTaxaCredito(price, 3) + price )/ 3)} <br />
Crédito 4x  -----------	{formatarDinheiro.format((calcularTaxaCredito(price, 4) + price )/ 4)} <br />
Crédito 5x  -----------	{formatarDinheiro.format((calcularTaxaCredito(price, 5) + price )/ 5)} <br />
Crédito 6x  -----------	{formatarDinheiro.format((calcularTaxaCredito(price, 6) + price )/ 6)} <br />
Crédito 7x  -----------	{formatarDinheiro.format((calcularTaxaCredito(price, 7) + price )/ 7)} <br />
Crédito 8x  -----------	{formatarDinheiro.format((calcularTaxaCredito(price, 8) + price )/ 8)} <br />
Crédito 9x  -----------	{formatarDinheiro.format((calcularTaxaCredito(price, 9) + price )/ 9)} <br />
Crédito 10x  ----------	{formatarDinheiro.format((calcularTaxaCredito(price, 10) + price )/ 10)} <br />
Crédito 11x  ----------	{formatarDinheiro.format((calcularTaxaCredito(price, 11) + price )/ 11)} <br />
Crédito 12x  ----------	{formatarDinheiro.format((calcularTaxaCredito(price, 12) + price )/ 12)} <br />
             </p>
            : 
            null
            }
           
          </div>  

         </div>

         <div className="clients">
          <div className="top">
            <h3>Clientes</h3>

            <div className="twoB">´
              { modified.length ? <button onClick={async()=> {
                  setSaving(true)
                  await handleSave()
        
              }}>Salvar</button> : null}
              <IoReload onClick={()=> FetchUsers()} className={reload ? 'rotate' : ''} size={20} color="#33333" />
              
            </div>
          </div>

          { clients == null ?
           <span>Buscando clientes...</span>
          :
           clients.length ?
           <div className="list">
            {
             clients.map((client)=> (
              <div key={client.id} className={`client ${closed.includes(client.id) ? 'cOpen' : ''}`}>
               <div className="topper">
                <span>{client.name}</span>

                <div className={`set ${closed.includes(client.id) ? 'closeds' : ''}`}>
                 <IoIosArrowUp   onClick={()=> {toggleValue(client.id); console.log('id:', client.id, 'closed:', closed)}} size={25} color='#333333'/>
                </div>
               </div>

               <div className="infors">
                <div className="rowI">
                   <div className="input-wrapperI">
                   <span><strong>Nome</strong>:  </span>
                   <input
                    type="text"
                    autoComplete="off"
                    placeholder={client.name}
                    onChange={(e) => {
                      
                      updateClientField(
                        client.id,
                        'name',
                        e.target.value,
                      )
                
                      }
                     }
                    />
                  </div>

                   <div className="input-wrapperI">
                   <span><strong>{client.cpf ? 'CPF' : 'CNPJ'}</strong>:  </span>
                   <input
                    type="number"
                    autoComplete="off"
                    maxLength={client.cpf ? 11 : 14}
                    placeholder={client.cpf || client.cnpj}
                    onChange={(e) => {
                      const max = client.cpf ? 11 : 14;
                      const value = e.target.value.replace(/\D/g, "").slice(0, max);
                      updateClientField(
                        client.id,
                        client.cpf ? "cpf" : "cnpj",
                        e.target.value,
                      )
                      e.target.value = value;
                      }
                     }
                    />
                  </div>
                </div>

                <div className="rowI">
                  <div className="input-wrapperI">
                   <span><strong>Senha</strong>:  </span>
                   <input
                    type="text"
                    autoComplete="off"
                    placeholder='******'
                    onChange={(e) => {
                      updateClientField(
                        client.id,
                        "password",
                        e.target.value,
                      )
                      }
                     }
                    />
                  </div>
                 
                  <div className="input-wrapperI">
                   <span><strong>E-mail</strong>:</span>
                   <input
                    type="text"
                    autoComplete="off"
                    placeholder={client.email}
                    onChange={(e) => {
    
                      updateClientField(
                        client.id,
                        'email',
                        e.target.value,
                      )
          
                      }
                     }
                    />
                  </div>
                </div>

                <span>Produtos:</span>

                { client.produtos.length ? 
                client.produtos.map((produto)=> (
                 <div key={produto.id} className="produtos">
                  <div className="row">
                   <span>{produto.produto}</span>
                   <span><strong>Status:</strong> {produto.status}</span>
                   <span><strong>Valor:</strong> {formatarDinheiro.format(produto.valor_total)}</span>
                   <span><strong>Forma:</strong> {produto.forma_pagamento}</span>
                  </div>

                  <div className="hover">
                   <FaRegTrashAlt size={24} color="#fff" onClick={async ()=> {
                if (User.admin_leve != 'ADM') {
                                        Toast.fire({
                    icon: "Warning",
                    title: 'Enviando solicitação de exclusão para Jhone'
                });
              return                         
              }
              
                    try {
   
                      await api.delete('/delete', { id: produto.id, what: 'product'})
                      FetchUsers()
                      Toast.fire({
                    icon: "success",
                    title: 'Produto excluido com sucesso!'
                });
                    } catch(error) {
                      console.error(error)
                      Toast.fire({
                    icon: "error",
                    title: error.response.data.error || 'Erro ao excluir produto'
                });
                    }
                   }}/>
                  </div>

                  <div className="row">
                    { produto.parcelas.length > 0 ? 
                     <span><strong>Parcelas:</strong> {produto.parcelas.length}</span> 
                    :
                    null
                    }

                    { produto.entrada.length > 0 ? 
                     <span><strong>Entrada:</strong> {formatarDinheiro.format(produto.entrada.valor_entrada)}</span> 
                    :
                    null
                    }
                  </div>
                 </div>
                ))
               :
               <p></p>
               }
               </div>
              </div>
             ))
            }
           </div>
          :
          <span>Nenhum cliente cadastrado ainda.</span>
          }
         </div>
        </div>
      </S.Main>
     </S.Container>
    )
}