document.addEventListener('DOMContentLoaded', function () {
    const liveToastBtn = document.getElementById('liveToastBtn');
   
       liveToastBtn.addEventListener('click', function () {
           newElement();
       });
   
       function newElement() {
           const inputValue = document.getElementById("task").value.trim();
           const list = document.getElementById("list");
   
           if (!inputValue) {
               $(".error").toast("show");
               return; 
           }
           const li = document.createElement("li");
           li.textContent = inputValue;
           list.appendChild(li);
           document.getElementById("task").value = "";
           $(".success").toast("show");
   

           document.addEventListener("click", function () {
               this.classList.toggle("checked");
           });

           addCloseButtonToListItems();  
       }
   
       list.addEventListener('click', function (ev) {
           if (ev.target.tagName === 'LI') {
               ev.target.classList.toggle('checked');
           }
       });
   
       function addCloseButtonToListItems() {
           const listItems = document.querySelectorAll('#list li');
   
           listItems.forEach(function(item) {
               const closeButton = document.createElement('span');
               closeButton.textContent = '×';
               closeButton.className = 'close';
               item.appendChild(closeButton);
   
               closeButton.addEventListener('click', () => item.remove());
           });
       }
       addCloseButtonToListItems();
   });