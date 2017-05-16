'use strict';

function validateForm(){
   if(document.querySelector('input[name = "polloption"]:checked') == null){
      return false;
   }
   else{
      return true;
   }
}