import styled from "styled-components";

export const Container = styled.div`
height: 100vh;
width: 100%;

justify-content: center;
align-items: center;
display: flex;

background: rgb(0,0,198);
background: linear-gradient(120deg, rgba(0,0,198,1) 0%, rgba(115,0,204,1) 100%);
`

export const Form = styled.div`
height: fit-content;
width: 44.4rem;

box-shadow: 20px 19px 14px -4px rgba(0,0,0,0.66);
-webkit-box-shadow: 10px 19px 14px -4px rgba(0,0,0,0.66);
-moz-box-shadow: 10px 19px 14px -4px rgba(0,0,0,0.66);

background-color: #fff;
border-radius: 1rem;
padding: 3rem 4rem 8rem;

justify-content: center;
flex-direction: column;

display: flex;

img {
 width: 15rem;
 height: auto;

 align-self: center;

 margin-bottom: 2.7rem;
}

h1 {
font-family: 'Mulish';
font-weight: bold;
color: #0e0027ff;
font-size: 2.4rem;

margin-bottom: 0rem;
}

.input-wrapper {
 flex-direction: column;
 display: flex;
 gap: 1.2rem;

 margin-top: 1rem;

 label {
  font-family: 'Mulish';
  font-weight: medium;
  font-size: 1.6rem;
  color: #333333;
 }

 input {
  height: 4.5rem;
  width: 100%;

  border: 1px solid #DEDEDE;
  border-radius: .6rem;
  padding: 0 1.2rem;

  font-family: 'Mulish';
  font-weight: medium;
  font-size: 1.5rem;
  color: #333333;

  outline: none;
  &:focus{
    border: 1px solid rgba(115,0,204,1);
  }

  transition: .3s ease-in-out;
 }


 .passwordDiv {
  height: 4.5rem;
  width: 100%;

  border: 1px solid #DEDEDE;
  border-radius: .6rem;

  align-items: center;
  display: flex;

  transition: .3s ease-in-out;
  position: relative;

  input {
  height: 100%;
  width: 100%;

  border: none;
  padding: 0;
  padding: .1rem 4rem .1rem 1.2rem;
  }
 
  .icon {
    position: absolute;
    right: 1.2rem;
    height: 2.4rem;
    width: 2.4rem;

    margin-left: 1rem;
    color: #333333;

    cursor: pointer;
  }
 }

 .passwordDiv:focus-within {
  border: 1px solid rgba(115,0,204,1);
 }
}

button {
 height: 4.5rem;
 width: 100%;

 border: none;
 margin-top: 2.5rem;
 border-radius: .6rem;

 font-family: 'Mulish';
 font-weight: bold;
 color: #ffffff;
 font-size: 1.8rem;

 background: rgb(0,0,198);
 background: linear-gradient(120deg, rgba(0,0,198,1) 0%, rgba(115,0,204,1) 100%);
 transition: .3s ease-in;

 &:hover {
  cursor: pointer;
  filter: brightness(80%);
 }
}

@media screen and (max-width: 400px) {

 max-width: 95%;
}
`
