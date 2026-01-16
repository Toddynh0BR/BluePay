import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
 font-family: "Lexend Deca", sans-serif;

 ::-webkit-scrollbar {
  width: .5rem;
}

::-webkit-scrollbar-track {
  background: #2d405c;
}

::-webkit-scrollbar-thumb {
  background: #000; 
  border-radius: 1rem;
}


}

:root {
 font-size: 62.5%;
}

body {
 background-color:  #fff;
 overflow-y: scroll;
 overflow-x: hidden;

}

a {
 text-decoration: none;
}


.p-datepicker {
  background: #ffffff;
  font-family: 'Mulish', sans-serif;
  border-radius: .8rem;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,.15);
}


.p-datepicker-header {
  font-family: 'Mulish', sans-serif;
  font-size: 1.6rem;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
  padding-bottom: .5rem;
}

.p-datepicker-month, .p-datepicker-year {
    font-family: 'Mulish', sans-serif;
    font-size: 1.6rem;
};

.p-datepicker-title {
  display: flex;
  align-items: center;
  gap: .5rem;
}


.p-datepicker table td {
  padding: 0.5rem;
}


.p-datepicker table td > span.p-highlight {
  background: #2563eb;
  color: white;
  border-radius: 8px;
}

.text-group {
  opacity: 0;
}
`

