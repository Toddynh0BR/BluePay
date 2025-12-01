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
`

