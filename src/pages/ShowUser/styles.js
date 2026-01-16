import styled from "styled-components";

export const Container = styled.div`
width: 100%;

justify-content: center;
align-items: center;
display: flex;

padding-top: 3rem;
background-color: #FAFAFA;
`

export const Main = styled.main`
height: auto;
width: 95%;

flex-direction: column;
display: flex;

border: 1px solid #d8d8d8ff;
background-color: #fff;
border-radius: 1rem;
padding: 2rem 3rem;

margin-bottom: 5rem;

box-shadow: 4px 4px 19px 0px rgba(0,0,0,0.18);
-webkit-box-shadow: 4px 4px 19px 0px rgba(0,0,0,0.18);
-moz-box-shadow: 4px 4px 19px 0px rgba(0,0,0,0.18);

header {
 height: fit-content;
 width: 100%;

 justify-content: space-between;
 align-items: center;
 flex-direction: row;
 display: flex;

 margin-bottom: 3rem;
 padding-bottom: 1rem;

 border-bottom: 1px solid #d8d8d8ff;
 
h2 {
 font-family: 'Mulish';
 font-weight: 600;
 font-size: 2.6rem;
 color: #333333;
}

h5 {
 font-family: 'Mulish';
 font-weight: 500;
 font-size: 1.3rem;
 color: #333333;
 margin-top: .5rem;
}

img {
 height: auto;
 width: 10rem;

 margin-top: -.5rem;
}

div {
 align-items: center;
 display: flex;
 gap: 1rem;

 svg {
  cursor: pointer;
 }
}
 svg {
  cursor: pointer;
 }
}


.info {
justify-content: space-between;
flex-direction: row;
align-items: center;
display: flex;
gap: 10rem;

position: relative;

.Item {
flex-direction: column;
display: flex;

gap: .5rem;
}

span {
 font-family: 'Mulish';
 font-weight: 300;
 color: #333333;
 font-size: 1.8rem;
}

h3 {
 font-family: 'Mulish';
 font-weight: 600;
 color: #333333;
 font-size: 1.9rem;

 margin-top: .3rem;
}

h4 {
 font-family: 'Mulish';
 font-size: 1.4rem;
 font-weight: 400;
 color: #333333;

 line-height: 1.6rem;
 position: absolute;
 bottom: -1rem;
}
p {
 font-family: 'Mulish';
 font-size: 1.2rem;
 font-weight: 400;
 color: #333333;

 line-height: 1.6rem;
 position: absolute;
 bottom: -2.5rem;
}

button {
 height: 3.5rem;
 width: 100%;

 margin-top: .5rem;
 background-color: rgba(0,0,198,1);
 border-radius: .6rem;
 border: none;

 font-family: 'Mulish';
 font-size: 1.6rem;
 font-weight: 600;
 color: #fff;

 transition: .3s ease-in-out;
 &:hover {
  background-color: rgba(75, 0, 204, 1);
  cursor: pointer;
 }
}
}

.bills {
 width: 100%;

 overflow: hidden;
 margin-top: 3rem;
 padding-top: 1.5rem;

 span {
 font-family: 'Mulish';
 font-weight: 300;
 color: #333333;
 font-size: 2rem;
 }

 h3 {
 font-family: 'Mulish';
 font-weight: 600;
 color: #333333;
 font-size: 1.9rem;

 margin-top: .3rem;
}

.top {
 align-items: center;
 display: flex;
 width: 100%;

 margin-top: 1rem;
 margin-bottom: .5rem;
 padding: 0 .8rem;
 span:nth-child(1){
    width: 5%;
 }
 span:nth-child(2){
   width: 12%;
 }
 span:nth-child(3){
     width: 13%;
 }
 span:nth-child(4){
  width: 15%;
 }
 span:nth-child(5){
  width: 14%;
 }
 span:nth-child(6){
  width: 15%;
 }
 span:nth-child(7){

  flex: 1;

 }
 span {
  font-size: 1.6rem;
 }

 position: relative;
  .set {
  position: absolute;
  right: 0;

   animation: spinOpen 0.7s ease forwards;
  @keyframes spinOpen {
    from {
     transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }
 }
 .closeds {
   animation: spinClose 0.7s ease forwards;
  @keyframes spinClose {
    from {
     transform: rotate(180deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
 }

}

.parcelas {
 width: 100%;

 animation: open 0.7s ease forwards;
 overflow: auto;
 overflow-x: hidden;

 align-items: center;
 flex-direction: column;
 display: flex;
 gap: .5rem;
 position: relative;


 padding: .5rem .8rem 2rem .8rem;

 .parcela {
  height: 10rem;
  width: 100%;

  border: 1px solid #d8d8d8ff;
  border-radius: .6rem;

  transition: .3s ease-in-out;

  align-items: center;
  display: flex;

  padding: 0 2rem;

  span:nth-child(1){
    width: 4%;
  }
  span:nth-child(2){
     width: 12.5%;
     font-size: 1.5rem;
     overflow: hidden;
  }
  span:nth-child(3){
     width: 13.5%;
  }
  span:nth-child(4){
     width: 15.5%;
  }
  span:nth-child(5){
     width: 14%;
  }
  span:nth-child(6){
     width: 16%;
  }
  button {
 height: 3.5rem;
 width: 15%;
 margin: .2rem 0;
 background-color: rgba(0,0,198,1);
 border-radius: .6rem;
 border: none;

 font-family: 'Mulish';
 font-size: 1.6rem;
 font-weight: 600;
 color: #fff;

 transition: .3s ease-in-out;
 &:hover {
  background-color: rgba(75, 0, 204, 1);
  cursor: pointer;
 
}
  }

  .statusPay {
  height: 2.4rem;
  width: fit-content;

  justify-content: center;
  align-items: center;
  display: flex;

  padding: 0 2rem;

  background-color: #E1FFDC;
  border-radius: 1.6rem;

  font-family: 'Mulish';
  font-size: 1.6rem;
  font-weight: 500;
  color: #07A104;
  }
  .statusPendent {
  height: 2.4rem;
  width: fit-content;

  justify-content: center;
  align-items: center;
  display: flex;

  padding: 0 2rem;

  background-color: #FFF5DC;
  border-radius: 1.6rem;

  font-family: 'Mulish';
  font-size: 1.6rem;
  font-weight: 500;
  color: #E2B102;
  }
  .statusVencid {
  height: 2.4rem;
  width: fit-content;

  justify-content: center;
  align-items: center;
  display: flex;

  padding: 0 2rem;

  background-color: #ffdcdcff;
  border-radius: 1.6rem;

  font-family: 'Mulish';
  font-size: 1.6rem;
  font-weight: 500;
  color: #e20202ff;
  }

  span {
   font-size: 1.6rem;
   font-weight: 600;
  }
  &:hover {
   transform: scale(100.3%);
  }
 }
 .parcelaMobile {
   display: none;
   height: 0;
   width: 0;
 }

 @keyframes open {
 from{
   height: 5rem;
   overflow: hidden;
 }
 to{
  height: 40rem;
  overflow: auto;
 }
} 
}

.closed {
 
 animation: close 0.7s ease forwards;
   .parcela {
    opacity: 0;
  }
}

@keyframes close {
 from{
   height: 40rem;
   overflow: auto;
 }
 to{
  height: 5rem;
  overflow: hidden;

 }
} 
}

@media screen and (max-width: 400px) {
 max-width: 95%;
 
 header {
 height: fit-content;
 width: 100%;

 justify-content: space-between;
 align-items: center;
 flex-direction: row;
 display: flex;

 margin-bottom: 2.8rem;
 padding-bottom: .8rem;

 border-bottom: 1px solid #d8d8d8ff;
 
h2 {
 font-family: 'Mulish';
 font-weight: 600;
 font-size: 2rem;
 color: #333333;
}

h5 {
 font-family: 'Mulish';
 font-weight: 500;
 font-size: .8rem;
 color: #333333;
 margin-top: .4rem;
}

img {
 height: auto;
 width: 5rem;

 margin-top: -.5rem;
}
}

.info {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 colunas */
  grid-template-rows: repeat(2, 6rem);  /* 2 linhas (altura opcional) */
  gap: 5rem; /* espaço entre os itens */

.Item {
flex-direction: column;
display: flex;

gap: .5rem;
}

span {
 font-size: 1.6rem;
 line-height: 1.8rem;
}

h3 {
 font-size: 1.4rem;
 margin-top: .2rem;
 width: 10rem;
  line-height: 1.6rem;
 max-height: 3.2rem;
 overflow: hidden;
  text-overflow: ellipsis;
}

h4 {
 font-size: 1.4rem;
 line-height: 1.6rem;
 position: absolute;
 bottom: -1rem;
}
p {
 font-family: 'Mulish';
 font-size: 1.2rem;
 font-weight: 400;
 color: #333333;

 line-height: 1.6rem;
 position: relative;
 bottom: 0;
}

button {
 height: 3.2rem;
 margin-top: .3rem;
}
}

.bills {
 margin-top: 2rem;
 padding-top: 1rem;

 span {
 font-size: 1.6rem;
 }

 h3 {
 font-size: 1.2rem;
 margin-top: .2rem;
}

.top {
 display: none;
}

.parcelas {
 height: fit-content;
 width: 100%;

 overflow: auto;
 overflow-x: hidden;

 align-items: center;
 flex-direction: column;
 display: flex;
 gap: .5rem;


 padding: .5rem 0rem 2rem 0rem;
 position: relative;

 .set {
  position: absolute;
  top: -2.5rem;
  right: 0;
 }

 .parcela {
   display: none;
 }
 .parcelaMobile {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 colunas */
  grid-template-rows: repeat(3, 4rem);  /* 2 linhas (altura opcional) */
  gap: 1rem; /* espaço entre os itens */
  height: fit-content;
  width: 100%;
  align-items: center;

  border: 1px solid #d8d8d8ff;
  border-radius: .6rem;

  transition: .3s ease-in-out;


  padding: 0 2rem;


  span:nth-child(1){
  width: fit-content;
  }
  span:nth-child(2){
   width: fit-content;
  }
  span:nth-child(3){
    width: fit-content;
  }
  span:nth-child(4){
     width: fit-content;
  }
  span:nth-child(5){
     width: fit-content;
  }
  span:nth-child(6){
     width: fit-content;
  }

   button {
 height: 3.5rem;
 width: 100%;
 margin: .2rem 0;
 background-color: rgba(0,0,198,1);
 border-radius: .6rem;
 border: none;

 font-family: 'Mulish';
 font-size: 1.6rem;
 font-weight: 600;
 color: #fff;

 transition: .3s ease-in-out;
 &:hover {
  background-color: rgba(75, 0, 204, 1);
  cursor: pointer;
 
}
  }

  .statusPay {
  height: 2.4rem;
  width: fit-content;

  justify-content: center;
  align-items: center;
  display: flex;

  padding: 0 2rem;

  background-color: #E1FFDC;
  border-radius: 1.6rem;

  font-family: 'Mulish';
  font-size: 1.6rem;
  font-weight: 500;
  color: #07A104;
  }
  .statusPendent {
  height: 2.4rem;
  width: fit-content;

  justify-content: center;
  align-items: center;
  display: flex;

  padding: 0 2rem;

  background-color: #FFF5DC;
  border-radius: 1.6rem;

  font-family: 'Mulish';
  font-size: 1.6rem;
  font-weight: 500;
  color: #E2B102;
  }
  .statusVencid {
  height: 2.4rem;
  width: fit-content;

  justify-content: center;
  align-items: center;
  display: flex;

  padding: 0 2rem;

  background-color: #ffdcdcff;
  border-radius: 1.6rem;

  font-family: 'Mulish';
  font-size: 1.6rem;
  font-weight: 500;
  color: #e20202ff;
  }

  span {
   font-size: 1.2rem;
  }

 }
}
}
}
`

export const Product = styled.div`
flex: 1;
height: fit-content;

flex-direction: column;
display: flex;
margin-bottom: 5rem;
padding-bottom: 5rem;
border-bottom: 1px solid #cbcbcbff;
`

export const Loading = styled.div`
height: 100vh;
width: 100%;

justify-content: center;
align-items: center;
display: flex;

div {
 height: 8rem;
 width: 8rem;

 border: 1rem solid rgba(0,0,198,0.2);
 border-top: 1rem solid rgba(0,0,198,1);

 border-radius: 50%;

 animation: spin 1s linear infinite;

 @keyframes spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg);
 }
}
}
`