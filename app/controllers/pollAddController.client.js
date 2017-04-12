'use strict';
/* global httpRequest*/

(function() {
   var createPollButton = document.querySelector('.btn-create-poll');
   var pollsApiUrl = 'http://dynamic-web-application-projects-generalwellbeing.c9users.io/api/polls/';
   
   function ready(fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   }
   
   createPollButton.addEventListener('click', function () {
      var newPollName = document.getElementById('pollName').value;
      var options = [];
      var i=0;
      
      do{
         options.push(document.getElementById('option' + i).value);
         i++;
      }while(document.getElementById('option' + i) !== null);
      
      httpRequest('POST', pollsApiUrl + "addpoll", {pollname: newPollName, polloptions: options}, function () {
         window.location.href = "/";
      });

   }, false);
})();