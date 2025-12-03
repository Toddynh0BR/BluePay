import styled from "styled-components";

export const Container = styled.div`
min-height: 100vh;
justify-content: center;
align-items: center;
display: flex;

padding-top: 3rem;
background-color: #FAFAFA;
`

export const Main = styled.main`
height: 100%;
width: 95%;

flex-direction: column;
display: flex;

border: 1px solid #d8d8d8ff;
background-color: #fff;
border-radius: 1rem;
padding: 2rem 3rem;

margin-bottom: 2rem;

transition: .3s ease-in-out;
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
 
  svg {
  cursor: pointer;
 }

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
}


.content {
 flex: 1;
transition: .3s ease-in-out;
 justify-content: space-between;

 display: flex;

 input::-webkit-outer-spin-button,
 input::-webkit-inner-spin-button {
    -webkit-appearance: none; 
    margin: 0; 
 } 

 .calculator {
  height: 100%;
  width: 50%;
  padding-right: 2rem;
 align-items: flex-start;
  border-right: 1px solid #d4d4d4ff;
transition: .3s ease-in-out;
  flex-direction: column;
  display: flex;

  h3 {
    font-family: 'Mulish';
    font-weight: 600;
    font-size: 2.4rem;
    color: #7c7c7cff;

    margin-bottom: 2rem;
  }

   .row {
  align-items: center;
  display: flex;
  width: 100%;
  gap: 2rem;

  margin-bottom: 5rem;

  h1 {
    font-family: 'Mulish';
    font-size: 2.2rem;
    color: #888888ff;
  }
 }

    .rowF {
    
  flex-direction: column;
  display: flex;
  width: 100%;
  gap: 2rem;
  flex: 1;

  margin-bottom: 5rem;

  h1 {
    font-family: 'Mulish';
    font-size: 2.2rem;
    color: #888888ff;
  }

  p {
   font-family: 'Mulish';
   font-size: 1.6rem;
   font-weight: 400;
   color: #888888ff; 
  }

  span {
   font-family: 'Mulish';
   font-size: 1.8rem;
   font-weight: 300;
   color: #888888ff;

   strong {
    font-size: 1.9rem;
    font-weight: 500;
   }
  }
 }

  .input-wrapper { 
 width: 100%;
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

 input, select {
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

  transition: .3s ease-in-out;

    &:focus {
          border: 1px solid rgba(115,0,204,1);
    }
 }


 .priceDiv {
  height: 4.5rem;
  width: 100%;

  border: 1px solid #DEDEDE;
  border-radius: .6rem;

  align-items: center;
  display: flex;

  transition: .3s ease-in-out;
  position: relative;

  overflow: hidden;

  input {
  height: 100%;
  width: 100%;

  border: none;
  padding: 0;
  padding: .1rem 4rem .1rem 1.2rem;
  }
  select {
    border-radius: .6rem 0 0 .6rem;
        &:focus {
          border: 1px solid #DEDEDE;
    }
  }

  .real {
   height: 100%;
   width: 4.5rem;

   justify-content: center;
   align-items: center;
   display: flex;

   font-family: 'Mulish';
   font-weight: medium;
   color: #fff;
   font-size: 1.5rem;
   
   background-color: #5958587c;
  }

  .incrementDecrement {
    height: 100%;
    width: 4.5rem;

   justify-content: center;
   align-items: center;
   display: flex;
   flex-direction: column;
   font-family: 'Mulish';
   font-weight: bold;
   color: #fff;
   font-size: 2rem;


   p {
    line-height: 1.9rem;
    cursor: pointer;
    user-select: none;
    transition: .3s ease-in-out;
    &:hover {
      color: rgba(115,0,204,1);
    }
   }
   
   background-color: #5958587c;
  }
 
 }

 .priceDiv:focus-within {
  border: 1px solid rgba(115,0,204,1);
 }
 }
 }


  .clients {
  height: fit-content;
  width: 49%;


  flex-direction: column;
  display: flex;

  span {
    font-family: 'Mulish';
    font-size: 1.4rem;
    color: #333333;

  }

  .top {
    height: fit-content;
    width: 100%;

    justify-content: space-between;
    align-items: center;
    display: flex;

    margin-bottom: 2rem;

   h3 {
    font-family: 'Mulish';
    font-weight: 600;
    font-size: 2.4rem;
    color: #7c7c7cff;
   }

   svg {
    cursor: pointer;
   }

   .rotate {
    animation: rotate 1.4s ease-in-out infinite;
    @keyframes rotate {
     from {
      transform: rotate(0deg);
     }
     to {
      transform: rotate(360deg);
     }
    }
   }

   .twoB {
    display: flex;
    align-items: center;

    gap: 1rem;

    button {
      height: 3rem;
      width: 10rem;

      background-color: rgba(115,0,204,1);
      border: none;
      border-radius: .6rem;
      font-family: 'Mulish';
      font-size: 1.6rem;
      font-weight: 600;
      color: #fff;

      transition: .3s ease-in-out;

      &:hover {
        cursor: pointer;
        filter: brightness(90%);
      }
    }
   }
  }

  .list {
    height: 40rem;
    width: 100%;

    flex-direction: column;
    display: flex;
    gap: 1rem;

    overflow-y: auto;
    overflow-x: hidden;

    .client {
      min-height: 6rem;
      width: 100%;

      border: 1px solid #d8d8d8ff;
      border-radius: .6rem;
      
      transition: .3s ease-in-out;
      
      flex-direction: column;
      display: flex;
      flex-shrink: 0;
      padding: 0 1rem .5rem 1rem;

      .topper {
        height: 6rem;
        width: 100%;
        
        justify-content: space-between;
        align-items: center;
        display: flex;
        
        .set {
          
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

      .infors {
       width: 100%;
       overflow: hidden;

      max-height: 0;
      opacity: 0;
      transition: 
        max-height .35s ease,
        opacity .25s ease;

        .input-wrapperI {
         height: fit-content;
         width: 50%;

         align-items: center;
         display: flex;
         gap: .2rem;
        }
        input {
          height: 1.8rem;
          width: 80%;
          outline: none;
          border: none;
          font-size: 1.3rem;
          
          border-bottom: 1px solid #b6b6b6ff;
          margin-top: .2rem;
        }
              .rowI {
        height: fit-content;
        width: 100%;

        align-items: center;
        display: flex;

        span {
          strong {
            font-weight: 500;
          }
        }
      }
      }

      .produtos {
       min-height: 5rem;
       width: 100%;

       border: 1px solid #d8d8d8ff;
       border-radius: .6rem;
       padding: .4rem;

       flex-direction: column;
       display: flex;
       gap: 1rem;

       strong {
        font-weight: 600;
       }

       .row {
        justify-content: space-between;
        align-items: center;
        display: flex;
       }

       position: relative;
       overflow: hidden;
       

       .hover {
        height: 100%;
        width: 100%;

        background-color: rgba(115,0,204,1);
        user-select: none;
        opacity: 0;

        justify-content: center;
        align-items: center;
        display: flex;

        position: absolute;
        top: 0;
        left: 0;
        transition: .3s ease-in-out;

        svg {
          cursor: pointer;
        }
       }

       &:hover {
        .hover {
          opacity: .7;
          user-select: all;
        }
       }
      }
    }

    .cOpen {
     min-height: 20rem;
     flex-shrink: 0;
     transition: .3s ease-in-out;

     .infors {
      flex-direction: column;
      display: flex;
      gap: 1rem;

      max-height: 60rem; 
      opacity: 1;


    }


    }
  }
 }
}
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
