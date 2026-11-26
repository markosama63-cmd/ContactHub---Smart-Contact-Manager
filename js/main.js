var photoInput = document.getElementById("photoInput");
var fullName = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var email = document.getElementById("email");
var address = document.getElementById("address");
var group = document.getElementById("group");
var description = document.getElementById("description");
var options = document.getElementsByName("options");
var cardInfo = document.getElementById("cardInfo");
var contactModal = document.getElementById("contactModal");
var addbtn = document.getElementById("addbtn");
var updatebtn = document.getElementById("updatebtn");
var search = document.getElementById("search");
var totalValue=document.getElementById('totalValue')
var totalFavorite=document.getElementById('totalFavorite')
var  totalEmergency=document.getElementById('totalEmergency')
var  favoritesList=document.getElementById('favoritesList')
var emergencyList=document.getElementById('emergencyList')
var previewImg = document.getElementById("previewImg");
var fileName = document.getElementById("fileName");

var allPersonal;
allPersonal = JSON.parse(localStorage.getItem("allpersonal")) || [];
displayPersonalInfo();
updateStats()
changeFavoriteList()
function addPersonaInfo() {
    
   if(!checkForm()){
    return;
    
   }
  var personal = {
    Name: fullName.value,
    Number: phoneNumber.value,
    Email: email.value,
    Address: address.value,
    Category: group.value,
    Description: description.value,
    Image:photoInput.files[0]?.name ||"avatar-1.jpg",
    
    Condition: getOptions(),
  };
  allPersonal.push(personal);

  displayPersonalInfo();
  updateStats()
  handleLocalStorage();
  
   clearInputs();
  closeAddEdit();
  Swal.fire({
    title: "Added",
    icon: "success",
    draggable: true,
  });
  console.log(allPersonal);
 
}

function displayPersonalInfo(list = allPersonal, searchTerm) {
  var temp = "";
  for (let i = 0; i < list.length; i++) {
    temp += `
      <div class="col-12 col-md-6">
            <article class="card contact-card">
              <div class="card-body">
                <div class="d-flex align-items-center gap-3 mb-3">
                  <span class="contact-avatar">${getInitials(list[i].Name)}</span>
                  <div class="min-w-0">
                    <h2 class="contact-name mb-2">${searchTerm ? list[i].Name.replace(searchTerm, `<span class="bg-warning">${searchTerm}</span>`) : list[i].Name}</h2>
                    <div class="d-flex align-items-center gap-2">
                      <span class="info-icon bg-blue-soft"><i class="fa-solid fa-phone"></i></span>
                      <span class="contact-phone">${list[i].Number}</span>
                    </div>
                  </div>
                </div>

                <ul class="list-unstyled contact-info mb-3">
                  <li class="d-flex align-items-center gap-3">
                    <span class="info-icon bg-purple-soft"><i class="fa-solid fa-envelope"></i></span>
                    <span class="text-break">${list[i].Email}</span>
                  </li>
                  <li class="d-flex align-items-center gap-3">
                    <span class="info-icon bg-green-soft"><i class="fa-solid fa-location-dot"></i></span>
                    <span>${list[i].Address}</span>
                  </li>
                </ul>

                <span class="badge tag-badge">${list[i].Category}</span>
              </div>

              <div class="card-footer contact-actions d-flex align-items-center justify-content-between">
                <div class="d-flex gap-2">
                  <a href="tel:${list[i].Number}" class="action-btn action-call" aria-label="Call"><i class="fa-solid fa-phone"></i></a>
                  <a href="mailto:${list[i].Email}" class="action-btn action-mail" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
                </div>
                <div class="d-flex gap-1">
                  <button class="action-btn action-ghost" type="button" aria-label="Add to favorites" onclick="favoriteToggle(${i})"><i class="fa-regular fa-star"></i></button>
                  <button class="action-btn action-ghost" type="button" aria-label="Mark as emergency" onclick="emergencyToggle(${i})"><i class="fa-regular fa-heart"></i></button>
                  <button class="action-btn action-ghost" type="button" aria-label="Edit" onclick="updateData(${i})"><i class="fa-solid fa-pencil"></i></button>
                  <button class="action-btn action-ghost" type="button" aria-label="Delete" onclick="deletePersonalInfo(${i})"><i class="fa-solid fa-trash"></i></button>
                </div>
              </div>
            </article>
          </div>
      `;
  }
  cardInfo.innerHTML = temp;
}
function deletePersonalInfo(index) {
  console.log(index);
  allPersonal.splice(index, 1);
  displayPersonalInfo();
  updateStats()
  handleLocalStorage();
  

  Swal.fire({
    title: "Deleted",
    icon: "success",
    draggable: true,
  });
}
var currentIndex;
function updateData(index) {
  currentIndex = index;
  openAddEdit();
  changeToggle(true);
  fullName.value = allPersonal[index].Name;

  phoneNumber.value = allPersonal[index].Number;
  email.value = allPersonal[index].Email;
  address.value = allPersonal[index].Address;
  group.value = allPersonal[index].Category;
  description.value = allPersonal[index].Description;
  fileName.innerHTML = allPersonal[index].Image;


  for (let i = 0; i < options.length; i++) {
    if (allPersonal[index].Condition.includes(options[i].value)) {
      options[i].checked = true;
    }
  }
}
function onUpdateData() {
  if (!checkForm()) {
    return;
}
  var personal = {
    Name: fullName.value,
    Number: phoneNumber.value,
    Email: email.value,
    Address: address.value,
    Category: group.value,
    Description: description.value,
    Image:photoInput.files[0]?.name || allPersonal[currentIndex].Image,
    
    Condition: getOptions(),
  };
  allPersonal.splice(currentIndex, 1, personal);
  displayPersonalInfo();
  handleLocalStorage();
  changeToggle();
  updateStats()
  clearInputs();
  closeAddEdit();
  Swal.fire({
    title: "Updated",
    icon: "success",
    draggable: true,
  });
}
function getOptions() {
  var newArr = [];
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      newArr.push(options[i].value);
    }
  }
  return newArr;
}
function openAddEdit() {
  contactModal.classList.remove("d-none");
  clearInputs()
  changeToggle()
}
function closeAddEdit() {
  contactModal.classList.add("d-none");
}
function clearInputs() {
  fullName.value = "";
  phoneNumber.value = "";
  email.value = "";
  address.value = "";
  group.value = "";
  description.value = "";
  photoInput.value = "";
   fileName.innerHTML = "";
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}
function changeToggle(isupdate) {
  if (isupdate) {
    addbtn.classList.add("d-none");
    updatebtn.classList.remove("d-none");
  } else {
    addbtn.classList.remove("d-none");
    updatebtn.classList.add("d-none");
  }
}
function handleLocalStorage() {
  localStorage.setItem("allpersonal", JSON.stringify(allPersonal));
}
function searchInput() {
  var newArr = [];
  for (let i = 0; i < allPersonal.length; i++) {
    if (allPersonal[i].Name.toLowerCase().includes(search.value.toLowerCase())) {
      newArr.push(allPersonal[i]);
    }
  }
  displayPersonalInfo(newArr, search.value);
}
var regex = {
  Name: /^[a-zA-Z0-9 ]{3,15}$/,
  Price: /^[0-9]{3,10}$/,
  Description: /^[a-zA-Z0-9 ]{3,15}$/,
  Image: "",
  phoneNumber: /^01[0125][0-9]{8}$/,
  Email:/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
  Address: /^[a-zA-Z0-9]{5,15}$/,
};
function validate(regexParam, inputName) {
  if (regex[regexParam].test(inputName.value)) {
    inputName.nextElementSibling.classList.add("d-none");
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    return true
  } else {
    inputName.nextElementSibling.classList.remove("d-none");
    inputName.classList.remove("is-valid");
    inputName.classList.add("is-invalid");
    return false
  }
}
function changeTotalValue(){
  totalValue.innerHTML=allPersonal.length
}

function ChangeFavoriteValue(){
  var counter=0
  for (let i = 0; i < allPersonal.length; i++) {
    if(allPersonal[i].Condition.includes("Favorite")){
      counter++
    }
    
  }
totalFavorite.innerHTML=counter
}
function ChangeEmergencyValue(){
  var counter=0
  for (let i = 0; i < allPersonal.length; i++) {
    if(allPersonal[i].Condition.includes("Emergency")){
      counter++
    }
    
  }
totalEmergency.innerHTML=counter
}
function updateStats(){
   changeTotalValue();
  ChangeFavoriteValue();
  ChangeEmergencyValue();
  changeFavoriteList()
  changeEmergencyList()
}
function changeFavoriteList(){

  var temp = "";

  for (let i = 0; i < allPersonal.length; i++) {
    
    if (allPersonal[i].Condition.includes("Favorite")) {
      temp += `
        <div class="side-item">
          <span class="side-avatar avatar-c${i % 4}">${getInitials(allPersonal[i].Name)}</span>
          <div class="side-info">
            <div class="side-name">${allPersonal[i].Name}</div>
            <div class="side-number">${allPersonal[i].Number}</div>
          </div>
          <a href="tel:${allPersonal[i].Number}" class="side-call call-green" aria-label="Call">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>`;
    }
  }

  // if nobody is a favorite, show the empty message
  if (temp === "") {
     temp=`
      <div class="side-body d-flex align-items-center justify-content-center">
            <span class="empty-text">No favorites yet</span>
           
          </div>
     `
  }

  favoritesList.innerHTML = temp;
}
function getInitials(name) {
  return name.trim().split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
}

function changeEmergencyList(){
  var temp = "";

  for (let i = 0; i < allPersonal.length; i++) {
    
    if (allPersonal[i].Condition.includes("Emergency")) {
      temp += `
        <div class="side-item">
          <span class="side-avatar avatar-c${i % 4}">${getInitials(allPersonal[i].Name)}</span>
          <div class="side-info">
            <div class="side-name">${allPersonal[i].Name}</div>
            <div class="side-number">${allPersonal[i].Number}</div>
          </div>
          <a href="tel:${allPersonal[i].Number}" class="side-call call-green" aria-label="Call">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>`;
    }
  }

  // if nobody is a favorite, show the empty message
  if (temp === "") {
     temp=`
       <div class="side-body d-flex align-items-center justify-content-center">
            <span class="empty-text">No emergency contacts</span>
          </div>
     `
  }

  emergencyList.innerHTML = temp;
}

function checkForm() {
    var isNameValid = validate("Name", fullName);
    var isPhoneValid = validate("phoneNumber", phoneNumber);
    var isEmailValid = validate("Email", email);
    var isAddressValid = validate("Address", address);
    var isDescriptionValid = validate("Description", description);

    return (
        isNameValid &&
        isPhoneValid &&
        isEmailValid &&
        isAddressValid &&
        isDescriptionValid
    );
}
function favoriteToggle(index){
if(allPersonal[index].Condition.includes('Favorite')){

  allPersonal[index].Condition.shift()
}
else
allPersonal[index].Condition.unshift('Favorite')

changeFavoriteList()
ChangeFavoriteValue()


}
function emergencyToggle(index){
if(allPersonal[index].Condition.includes('Emergency')){

  allPersonal[index].Condition.pop()
}
else
allPersonal[index].Condition.push('Emergency')
 changeEmergencyList()
ChangeEmergencyValue()



}





  