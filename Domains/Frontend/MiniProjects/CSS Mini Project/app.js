let gallery_btn=document.querySelector("#gallery");
let newBtn=document.createElement("button");
gallery_btn.addEventListener("click",()=>{

    gallery_btn.style.color="red";
    document.querySelector(".menu").append(newBtn);
    newBtn.innerText="new button";

})