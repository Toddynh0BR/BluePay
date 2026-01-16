import * as S from './styles';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Swal from 'sweetalert2';

import BluePayOne from '../../assets/BluePay.png';
import { IoIosArrowUp, IoMdReturnLeft } from "react-icons/io";

export function ShowUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [produtos, setProdutos] = useState([]);
    const [method, setMethod] = useState('');
    const [total, setTotal] = useState(349.5);
    const [loading, setLoading] = useState(true);
    const [generateBTN, setGererateBTN] = useState(false)

    const [closed, setClosed] = useState([])
    const formatarDinheiro = new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',});
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

    function formatarData(dataString) {
     const meses = [
     "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
     "Jul", "Ago", "Set", "Out", "Nov", "Dez"
   ];

  const [ano, mes, dia] = dataString.split("-");

  const mesFormatado = meses[Number(mes) - 1];
  const diaFormatado = dia.padStart(2, "0");

  return `${diaFormatado} ${mesFormatado} ${ano}`;
    };

    async function fetchData(id) {
      console.log('FecthData')
    if (!id) {
     return;
    }

    try {
      console.log('iniciando busca')
      const response = await api.get(`/info/${id}`);

      setUser(response.data.user)
      setProdutos(response.data.produtos || []);
    } catch (error) {
     console.error("Erro ao buscar informações do usuário:", error);
    } finally {
      setLoading(false);
    }
    };

    async function handleGenerateLink(id, produto_id) {
      console.log("Gerando link para ID:", id);
      setGererateBTN(true)
       try {
        let link
        if(id.includes('cus')) {
         const Response = await api.post(`/create-checkout/${produto_id}`);

         console.log('Resposta do back:', Response.data)

         link = Response.data.checkoutUrl
        } else {
          const idLimpo = id.replace(/^pay_/, '');
          link = `https://www.asaas.com/i/${idLimpo}`;
        }

        window.open(link, '_blank');
       } catch (error) {
        console.error("Erro ao gerar link de pagamento:", error);
                 Toast.fire({
                    icon: "error",
                    title: error.response.data.error || 'Erro ao gerar link de pagamento'
                });
       }finally {
        setGererateBTN(false)
       }
    };
    
    function toggleValue(id) {
     setClosed(prev =>
        prev.includes(id)
          ? prev.filter(v => v !== id) // remove pelo valor
          : [...prev, id]              // adiciona o valor
      );
    };

    useEffect(() => {
       fetchData(Number(id));
    }, []);

    if (!user?.id || loading || produtos == null) return <S.Loading>
     <div></div>
    </S.Loading>;
 
    return(
     <S.Container>
       <S.Main>
      <header>
       <div>
        <img src={BluePayOne} alt="BluePay" />
       
       <h2>
        Olá BluePay! <br />
        <h5>Essas são as informações de <strong>{user.name}</strong></h5>
       </h2>

       </div>

       <IoMdReturnLeft onClick={()=> navigate('/')} size={30} fontWeight='bold' color='#333333'/>
      </header>

       {
        produtos ? (
        produtos.map((produto)=> (
         <S.Product key={produto.id}>
           <div className="info">
        <div className="Item">
         <span>Produto</span>
         <h3>{produto.produto}</h3>
        </div>

        {/* <div className="Item">
         <span>Valor do Produto</span>
         <h3>{formatarDinheiro.format(Number(produto.valor_total))}</h3>
        </div> */}

        <div className="Item">
         <span>Forma de Pagamento</span>
         <h3>{produto.forma_pagamento}</h3>
         {produto.forma_pagamento == 'Misto' ? <h4>({formatarDinheiro.format(Number(produto.entrada.valor_entrada))})</h4> : null}
        </div>

        {/* <div className="Item">
         <span>Valor a Pagar</span>
         <h3>{formatarDinheiro.format(Number(produto.valor_total))}</h3>
         <p>Acrescimo de R$ 4,99 no <br /> Pix ou Boleto</p>
        </div> */}

        <div className="Item">
          <span>Definir {produto.forma_pagamento == 'Misto' ? 'Entrada' : (produto.forma_pagamento == 'Avista' ? 'Produto' : 'proxima parcela')} como paga</span>
          <button
          disabled={generateBTN}
           onClick={async ()=> {
            console.log('Definindo como paga...')
            setGererateBTN(true)
            
            try {
           console.log('teste')
             if (produto.forma_pagamento == 'Misto') {
              console.log('Misto')
              const Response = await api.put('set-payment', { product_id: produto.id, parcela_num: 0, entrada: true })

              if (Response.status != 200) throw new Error(Response.data.error || 'erro desconhecido.')
              
              fetchData(id)
              
              return Toast.fire({
                    icon: "success",
                    title: 'Entrada atualizada com sucesso!'
              });
             };
             if (produto.forma_pagamento == 'Avista') {
              console.log('Avista')
              const Response = await api.put('set-payment', { product_id: produto.id, parcela_num: 0, entrada: false })

              if (Response.status != 200) throw new Error(Response.data.error || 'erro desconhecido.')
              
              fetchData(id)

              return Toast.fire({
                    icon: "success",
                    title: 'Produto atualizada com sucesso!'
              });
             };
             if (produto.forma_pagamento == 'Parcelado Sem Entrada' || produto.forma_pagamento == 'Parcelado') {
              console.log('Parcelado')
              const proximaParcela = produto.parcelas.find(parcela => parcela.status.toLowerCase() === 'pendente');

              const Response = await api.put('set-payment', { 
                product_id: produto.id,
                parcela_num: proximaParcela.numero_parcela,
                entrada: false })

              if (Response.status != 200) throw new Error(Response.data.error || 'erro desconhecido.')
              
              fetchData(id)

              return Toast.fire({
                    icon: "success",
                    title: 'Parcela atualizada com sucesso!'
              });
             }
            } catch(error) {
              console.error(error)
              return Toast.fire({
                    icon: "error",
                    title: error.message || error.data.error ||  'Erro ao atualizar status'
              });
            } finally {
              setGererateBTN(false)
            };
           }}
          >{generateBTN ? 'Carregando...' : 'Definir'}
          </button>
        </div>

           </div>

      <div className="bills">
        <span>Parcelas</span>
        { produto.parcelas.length ? 
         <div className="top">
        <span>
         Parcela
         </span>

         <span>
          ID da Parcela
         </span>

         <span>
          Data de Vencimento
         </span>

         <span>
          Forma de Pagamento
         </span>

         <span>
          Valor da Parcela
         </span>

         <span>
          Situação
         </span>

         <span>
          Função
         </span>

          <div className={`set ${closed.includes(produto.id) ? 'closeds' : ''}`}>
           <IoIosArrowUp   onClick={()=> {toggleValue(produto.id); console.log('id:', produto.id, 'closed:', closed)}} size={25} color='#333333'/>
          </div>
         </div>
        :
         null
        }
        { produto.parcelas.length ? 
         <div className={`parcelas ${closed.includes(produto.id) ? 'closed' : ''}`}>

          {produto.parcelas.map((item)=> (
            <div key={item.id} className="parcela">
             <span>{item.numero_parcela}</span>

             <span>#{item.asaas_id.replace('pay_', '').substring(0, 10)}</span>

             <span>{formatarData(item.vencimento_parcela)}</span>

             <span>{item.forma_parcela}</span>

             <span>{formatarDinheiro.format(item.valor_parcela)}</span>

             <span>
              { item.status == 'CONFIRMED' || item.status == 'RECEIVED' || item.status == 'RECEIVED_IN_CASH' ?
                <div className="statusPay">
                pago
              </div>
              :
               item.status == 'Pendente' || item.status == 'pendente'  ?
              
               <div className="statusPendent">
                {item.status}
               </div>
              :
               <div className="statusVencid">
                {item.status}
              </div>
              }
             </span>

            
            { item.status == 'RECEIVED' || item.status == 'RECEIVED_IN_CASH' ? 
            null
            :
             <button onClick={async (event)=> {
                event.target.innerText = 'Carregando...';
                try {
                  const Response = await api.put('set-payment', {
                    product_id: item.product_id,
                    parcela_num: item.numero_parcela, 
                    entrada: false
                  });

                  if (Response.status != 200) throw new Error(Response.data.error || 'Erro ao atualizar parcela.')
                  
                    fetchData(id)
                  return Toast.fire({
                    icon: "success",
                    title: 'Status de parcela atualizado'
                 });
                } catch {
                 console.error(error)
                 return Toast.fire({
                    icon: "error",
                    title: error.message || error.data.error || 'Erro ao atualizar status de parcela'
                 });
                }finally {
                  event.target.innerText = 'Definir como paga';
                }
              }}>Definir como paga</button>
            }
             
            </div>
            
          ))}

          {produto.parcelas.map((item)=> (
            <div key={item.id} className="parcelaMobile">
             <span>
              Numero da Parcela: <br />
              <strong>{item.numero_parcela}</strong>
             </span>

             <span>
              Vencimento: <br />
              <strong>{formatarData(item.vencimento_parcela)}</strong>
             </span>

             <span>
              Forma de Pagamento: <br />
              <strong>{item.forma_parcela}</strong>
             </span>

             <span>
              Valor da Parcela: <br />
              <strong>{formatarDinheiro.format(item.valor_parcela)}</strong>
             </span>

             <span>
              { item.status == 'Paga' || item.status == 'CONFIRMED' || item.status == 'RECEIVED' ?
                <div className="statusPay">
                {item.status}
              </div>
              :
               item.status == 'Pendente' || item.status == 'PENDING' ?
               <div className="statusPendent">
                {item.status}
               </div>
              :
               <div className="statusVencid">
                {item.status}
              </div>
              }
             </span>

            
            { item.status == 'RECEIVED' || item.status == 'RECEIVED_IN_CASH' ? 
            null
            :
             <button onClick={async (event)=> {
                event.target.innerText = 'Carregando...';
                try {
                  const Response = await api.put('set-payment', {
                    product_id: item.product_id,
                    parcela_num: item.numero_parcela, 
                    entrada: false
                  });

                  if (Response.status != 200) throw new Error(Response.data.error || 'Erro ao atualizar parcela.')
                  
                    fetchData(id)
                  return Toast.fire({
                    icon: "success",
                    title: 'Status de parcela atualizado'
                 });
                } catch {
                 console.error(error)
                 return Toast.fire({
                    icon: "error",
                    title: error.message || error.data.error || 'Erro ao atualizar status de parcela'
                 });
                }finally {
                  event.target.innerText = 'Definir como paga';
                }
              }}>Definir como paga</button>
            }
             
            </div>
            
          ))}
          
         </div>    
        :
         <h3>Nenhuma parcela para pagar</h3>
        }

      </div>
         </S.Product>
        ))
        )
        :
        <h3>Nenhuma produto para pagar</h3>
       }
      </S.Main>
     </S.Container>
    )
}