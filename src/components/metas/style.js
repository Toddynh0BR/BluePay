import styled from "styled-components";

export const Container = styled.div`
min-height: 80vh;
width: 100%;

flex-direction: column;
align-items: center;
display: flex;
gap: 1.5rem;

position: relative;

.top {
  height: fit-content;
  width: 100%;

  justify-content: space-between;
  align-items: center;
  display: flex;
  gap: 1rem;

  .meta {
    height: 11rem;
    width: 100%;

    flex-direction: column;
    display: flex;
    position: relative;

box-shadow: 3px 4px 10px 0px rgba(152,152,152,0.75);
-webkit-box-shadow: 3px 4px 10px 0px rgba(152,152,152,0.75);
-moz-box-shadow: 3px 4px 10px 0px rgba(152,152,152,0.75);
    border-radius: .5rem;
    padding: .5rem 1.5rem;

    h4 {
     font-family: 'Mulish';
     font-size: 1.7rem;
     color: #ffff;

     display: block;
     width: 100%;

     border-bottom: 1px solid #ffffffa7;
     text-shadow: 2px 2px 4px #000;
     padding-bottom: .3rem;
    }



      h3 {
       font-family: 'Mulish';
       font-size: 2rem;
       font-weight: 600;
       color: #ffff; 

       text-shadow: 2px 2px 4px #000;
       margin-top: .5rem;
      }

      h2 {
       font-family: 'Mulish';
       font-size: 2.7rem;
       font-weight: 700;
       color: #ffff; 

       text-shadow: 2px 2px 4px #000;
      }

      h1 {
       font-family: 'Mulish';
       font-size: 3.5rem;
       font-weight: 700;
       color: #ffff; 

       margin-top: 1rem;

       text-shadow: 2px 2px 4px #000;
      }

      p {
        font-family: 'Mulish';
        font-size: 1.2rem;
        color: #ffffffbf;
        text-align: right;
        
        text-shadow: 2px 2px 4px #000;

        position: absolute;
        right: .8rem;
        bottom: .5rem;
      }
  }

  div:nth-child(1) {
    background: rgba(227, 89, 255, 1);
    background: linear-gradient(90deg, rgba(227, 89, 255, 1) 47%, rgba(168, 32, 139, 1)  75%);
  }
  div:nth-child(2) {
    background: rgba(168, 32, 139, 1) ;
    background: linear-gradient(90deg, rgba(168, 32, 139, 1)64%, rgba(133, 0, 199, 1)  100%);
  }
  div:nth-child(3) {
    background: rgba(133, 0, 199, 1);
    background: linear-gradient(90deg, rgba(133, 0, 199, 1) 76%, rgba(75, 0, 204, 1) 100%);
  }
  div:nth-child(4) {
    background: rgba(75, 0, 204, 1);
    background: linear-gradient(90deg, rgba(75, 0, 204, 1) 0%, rgba(0, 0, 198, 1) 79%);
  }
}

.gauges {
  height: fit-content;
  width: 100%;

  align-items: center;
  display: flex;
  gap: 1rem;

  margin-top: 2rem;

  .content {
    height: fit-content;
    width: 100%;

    flex-direction: column;
    align-items: center;
    display: flex;

    border: 1px solid #bababa9e;
    border-radius: 2rem;
    padding: 1rem;

    -webkit-box-shadow: 2px 3px 12px 0px rgba(127,127,127,0.75);
    -moz-box-shadow: 2px 3px 12px 0px rgba(127,127,127,0.75);
    box-shadow: 2px 3px 12px 0px rgba(127,127,127,0.75);

    h2 {
      font-family: 'Mulish';
      color: #333333a3;
      font-size: 2.5rem;

      text-align: center;
      display: block;
      width: 90%;

      border-bottom: 1px solid #a9a9a9ba;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }

   .gauge {
    height: fit-content;
    width: 100%;

    justify-content: center;
    align-items: center;
    display: flex;

    position: relative;
    
    span {
      position: absolute;
      padding-bottom: 5rem;
      z-index: 10;

      font-family: 'Mulish';
      font-size: 3rem;
      font-weight: 800;
      color: #787878;

      text-shadow:
      1px 1px 2px #fff,
      0 0 1em #fff,
      0 0 0.2em #fff;
    }

    .bottom {
      position: absolute;
      bottom: 0rem;
      width: 72%;
      height: 6rem;
      background-color: #fff;
      border-top: 2px solid rgba(127,127,127,0.75);

      justify-content: center;
      align-items: center;
      display: flex;

      .actual {
        font-family: 'Mulish';
        font-size: 1.8rem;
        color: #fff;

        padding: .2rem 2.5rem;
        border-radius: 2rem;

        background: RGBA(0, 0, 198, 1);
        background: linear-gradient(90deg, rgba(0, 0, 198, 1) 0%, rgba(75, 0, 204, 1) 100%);
      }
    }
   }
  }
}

.rankings {
  height: fit-content;
  width: 100%;

  align-items: center;
  display: flex;
  gap: 1rem;

  margin-top: 2rem;

  .ranking {
    height: fit-content;
    width: 100%;

    flex-direction: column;
    align-items: center;
    display: flex;

    border: 1px solid #bababa9e;
    border-radius: 2rem;
    padding: 1rem;

    -webkit-box-shadow: 2px 3px 12px 0px rgba(127,127,127,0.75);
    -moz-box-shadow: 2px 3px 12px 0px rgba(127,127,127,0.75);
    box-shadow: 2px 3px 12px 0px rgba(127,127,127,0.75);

    h2 {
      font-family: 'Mulish';
      color: #333333a3;
      font-size: 2.2rem;

      text-align: left;
      display: block;
      width: 90%;

      border-bottom: 1px solid #a9a9a9ba;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }    

    ul {
      height: 20rem;
      width: 90%;

      list-style: none;
      margin: 0 auto;

      align-items: flex-start;
      flex-direction: column;
      display: flex;

      overflow-y: auto;

      p {
        font-family: 'Mulish', sans-serif;
        font-size: 1.4rem;
        color: #333;
      }

      strong {
        font-family: 'Mulish', sans-serif;
        font-size: 2rem;
        color: #333;
      }

      span {
        font-family: 'Mulish', sans-serif;
        font-size: 1.8rem;
        color: #333;
      }


      li {
        height: 5.5rem;
        width: 100%;

        border-bottom: 1px solid #bababa9e;
        padding: 1rem;

        align-items: center;
        display: flex;
        gap: .5rem;

        img {
          height: 4.5rem;
          width: 4.5rem;

          border-radius: 50%;
          object-fit: cover;
          margin-right: .5rem;
        }
        .space {
          flex: 1;
        }
      }
    }
  }
}


.edit {
  height: 100%;
  width: 100%;

  position: absolute;
  z-index: 100;
  right: 0;
  top: 0;

  background-color: rgba(75, 0, 204, 0.56);
  border-radius: 1rem 1rem 2rem 2rem;

  justify-content: center;
  align-items: center;
  display: flex;

  transition: all.3s ease-in-out;

  h1 {
   font-family: 'Mulish', sans-serif;
   font-size: 4rem;
   color: #fff;

   cursor: pointer;
  }

  opacity: 0;

  &:hover {
    opacity: 1;
  }
}


`

export const Edit = styled.div`
min-height: 60vh;
width: 100%;

flex-direction: column;
align-items: center;
display: flex;
gap: 1.5rem;


.top {
 width: 100%;

 justify-content: space-between;
 align-items: center;
 display: flex;

 padding-bottom: 3rem;

 h3 {
  font-family: 'Mulish', sans-serif;
  font-size: 2.4rem;
  color: #333;
 }

 h5 {
  font-family: 'Mulish', sans-serif;
  color: #33333394;
  font-size: 1.6rem;
  font-weight: 500;

  transition: all.5s ease-in-out;

  &:hover {
    font-weight: 600;
    color: #333;
    cursor: pointer;
  }
 }

}

.row {
  width: 100%;

  justify-content: space-between;
  align-items: center;
  display: flex;
  gap: 2rem;

  .input-wrapper {
    width: 100%;
    
    flex-direction: column;
    display: flex;
    gap: .5rem;

    label {
      font-family: 'Mulish', sans-serif;
      font-size: 1.4rem;
      color: #333;
    }

    input {
     height: 5rem;
     width: 100%;

     -webkit-box-shadow: 3px 4px 10px 0px rgba(152,152,152,0.75);
     -moz-box-shadow: 3px 4px 10px 0px rgba(152,152,152,0.75);
     box-shadow: 3px 4px 10px 0px rgba(152,152,152,0.75);
     border: 1px solid rgb(196, 196, 196);

     border-radius: .8rem;
     padding: 0 2rem;

     font-family: 'Mulish', sans-serif;
     font-size: 1.4rem;
     color: #333;

     outline: none;
    }
  }
}

.finalRow {
  width: 100%;

  justify-content: flex-end;
  align-items: center;
  display: flex;

  button {
    height: 5rem;
    width: 24%;

    -webkit-box-shadow: 3px 4px 10px 0px rgba(152,152,152,0.75);
    -moz-box-shadow: 3px 4px 10px 0px rgba(152,152,152,0.75);
    box-shadow: 3px 4px 10px 0px rgba(152,152,152,0.75);

    background: rgba(75, 0, 204, 1);
    background: linear-gradient(90deg, rgba(75, 0, 204, 1) 0%, rgba(0, 0, 198, 1) 79%);
    
    border-radius: .8rem;
    padding: 0 2rem;
    outline: none;
    border: none;
    
    font-family: 'Mulish', sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #fff;

    transition: all.3s ease-in-out;

    &:hover {
      filter: brightness(80%);
      transform: scale(102%);
      cursor: pointer;
    }
  }
}

`

export const Loading = styled.div`
height: 60vh;
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