let modalClass = document.querySelectorAll('.modal')
    let modalPolicy = document.getElementById("modal-policy");
    let modalTerms = document.getElementById("modal-terms");
    let modalReturn = document.getElementById("modal-return");
    let modalCertificate = document.getElementById("modal-certificate");
    let btnPolicy = document.getElementById("open-popup-policy");
    let btnTerms = document.getElementById("open-popup-terms");
    let btnReturn = document.getElementById("open-popup-return");
    let btnCertificate = document.querySelector(".merging__btn");
    let modalCloseBtn = document.querySelectorAll(".modal-close");

    let btnSlide = document.querySelectorAll(".open-popup-slide");

    btnSlide.forEach(slide =>{
        slide.addEventListener('click',()=>{
            let slideId = slide.dataset.slide;
            let popup = document.querySelector(`.${slideId}`)
            popup.style.display = "flex"
            bodyTag.style.overflow = "hidden"
        })
    })



    let bodyTag = document.querySelector('body')
    if(btnPolicy){
        btnPolicy.onclick = function(e) {
            e.preventDefault()
            modalPolicy.style.display = "flex";
            bodyTag.style.overflow = "hidden"
        }
    }
    if(btnCertificate){
        btnCertificate.onclick = function(e) {
            e.preventDefault()
            modalCertificate.style.display = "flex";
            bodyTag.style.overflow = "hidden"
        }
    }
    if(btnTerms){
        btnTerms.onclick = function(e) {
            e.preventDefault()
            modalTerms.style.display = "flex";
            bodyTag.style.overflow = "hidden"
        }
    }
    if(btnReturn){
        btnReturn.onclick = function(e) {
            e.preventDefault()
            modalReturn.style.display = "flex";
            bodyTag.style.overflow = "hidden"
        } 
    }
    
    modalCloseBtn.forEach((close)=>{
        close.onclick = function() {
            close.closest('.modal').style.display = "none";
            bodyTag.style.overflow = "unset"
        }
    })
    

    window.onclick = function(event) {
        modalClass.forEach((modal)=>{
            if (event.target == modal) {
                modal.style.display = "none";
                bodyTag.style.overflow = "unset"
            }
        })
        
    }