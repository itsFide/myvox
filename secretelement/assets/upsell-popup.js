document.addEventListener('DOMContentLoaded', function() {
    var openButton = document.querySelectorAll('.open-upsell');
    var popup = document.querySelector('.upsell-popup');
    let closeButton = document.querySelector('.upsell-popup__close');
    let contunieBtn = document.querySelector('.upsell-next__btn');
    let nextBtn = document.querySelector('.upsell-next__btn');
    let preloader = document.querySelector('.preloader');
    let bodyTag = document.querySelector('body')
    openButton.forEach(btn=>{
        btn.addEventListener('click', function() {
            popup.classList.add('show');

            closeButton.setAttribute('href',contunieBtn.href)
        });
    })
    
    closeButton.addEventListener('click', ()=>{
        popup.classList.remove('show');
        preloader.style.display = 'block';
        bodyTag.classList.add('hidden')
        setTimeout(()=>{
            bodyTag.classList.remove('hidden')
            preloader.style.display = 'none';
        },8000)
    })
    nextBtn.addEventListener('click', ()=>{
        popup.classList.remove('show');
        preloader.style.display = 'block';
        bodyTag.classList.add('hidden')
        setTimeout(()=>{
            bodyTag.classList.remove('hidden')
            preloader.style.display = 'none';
        },8000)
    })
});


    // Получаем все кнопки для добавления в корзину
    var addToCartButtons = document.querySelectorAll('.upsell-popup__btn');
    var addedItems = []; // Список для хранения добавленных товаров
   
    // Обработчик клика для каждой кнопки
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let closeButton = document.querySelector('.upsell-popup__close');
            if (button.disabled) return;
            // Находим ближайший родительский элемент с классом 'upsell-item'
            let upsellItem = button.closest('.upsell-item');

            // Получаем значение data-id
            let dataId = upsellItem.getAttribute('data-id');
            
            addedItems.push(dataId); // Добавляем товар в список

            let newHref;
            // Находим кнопку продолжения покупок
            let continueButton = document.querySelector('.upsell-next__btn');
            let currentHref = continueButton.getAttribute('href');
            
            // Функция для извлечения параметров из URL
            function extractParams(href) {
                const decodedUrl = decodeURIComponent(href.replace(/\%26/g, '&'));
                const url = new URL(decodedUrl, "https://secretelement.com"); // Используем базовый URL как заглушку
                const params = new URLSearchParams(url.search);

                let returnTo = params.get('return_to');
                let itemsId = returnTo.replace(/[^+\d]/g, '');;
                let sellingPlan = params.get('items[][selling_plan]');

                console.log("URL Search Params:", Array.from(params.entries())); // Для отладки: что именно у нас в параметрах

                return { itemsId, sellingPlan };
            }

           
            
            if (currentHref.includes('items')) {
                const base = 'https://secretelement.com';
                const clearCartUrl = `${base}/cart/clear`;
                 // Вызываем функцию для извлечения параметров и обрабатываем их
                var { itemsId, sellingPlan } = extractParams(currentHref);

                let itemsToAdd = `items[][id]=${itemsId}&items[][quantity]=1&items[][selling_plan]=${sellingPlan}&`
                // itemsToAdd += `&items[][id]=${dataId}&items[][quantity]=1`;
                addedItems.forEach((id, index) => {
                    console.log(id);
                    itemsToAdd += `items[][id]=${id}&items[][quantity]=1`;
                    if (index < addedItems.length - 1) {
                        itemsToAdd += '&'; // Добавляем амперсанд для следующего товара
                    }
                });
                const checkoutUrl = `/checkout`;
                const encodedItems = encodeURIComponent(itemsToAdd);
                const encodedCheckout = encodeURIComponent(checkoutUrl);
                newHref = `${clearCartUrl}?return_to=/cart/add?${encodedItems}%26return_to=${encodedCheckout}`;
            } else{
                newHref = currentHref + ',' + dataId + ':1';
            }
            

            // Добавляем data-id к URL
                // Если нет, просто добавляем параметр в конец URL
                
            continueButton.setAttribute('href', newHref);
            closeButton.setAttribute('href',newHref)
            button.textContent = 'Added';
            button.classList.add('added');
            button.disabled = true;
        });
        
    });
    