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
      ? calcularTaxaCredito(valorParcela, 1)
      : 4.99;

    setFinalP(valorParcela + taxa);
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

    if (methodP === 'credito' && !parcelas) return;

    const valorFinal = price;

    const taxa = methodP === 'credito'
      ? calcularTaxaCredito(valorFinal, parcelas)
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
    const [clients, setClients] = useState([
    {
        "id": 8,
        "name": "JANAINA PORTELA SOARES PORTELA SOARES",
        "cpf": "109.132.187-66",
        "produtos": [
            {
                "id": 12,
                "produto": "[table][tr][th]Produto[/th][th]Valor[/th][/tr][tr][td]Licença WhatsCRM - Pro[/td][td]R$1,864.80[/td][/tr][/table]",
                "status": "Pendente",
                "forma_pagamento": "Parcelado Sem Entrada",
                "numero_parcelas": "12",
                "renovacao": "",
                "valor_total": "1864.80",
                "asaas_id": null,
                "user_id": 8,
                "parcelas": [
                    {
                        "id": 121,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2025-12-28",
                        "numero_parcela": "2",
                        "status": "pendente",
                        "asaas_id": "pay_njmtyjldeps2t60z",
                        "product_id": 12
                    },
                    {
                        "id": 122,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2026-01-28",
                        "numero_parcela": "3",
                        "status": "pendente",
                        "asaas_id": "pay_gsagwf2e2ln4i1w7",
                        "product_id": 12
                    },
                    {
                        "id": 123,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2026-02-28",
                        "numero_parcela": "4",
                        "status": "pendente",
                        "asaas_id": "pay_iaigwa9qb0wg7g3j",
                        "product_id": 12
                    },
                    {
                        "id": 124,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2026-03-28",
                        "numero_parcela": "5",
                        "status": "pendente",
                        "asaas_id": "pay_7axciib7ch9285us",
                        "product_id": 12
                    },
                    {
                        "id": 125,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2026-04-28",
                        "numero_parcela": "6",
                        "status": "pendente",
                        "asaas_id": "pay_b7gu7hpcpiwfwlcg",
                        "product_id": 12
                    },
                    {
                        "id": 126,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2026-05-28",
                        "numero_parcela": "7",
                        "status": "pendente",
                        "asaas_id": "pay_1qr3wg2n0f3txu28",
                        "product_id": 12
                    },
                    {
                        "id": 127,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2026-06-28",
                        "numero_parcela": "8",
                        "status": "pendente",
                        "asaas_id": "pay_fwmapco3ludzjdth",
                        "product_id": 12
                    },
                    {
                        "id": 128,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2026-07-28",
                        "numero_parcela": "9",
                        "status": "pendente",
                        "asaas_id": "pay_aramvnz7xs5eret8",
                        "product_id": 12
                    },
                    {
                        "id": 129,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2026-08-28",
                        "numero_parcela": "10",
                        "status": "pendente",
                        "asaas_id": "pay_a02qg0k7pgnw8on9",
                        "product_id": 12
                    },
                    {
                        "id": 130,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2026-09-28",
                        "numero_parcela": "11",
                        "status": "pendente",
                        "asaas_id": "pay_mtct3vmukn9veoqi",
                        "product_id": 12
                    },
                    {
                        "id": 131,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2026-10-28",
                        "numero_parcela": "12",
                        "status": "pendente",
                        "asaas_id": "pay_skhkajw9b9d0zcmu",
                        "product_id": 12
                    },
                    {
                        "id": 120,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "160.39",
                        "vencimento_parcela": "2025-11-28",
                        "numero_parcela": "1",
                        "status": "CONFIRMED",
                        "asaas_id": "pay_t1m4bqe4v1uqwq22",
                        "product_id": 12
                    }
                ],
                "entrada": {}
            }
        ]
    },
    {
        "id": 9,
        "name": "RIBEIRO E MOREIRA ADVOGADOS ASSOCIADOS",
        "cpf": null,
        "produtos": [
            {
                "id": 13,
                "produto": "[table][tr][th]Produto[/th][th]Valor[/th][/tr][tr][td]E-mail Corporativo[/td][td]R$2,940.12[/td][/tr][/table]",
                "status": "Pendente",
                "forma_pagamento": "Parcelado Sem Entrada",
                "numero_parcelas": "12",
                "renovacao": "",
                "valor_total": "2940.12",
                "asaas_id": null,
                "user_id": 9,
                "parcelas": [
                    {
                        "id": 133,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2025-12-28",
                        "numero_parcela": "2",
                        "status": "pendente",
                        "asaas_id": "pay_mt8bkt2b8cg7wgm1",
                        "product_id": 13
                    },
                    {
                        "id": 134,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2026-01-28",
                        "numero_parcela": "3",
                        "status": "pendente",
                        "asaas_id": "pay_n1t8r6lg2d88uuz7",
                        "product_id": 13
                    },
                    {
                        "id": 135,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2026-02-28",
                        "numero_parcela": "4",
                        "status": "pendente",
                        "asaas_id": "pay_qk1tsk3edkfbzsg5",
                        "product_id": 13
                    },
                    {
                        "id": 136,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2026-03-28",
                        "numero_parcela": "5",
                        "status": "pendente",
                        "asaas_id": "pay_1lxqtz81t423pqvq",
                        "product_id": 13
                    },
                    {
                        "id": 137,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2026-04-28",
                        "numero_parcela": "6",
                        "status": "pendente",
                        "asaas_id": "pay_3315zoug6olsk6yd",
                        "product_id": 13
                    },
                    {
                        "id": 138,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2026-05-28",
                        "numero_parcela": "7",
                        "status": "pendente",
                        "asaas_id": "pay_29648452ml5z6not",
                        "product_id": 13
                    },
                    {
                        "id": 139,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2026-06-28",
                        "numero_parcela": "8",
                        "status": "pendente",
                        "asaas_id": "pay_djdg9v5fp99typhk",
                        "product_id": 13
                    },
                    {
                        "id": 140,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2026-07-28",
                        "numero_parcela": "9",
                        "status": "pendente",
                        "asaas_id": "pay_wjlssukvdewk896e",
                        "product_id": 13
                    },
                    {
                        "id": 141,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2026-08-28",
                        "numero_parcela": "10",
                        "status": "pendente",
                        "asaas_id": "pay_4zja8ya6ctt51brc",
                        "product_id": 13
                    },
                    {
                        "id": 142,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2026-09-28",
                        "numero_parcela": "11",
                        "status": "pendente",
                        "asaas_id": "pay_2systblnx4v6p9k7",
                        "product_id": 13
                    },
                    {
                        "id": 143,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2026-10-28",
                        "numero_parcela": "12",
                        "status": "pendente",
                        "asaas_id": "pay_1zvqx9tmli3k18ay",
                        "product_id": 13
                    },
                    {
                        "id": 132,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "250.00",
                        "vencimento_parcela": "2025-11-28",
                        "numero_parcela": "1",
                        "status": "RECEIVED",
                        "asaas_id": "pay_6ur79q1dpq2ifghb",
                        "product_id": 13
                    }
                ],
                "entrada": {}
            },
            {
                "id": 14,
                "produto": "[table][tr][th]Produto[/th][th]Valor[/th][/tr][tr][td]Licença WhatsCRM - Pro[/td][td]R$6,888.24[/td][/tr][/table]",
                "status": "Pendente",
                "forma_pagamento": "Parcelado Sem Entrada",
                "numero_parcelas": "12",
                "renovacao": "",
                "valor_total": "6888.24",
                "asaas_id": null,
                "user_id": 9,
                "parcelas": [
                    {
                        "id": 145,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2025-12-28",
                        "numero_parcela": "2",
                        "status": "pendente",
                        "asaas_id": "pay_8zy6mw9fqiha8css",
                        "product_id": 14
                    },
                    {
                        "id": 146,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2026-01-28",
                        "numero_parcela": "3",
                        "status": "pendente",
                        "asaas_id": "pay_7x3k7buz343yiwv1",
                        "product_id": 14
                    },
                    {
                        "id": 147,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2026-02-28",
                        "numero_parcela": "4",
                        "status": "pendente",
                        "asaas_id": "pay_gxbqcs9p8y1l2qod",
                        "product_id": 14
                    },
                    {
                        "id": 148,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2026-03-28",
                        "numero_parcela": "5",
                        "status": "pendente",
                        "asaas_id": "pay_128ng0pcibsez766",
                        "product_id": 14
                    },
                    {
                        "id": 149,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2026-04-28",
                        "numero_parcela": "6",
                        "status": "pendente",
                        "asaas_id": "pay_lpq2o3qn4nus7a4d",
                        "product_id": 14
                    },
                    {
                        "id": 150,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2026-05-28",
                        "numero_parcela": "7",
                        "status": "pendente",
                        "asaas_id": "pay_tajo7egsmm3dv010",
                        "product_id": 14
                    },
                    {
                        "id": 151,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2026-06-28",
                        "numero_parcela": "8",
                        "status": "pendente",
                        "asaas_id": "pay_mihpze1cuzzbqk8k",
                        "product_id": 14
                    },
                    {
                        "id": 152,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2026-07-28",
                        "numero_parcela": "9",
                        "status": "pendente",
                        "asaas_id": "pay_ztmard3xxy8z6jxr",
                        "product_id": 14
                    },
                    {
                        "id": 153,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2026-08-28",
                        "numero_parcela": "10",
                        "status": "pendente",
                        "asaas_id": "pay_oqu0czz9m78tj12f",
                        "product_id": 14
                    },
                    {
                        "id": 154,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2026-09-28",
                        "numero_parcela": "11",
                        "status": "pendente",
                        "asaas_id": "pay_72b8r8s7a7shbgqb",
                        "product_id": 14
                    },
                    {
                        "id": 155,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2026-10-28",
                        "numero_parcela": "12",
                        "status": "pendente",
                        "asaas_id": "pay_ylrpaehmypvzby0n",
                        "product_id": 14
                    },
                    {
                        "id": 144,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "579.00",
                        "vencimento_parcela": "2025-11-28",
                        "numero_parcela": "1",
                        "status": "RECEIVED",
                        "asaas_id": "pay_yiafegkxtvsp2f3n",
                        "product_id": 14
                    }
                ],
                "entrada": {}
            },
            {
                "id": 15,
                "produto": "[table][tr][th]Produto[/th][th]Valor[/th][/tr][tr][td]Licença Bitrix24 - Professional[/td][td]R$13,430.40[/td][/tr][/table]",
                "status": "Pendente",
                "forma_pagamento": "Avista",
                "numero_parcelas": "1",
                "renovacao": "",
                "valor_total": "13430.40",
                "asaas_id": "pay_nx6w10mh0zavjvhz",
                "user_id": 9,
                "parcelas": [],
                "entrada": {}
            }
        ]
    },
    {
        "id": 10,
        "name": "THOMAZ NASSIF JORGE BASSI",
        "cpf": null,
        "produtos": [
            {
                "id": 16,
                "produto": "[table][tr][th]Produto[/th][th]Valor[/th][/tr][tr][td]Serviço de Implementação e Suporte Bitrix24[/td][td]R$0[/td][/tr][tr][td]Licença Bitrix24 - Standard[/td][td]R$7,549.20[/td][/tr][/table]",
                "status": "Pendente",
                "forma_pagamento": "Parcelado Sem Entrada",
                "numero_parcelas": "10",
                "renovacao": "Setembro",
                "valor_total": "5979.48",
                "asaas_id": null,
                "user_id": 10,
                "parcelas": [
                    {
                        "id": 156,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "503.28",
                        "vencimento_parcela": "2025-12-09",
                        "numero_parcela": "1",
                        "status": "pendente",
                        "asaas_id": "pay_3wgv3g31aojn9ojv",
                        "product_id": 16
                    },
                    {
                        "id": 157,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "503.28",
                        "vencimento_parcela": "2026-01-09",
                        "numero_parcela": "2",
                        "status": "pendente",
                        "asaas_id": "pay_p1dku4dij6kjfkm0",
                        "product_id": 16
                    },
                    {
                        "id": 158,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "503.28",
                        "vencimento_parcela": "2026-02-09",
                        "numero_parcela": "3",
                        "status": "pendente",
                        "asaas_id": "pay_pod380zpv7sou25o",
                        "product_id": 16
                    },
                    {
                        "id": 159,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "503.28",
                        "vencimento_parcela": "2026-03-09",
                        "numero_parcela": "4",
                        "status": "pendente",
                        "asaas_id": "pay_jdfsaxmb0gqjn4ep",
                        "product_id": 16
                    },
                    {
                        "id": 160,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "503.28",
                        "vencimento_parcela": "2026-04-09",
                        "numero_parcela": "5",
                        "status": "pendente",
                        "asaas_id": "pay_1r8llvrwwhlm4ucp",
                        "product_id": 16
                    },
                    {
                        "id": 161,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "503.28",
                        "vencimento_parcela": "2026-05-09",
                        "numero_parcela": "6",
                        "status": "pendente",
                        "asaas_id": "pay_ml9h7s02g0ktm75p",
                        "product_id": 16
                    },
                    {
                        "id": 162,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "503.28",
                        "vencimento_parcela": "2026-06-09",
                        "numero_parcela": "7",
                        "status": "pendente",
                        "asaas_id": "pay_hrp4whtv6ebosaxb",
                        "product_id": 16
                    },
                    {
                        "id": 163,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "503.28",
                        "vencimento_parcela": "2026-07-09",
                        "numero_parcela": "8",
                        "status": "pendente",
                        "asaas_id": "pay_kw9ivs4nxacsh7zz",
                        "product_id": 16
                    },
                    {
                        "id": 164,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "503.28",
                        "vencimento_parcela": "2026-08-09",
                        "numero_parcela": "9",
                        "status": "pendente",
                        "asaas_id": "pay_6lzul6lyrvnzoyix",
                        "product_id": 16
                    },
                    {
                        "id": 165,
                        "forma_parcela": "Boleto",
                        "valor_parcela": "503.28",
                        "vencimento_parcela": "2026-09-09",
                        "numero_parcela": "10",
                        "status": "pendente",
                        "asaas_id": "pay_eo43f5kfchombe2z",
                        "product_id": 16
                    }
                ],
                "entrada": {}
            }
        ]
    }
    ]);
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

    function extrairProdutos(bbcode) {
  // Pega todas as linhas da tabela, ignorando o cabeçalho
  const rows = bbcode.match(/\[tr\](.*?)\[\/tr\]/gi).slice(1);

  // Extrai apenas o conteúdo da primeira coluna ([td]Produto[/td])
  const produtos = rows.map(row => {
    const match = row.match(/\[td\](.*?)\[\/td\]/i);
    return match ? match[1] : '';
  });

  // Junta todos os produtos em uma string com " + "
  return produtos.join(' + ');
    };

    

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
          <select value={payContext} onChange={(e)=> setPayContext(e.target.value)} id="method" >
              <option value="parcelado">Parcelado</option>
              <option value="avista">Avista</option>
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
              <option value="credito">Cartão de Crédito</option>
              <option value="boleto">Boleto</option>
              <option value="pix">Pix</option>
          </select>
         </div>  
               </div>    
              :
                payContext === 'avista' ?
               <div className="row">
                <div className="input-wrapper">
         <label htmlFor="method" >Forma de Pagamento</label>
          <select value={methodP} onChange={(e)=> setMethodP(e.target.value)} id="method" >
              <option value="credito">Cartão de Crédito</option>
              <option value="boleto">Boleto</option>
              <option value="pix">Pix</option>
          </select>
                </div>  

                { methodP == 'credito' ? 
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
          :
          null              
                }
               </div>    
              :
               <div className="row">
                <div className="input-wrapper">
         <label htmlFor="method" >Forma de Pagamento das Parcelas</label>
          <select value={methodP} onChange={(e)=> setMethodP(e.target.value)} id="method" >
              <option value="credito">Cartão de Crédito</option>
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
              <option value="credito">Cartão de Crédito</option>
              <option value="boleto">Boleto</option>
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
                   <span>{extrairProdutos(produto.produto)}</span>
                   <span><strong>Status:</strong> {produto.status}</span>
                   <span><strong>Valor:</strong> {formatarDinheiro.format(produto.valor_total)}</span>
                   <span><strong>Forma:</strong> {produto.forma_pagamento}</span>
                  </div>

                  <div className="hover">
                   <FaRegTrashAlt size={24} color="#fff" onClick={async ()=> {
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