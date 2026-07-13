const modal = document.querySelector('.hint-modal')
const modalOpen = document.querySelector('.buy-product-guarantee__text')
const bodyTag = document.querySelector('body')
const hintCloseModal = document.querySelector('.close-hint')
const giftItem = document.querySelectorAll('.hint-item')
const thankModal = document.querySelector('.thank-modal')
const thankClose = document.querySelector('.close-thank')

const mobileItemSelect = document.querySelector('.hint-gift-select-item')
const mobileItems = document.querySelector('.hint-items-mobile')


modalOpen.addEventListener('click', openModal)
hintCloseModal.addEventListener('click', closeModal)


function openModal(){
    modal.classList.add('active')
    bodyTag.classList.add('hidden')
}
function closeModal(){
    modal.classList.remove('active')
    bodyTag.classList.remove('hidden')
}
thankClose.addEventListener('click', ()=>{
    thankModal.classList.remove('show')
})

mobileItemSelect.addEventListener('click',()=>{
    mobileItemSelect.classList.toggle('active')
    mobileItems.classList.toggle('show')
})

const selectedProducts = new Set();
giftItem.forEach(item=>{
    
    item.addEventListener('click',()=>{
        // item.classList.add('active')
        const productName = item.getAttribute('data-product'); // Получаем название продукта

        if (item.classList.contains('active')) {
            // Если продукт уже выбран, убираем из массива и удаляем класс active
            item.classList.remove('active');
            selectedProducts.delete(productName);
        } else {
            // Если продукт не выбран, добавляем его в массив и добавляем класс active
            item.classList.add('active');
            selectedProducts.add(productName);
        }

        console.log('Selected products:', Array.from(selectedProducts)); // Для проверки
    })
})

document.querySelector('#hint-modal button').addEventListener('click', function(e) { 
    e.preventDefault();
    let k_error = document.querySelector('.klaviyo_messages .error_message');
    let email = document.querySelector('[name="email"]');
    let name = document.querySelector('[name="customer-name"]');
    // let product = document.querySelector('[name="product"]');
    let friendEmail = document.querySelector('[name="friend-email"]');
    let friendName = document.querySelector('[name="friend-name"]');
    let data = new URLSearchParams();
    let modal = document.querySelector('.hint-modal')

    const productsList = Array.from(selectedProducts).join(', ');

    data.append("g", "Xrfx7x");
    data.append("email", email.value);
  //   data.append("$product", product.value);
    // data.append("$fields", "$product");
    // data.append("$fields", "$friend-email");
    // data.append("$product", product.value);
    data.append("$fields", "$product, $friend-email, $friend-name $customerName");

    
    data.append("$friend-email", friendEmail.value);
    data.append("$friend-name", friendName.value);
    data.append("$product", productsList);
    data.append("$customerName", name.value);
    if(friendEmail.value == ""){
        friendEmail.style.border = "2px solid #ff0000";
    } else{
        friendEmail.style.border = "1px solid #161616";
    }
    if(name.value == ""){
        name.style.border = "2px solid #ff0000";
    } else{
        name.style.border = "1px solid #161616";
    }
    if (!validateEmail(email.value)) {
        email.style.border = "2px solid #ff0000";
        k_error.style.display = "block";
        k_error.innerHTML = "Please enter a valid email!";
    } else {
        k_error.style.display = "none";
        email.style.border = "2px solid #000";

        fetch("https://manage.kmail-lists.com/ajax/subscriptions/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache"
            },
            body: data
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                k_error.style.display = "none";
                k_error.innerHTML = "";

                modal.classList.remove('active')
                thankModal.classList.add('show')
                console.log('success');
                bodyTag.classList.remove('hidden')
          
            } else {
                console.log(response.errors[0]);
                
                // if (response.data.is_subscribed) {
                //     k_error.style.display = "none";
                // } else {
                //     k_error.style.display = "block";
                //     k_error.innerHTML = response.errors[0];
                // }
            }
        });
    }
});


function validateEmail(email) {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
