import * as S from "./style";

import { useAuth } from '../../hooks/auth';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Swal from 'sweetalert2';

import { InputNumber } from 'primereact/inputnumber';
import BluePayOne from '../../assets/BluePay.png';

import { FaRegTrashAlt, FaPen, FaPlus, FaCamera, FaUsers  } from "react-icons/fa";
import { FaCalculator, FaUsersGear } from "react-icons/fa6";
import { FiCheck, FiX } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { IoReload } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';

import DefaultUser from '../../assets/user.png'

import { Metas } from "../../components/metas";

export function Calculator() {
    const { Logout, User } = useAuth();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

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
    
    const [clients, setClients] = useState(null);
    const [sellers, setSellers] = useState(null);
    const [modified, setModified] = useState([]);   
    const [reload, setReload] = useState(false);
    const [saving, setSaving] = useState(false)
    const [closed, setClosed] = useState([])

    const [requests, setRequests] = useState(null);

    async function FetchUsers() {
      setReload(true);
      setClients(null)
      setModified([])
      
      setTimeout(async ()=> {
        try {
        
        if(User.admin_level != 'ADM') {
        const response = await api.get(`/my-clients/${User.id}`);
         
        setClients(response.data || [])
        } else {
         const response = await api.get('/clients');
         const SellersUsers = await api.get('/sellers');
 
         setSellers(SellersUsers.data.ClientsForSeller || [])
         setClients(response.data || []);
        }
       
       
       } catch(error) {
        console.error(error)
        setClients([])
        return Toast.fire({
                    icon: "error",
                    title: error.response.data.error || 'Erro ao buscar clientes'
                });
       } finally {
        setReload(false)
       }
      }, 2400)

    };

    async function FetchRequests() {
      setRequests(null)
      try {
        const Response = await api.get('/requests')

       return setRequests(Response.data.Requests || []);
      } catch (error) {
        console.error(error)
        if (error.response.status(400)) return;
                return Toast.fire({
                    icon: "error",
                    title: error.response.data.error || 'Erro ao buscar pedidos de exclusão'
                });
      }
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
       alert(`O campo nome de usuario com ID ${item.id} não pode estar vazio.`);
       setSaving(false)
      return;
     }

     // verifica email
     if (item.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(item.email)) {
        alert(`Email inválido para o usuariocom ID ${item.id}`);
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

    async function handleAddSeller() {
     if (!nsavatar || !nsname || !nsemail || !nspassword) return Toast.fire({
                    icon: "warning",
                    title: 'Informações faltando'
                });

     const formData = new FormData();
     formData.append("name", nsname);
     formData.append("email", nsemail);
     formData.append("password", nspassword);
     formData.append("avatar", nsavatar);

     setNsButton(true)
     try {
      await api.post("/new-seller", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      Toast.fire({
          icon: "success",
          title: 'Vendedor adicionado com sucesso!'
        });

      setNSName("");
      setNSEmail("");
      setNSPassword("");
      setNSAvatar(null);
      setAddSeller(false);

      FetchUsers()

     }catch {
      console.error(error);
      return  Toast.fire({
                icon: "error",
                title: 'Informações faltando'
              });
     }finally {
      setNsButton(false)
     }
    }

    useEffect(()=> {
     FetchUsers()

     if(User?.id && User.admin_level == 'ADM') {
        FetchRequests()
    }
    setTimeout(()=> {
      setLoading(false);
    }, 2000)
    }, [User])

    const [addingSeller, setAddSeller] = useState(false);
    const [nspassword, setNSPassword] = useState('');
    const [nsavatar, setNSAvatar] = useState('');
    const [nsemail, setNSEmail] = useState('');
    const [nsname, setNSName] = useState('');
    const [nsbutton, setNsButton] = useState(false);

    const [focusedS, setFocusedS] = useState('dash');
    const [pageOpen, setPageOpen] = useState('dash');
    
    if (!User?.id || loading) return <S.Loading><div></div></S.Loading>;

    return(
     <S.Container>
      <S.Main>
        <header>
         <div>
          <img src={BluePayOne} alt="BluePay" />
          
         <h2>
          Olá {primeirosDoisNomes(User.name)}! <br />
          <h5>Acesse o dashboard da BluePay aqui.</h5>
         </h2>

          <div onClick={()=> {
            setPageOpen('dash')
            setFocusedS(focusedS == 'sellers' ? 'clients' : focusedS == 'clients' ? 'calculator'  : 'dash'); 
            setTimeout(()=> {
              setFocusedS(focusedS == 'calculator' ? 'dash' : 'calculator')
            }, 200)
            setTimeout(()=> {
              setFocusedS('dash')
            }, 400)
            }} className={focusedS == 'dash' ? 'focusedSpan span' : 'span'}>
            <MdDashboard size={20} color="#5a5a5a"/>
            Dashboard
          </div>
  
          <div onClick={()=> {
            setPageOpen('calculator')
            setFocusedS(focusedS == 'sellers' ? 'clients' : 'calculator')
            setTimeout(()=> {
              setFocusedS('calculator')
            }, 200)
          }} className={focusedS == 'calculator' ? 'focusedSpan span' : 'span'}>
            <FaCalculator size={20} color="#5a5a5a"/>
            Calculadora
          </div>

          <div onClick={()=> {
            setPageOpen('clients')
            setFocusedS(focusedS == 'calculator' ? 'clients' : focusedS == 'sellers' ? 'clients'  : 'calculator'); 
            setTimeout(()=> {
              setFocusedS('clients')
            }, 200)
            }} className={focusedS == 'clients' ? 'focusedSpan span' : 'span'}>
            <FaUsers size={20} color="#5a5a5a"/>
            Meus Clientes  
          </div>

          {
            User.admin_level == 'ADM' ?
            <div onClick={()=> {
            setPageOpen("sellers")
            setFocusedS(focusedS == 'dash' ? 'calculator' : focusedS == 'calculator' ? 'clients'  : 'sellers'); 
            setTimeout(()=> {
              setFocusedS(focusedS == 'clients' ? 'sellers' : 'clients')
            }, 200)
            setTimeout(()=> {
              setFocusedS('sellers')
            }, 400)
            }} className={focusedS == 'sellers' ? 'focusedSpan span' : 'span'}>
            <FaUsersGear size={20} color="#5a5a5a"/>
            Vendedores
          </div>
          :
          null
          }
         </div>
  
         <TbLogout2 onClick={()=> Logout()} size={30} fontWeight='bold' color='#333333'/>
        </header>

        { pageOpen == 'dash' ?
        <Metas id={User.admin_level == 'ADM' ? null : User.id}/>
        :
         pageOpen == 'calculator' ?
          <div className="calculatoradm">
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
         :
         pageOpen == 'clients' ?
          <div className="clientsadm">
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
                <div className="adm">
                  {User.admin_level == 'ADM' ? 
                   <FaRegTrashAlt size={20} color="#333333" onClick={async ()=> {
                    try {
                      Toast.fire({
                    title: 'Excluindo usuário'
                });
                      await api.delete(`/delete?id=${client.id}&what=user`)
                      FetchUsers();
                      return Toast.fire({
                    icon: "success",
                    title: 'Usuário excluido com sucesso!'
                });
                    }catch(error) {
                      console.error(error)
                      return Toast.fire({
                    icon: "error",
                    title: error.response.data.error || 'Erro ao excluir usuário'
                });
                    }
                   }}/>
                  :
                   null
                  }

                  {User.admin_level == 'ADM' ? 
                   <FaPen size={20} color="#333333" onClick={()=> navigate(`/user-info/${client.id}`)}/>
                  :
                   null
                  }

                  <span>{client.name}</span>
                </div>

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
                if (User.admin_level != 'ADM') {
                                        Toast.fire({
                    icon: "Warning",
                    title: 'Enviando solicitação de exclusão'
                });
                await api.post('/request-delete', { user_id: User.id, product_id: produto.id })
                  Toast.fire({
                    icon: "Warning",
                    title: 'Solicitação enviada com sucesso!'
                });
              return                         
              }
              
                    try {
   
                     console.log({ id: produto.id, what: 'product'})
                      await api.delete(`/delete?id=${produto.id}&what=product`)
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
         :
          <div className="clientsadm">
                      
           <div className="top">
            <h3> <FaPlus size={20} onClick={()=> setAddSeller(true)}/> Vendedores</h3>
          </div>


          { addingSeller ?
           <div className="addSeller">
           <div className="title">
             <h3>Adicionar vendedor</h3>
             <span onClick={()=> {
              setAddSeller(false);
              setNSPassword('')
              setNSAvatar('')
              setNSEmail('')
              setNSName('')
             }}>cancelar</span>
           </div>
            <div className="form">
             <div className="image">
              <img src={nsavatar ? URL.createObjectURL(nsavatar) : DefaultUser} alt="" />
              <label htmlFor="image">
                <FaCamera size={24} />
              </label>
              <input onChange={e => setNSAvatar(e.target.files[0])}  type="file" id="image" accept="image/png, image/jpeg, .png, .jpg"/>
             </div>

             <div className="inputs">
              <div className="input-wrapper">
                <label htmlFor="name">Nome</label>
                <input 
                 value={nsname} 
                 type="text" 
                 id="name" 
                 placeholder="Apenas primeiro e segundo nome"
                 onChange={(e)=> setNSName(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input 
                 value={nsemail} 
                 type="email" 
                 id="email" 
                 placeholder="Email do vendedor"
                 onChange={(e)=> setNSEmail(e.target.value)}
                />
              </div>
             </div>
            <div className="inputs">
              <div className="input-wrapper">
                <label htmlFor="password">Senha</label>
                <input 
                 value={nspassword} 
                 type="text" 
                 id="password" 
                 placeholder="Senha do vendedor"
                 onChange={(e)=> setNSPassword(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="password">Criar vendedor:</label>
                <button disabled={nsbutton} onClick={()=> handleAddSeller()}>
                {nsbutton ? 'Criando...' : 'Criar'}
              </button>
              </div>
              
             
             </div>
            </div>
           </div>
          :
          sellers == null ?
           <span>Buscando vendedores...</span>
          :
           sellers.length ?
           <div className="list">
            {
             sellers.map((client)=> (
              <div key={client.id} className='client cOpen seller'>
               <div className="topper">
                <div className="adm">
                
                   <FaRegTrashAlt size={20} color="#333333" onClick={async ()=> {
                    try {
                      Toast.fire({
                    title: 'Excluindo vendedor'
                });
                      await api.delete(`/delete?id=${client.id}&what=user`)
                      FetchUsers();
                      return Toast.fire({
                    icon: "success",
                    title: 'Vendedor excluido com sucesso!'
                });
                    }catch(error) {
                      console.error(error)
                      return Toast.fire({
                    icon: "error",
                    title: error.response.data.error || 'Erro ao excluir vendedor'
                });
                    }
                   }}/>

                  <span>{client.name}</span>
                </div>

               
               </div>

               <div className="infors closed">
                <div className="rowI">
                   <div className="input-wrapperI">
                   <span><strong>Nome</strong>:  </span>
                   <input
                    type="text"
                    autoComplete="off"
                    disabled
                    placeholder={client.name}
                    />
                  </div>

                </div>

                <div className="rowI">         
                  <div className="input-wrapperI">
                   <span><strong>E-mail</strong>:</span>
                   <input
                    type="text"
                    autoComplete="off"
                    placeholder={client.email}
                    disabled
                    />
                  </div>
                </div>

                <span>Numero de clientes desse mês: { client.clients.length}</span>
               </div>
              </div>
             ))
            }
           </div>
          :
           <span>Nenhum vendedor cadastrado ainda.</span>
          }
        
         
          </div>
        }
         
      </S.Main>
      
      
      { User.admin_level == 'ADM' ?
      <S.Main>
        <header>
         <div>
         
         <h2>
Solicitações de exclusão
         </h2>
  
         </div>
  
        
        </header>

        <div className="requests">
         { requests == null ?
          <span>Buscando pedidos de exclusão...</span> 
         :
          requests.length ?
          <div className="requestList">
           { requests.map((request)=> (
            <div key={request.id} className="request">
              <div className="texts">
                <p><strong>Produto:</strong> {request.produto}</p>
                <p><strong>Cliente:</strong> {request.cliente}</p>
                <p><strong>Consultor:</strong> {request.usuario}</p>
              </div>

              <div className="buttons">
               <FiCheck size={25} color="#42a902ff" onClick={async ()=> {
                                      Toast.fire({
                    title: 'Excluindo produto'
                });
                try {

                 await api.delete(`/delete?id=${request.product_id}&what=product&request_id=${request.id}`);
                 FetchRequests()
                 return Toast.fire({
                    icon: "success",
                    title: 'Produto excluido com sucesso!'
                });
                } catch(error){
                  console.error(error)
                  return Toast.fire({
                    icon: "error",
                    title: error.response.data.error || 'Erro aceitar pedido de exclusão'
                });
                }
               }}/>
               <FiX size={25} color="#b60404fd" onClick={async ()=> {
                                      Toast.fire({
                    title: 'Recusando pedido de exclusão'
                });
                 try {
                  await api.delete(`/delete-request?request_id=${request.id}`);
                  FetchRequests();
                  return Toast.fire({
                    icon: "Success",
                    title: 'Pedido recusado!'
                });
                 }catch(error) {
                  console.error(error)
                   return Toast.fire({
                    icon: "error",
                    title: error.response.data.error || 'Erro recusar pedido de exclusão'
                });
                 }
               }}/>
              </div>
            </div>
           ))}
          </div>
         :
          <span>Nenhum pedido de exclusão</span>
         }
        </div>
      </S.Main>
      :
      null 
      }
     </S.Container>
    )
}