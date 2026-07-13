
document.querySelectorAll('.buy-product').forEach(function(productBlock) {
  let tubs = productBlock.querySelectorAll('.buy-product-tub')
  let btn = productBlock.querySelector('.buy-product-type__btn'); 
  let productTypes = productBlock.querySelectorAll('.buy-product-type');

  var trigger = productBlock.querySelector('.buy-product-type-select__trigger');
  var items = productBlock.querySelector('.buy-product-select-items');
  var selectItems = productBlock.querySelectorAll('.buy-product-select-item');

const links = {
    
      '1': {
        'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51217313857820%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
        'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51217313890588%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
        'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51217313923356%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
      },
      '2': {
        'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51217313956124%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
        'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51217313988892%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
        'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51217314021660%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
        // [другие ссылки для '2']
      },
      '3': {
        'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51217314054428%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
        'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51217314087196%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
        'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51217314119964%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
        // [другие ссылки для '3']
      }
};
tubs.forEach((tub)=>{
  tub.addEventListener('click',()=>{
    tubs.forEach((tub2)=>{
      tub2.classList.remove('active')
    })
    tub.classList.add('active')
    checkType(tub)
  })
})

function checkType(tub){
  productTypes.forEach((productType)=>{
    // Меняем цену всем
    let dataTub = tub.getAttribute('data-tub');
    switch(dataTub){
      case "1":
        productBlock.querySelector('.buy-product__old-price').innerText = "$62.00"
        productBlock.querySelector('.buy-product__price').innerText = "$43.00"
        productBlock.querySelector('.buy-product__old-price--autoship').innerText = "$62.00"
        productBlock.querySelector('.buy-product__price--autoship').innerText = "$31.00"
        productBlock.querySelector('.list-price').innerText = "$31.00"
        // productBlock.querySelector('.list-price-second').innerText = "$48.88"
        productBlock.querySelector('.list-month').innerText = "Every Month"
        productBlock.querySelector('.final-price').innerText = "$43.00"
        trigger.querySelector('p').innerText = "Delivery every 1 month"
        selectItems.forEach(selectItem=>{
            selectItem.classList.remove('active')
            selectItems[0].classList.add('active')
        })
        productBlock.querySelector('.buy-product-type__shipping').style.display = "none"
        break;
      case "2":
        productBlock.querySelector('.buy-product__old-price').innerText = "$111.60"
        productBlock.querySelector('.buy-product__price').innerText = "$77.40"
        productBlock.querySelector('.buy-product__old-price--autoship').innerText = "$111.60"
        productBlock.querySelector('.buy-product__price--autoship').innerText = "$55.80"
        productBlock.querySelector('.list-price').innerText = "$55.80"
        // productBlock.querySelector('.list-price-second').innerText = "$97.88"
         productBlock.querySelector('.list-month').innerText = "Every 2 Months"
        productBlock.querySelector('.final-price').innerText = "$77.40"
        trigger.querySelector('p').innerText = "Delivery every 2 months"
        productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
        selectItems.forEach(selectItem=>{
            selectItem.classList.remove('active')
            selectItems[1].classList.add('active')
        })
      break;
      case "3":
        productBlock.querySelector('.buy-product__old-price').innerText = "$158.10"
        productBlock.querySelector('.buy-product__price').innerText = "$109.65"
        productBlock.querySelector('.buy-product__old-price--autoship').innerText = "$158.10"
        productBlock.querySelector('.buy-product__price--autoship').innerText = "$79.05"
        productBlock.querySelector('.list-price').innerText = "$79.05"
        // productBlock.querySelector('.list-price-second').innerText = "$146.64"
        productBlock.querySelector('.list-month').innerText = "Every 3 Months"
        productBlock.querySelector('.final-price').innerText = "$109.65"
        trigger.querySelector('p').innerText = "Delivery every 3 months"
        productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
        selectItems.forEach(selectItem=>{
            selectItem.classList.remove('active')
            selectItems[2].classList.add('active')
        })
      break;
    }
    // Меняем save и ссылку кнопки
    if(productType.classList.contains('active') && !productType.classList.contains('buy-product-type__second')){

      let dataTub = tub.getAttribute('data-tub');
      switch(dataTub){
        case "1":
          tub.querySelector('.buy-product-tub__each').innerText = "save $19.00"
          btn.href = 'https://secretelement.com/cart/51029759394076:1';
          productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
          // productBlock.querySelector('.buy-product-type__shipping').innerText = "-33%"
          break;
          case "2":
          tub.querySelector('.buy-product-tub__each').innerText = "save $34.20"
          btn.href = 'https://secretelement.com/cart/51029759426844:1';
          productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
          //  productBlock.querySelector('.buy-product-type__shipping').innerText = "-33%"
        break;
        case "3":
          tub.querySelector('.buy-product-tub__each').innerText = "save $48.45"
          btn.href = 'https://secretelement.com/cart/51029759459612:1';
          productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
          //  productBlock.querySelector('.buy-product-type__shipping').innerText = "-33%"
        break;
      }
    } else if(productType.classList.contains('buy-product-type__second') && productType.classList.contains('active')){
      
      let deliveryItem = productBlock.querySelector('.buy-product-type-select__trigger p').innerText
      let activeTub = productBlock.querySelector('.buy-product-tub.active').getAttribute('data-tub')
      
      switch(deliveryItem){
        case "Delivery every 1 month":
          if(activeTub == "1"){
            btn.href = links[activeTub]["Delivery every 1 month"]
            productBlock.querySelector('.final-price').innerText = "$31.00"
            productBlock.querySelector('.buy-product-type__shipping').style.display = "none"
          }
          if(activeTub == "2"){
            btn.href = links[activeTub]["Delivery every 1 month"]
            productBlock.querySelector('.final-price').innerText = "$55.80"
            productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
            
          }
          if(activeTub == "3"){
            btn.href = links[activeTub]["Delivery every 1 month"]
            productBlock.querySelector('.final-price').innerText = "$79.05"
            productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
          }
        break;
        case "Delivery every 2 months":
          if(activeTub == "1"){
            btn.href = links[activeTub]["Delivery every 2 months"]
            productBlock.querySelector('.final-price').innerText = "$31.00"
          }
          if(activeTub == "2"){
            btn.href = links[activeTub]["Delivery every 2 months"]
            productBlock.querySelector('.final-price').innerText = "$55.80"
          }
          if(activeTub == "3"){
            btn.href = links[activeTub]["Delivery every 2 months"]
            productBlock.querySelector('.final-price').innerText = "$79.05"
          }
        break;
        case "Delivery every 3 months":
          if(activeTub == "1"){
            btn.href = links[activeTub]["Delivery every 3 months"]
            productBlock.querySelector('.final-price').innerText = "$31.00"
          }
          if(activeTub == "2"){
            btn.href = links[activeTub]["Delivery every 3 months"]
            productBlock.querySelector('.final-price').innerText = "$55.80"
          }
          if(activeTub == "3"){
            btn.href = links[activeTub]["Delivery every 3 months"]
            productBlock.querySelector('.final-price').innerText = "$79.05"
          }
        break;
      }
    }
  })
}
productTypes.forEach((productType)=>{
  productType.addEventListener('click',()=>{
    productTypes.forEach(productType2 =>{
      productType2.classList.remove('active')
    })

    productType.classList.add('active')
    if(productType.classList.contains('buy-product-type__second')){
      tubs.forEach(tub =>{
        let dataTub = tub.getAttribute('data-tub');
        switch(dataTub){
          case "1":
            tub.querySelector('.buy-product-tub__each').innerText = "save $31.00"
            break;
          case "2":
            tub.querySelector('.buy-product-tub__each').innerText = "save $55.80"
            
          break;
          case "3":
            tub.querySelector('.buy-product-tub__each').innerText = "save $79.05"
          break;
        }
      })
      
      let deliveryItem = productBlock.querySelector('.buy-product-type-select__trigger p').innerText
      let activeTub = productBlock.querySelector('.buy-product-tub.active').getAttribute('data-tub')
      switch(deliveryItem){
        case "Delivery every 1 month":
          if(activeTub == "1"){
            btn.href = links[activeTub]["Delivery every 1 month"]
            productBlock.querySelector('.final-price').innerText = "$31.00"
          }
          if(activeTub == "2"){
            btn.href = links[activeTub]["Delivery every 1 month"]
            productBlock.querySelector('.final-price').innerText = "$55.80"
          }
          if(activeTub == "3"){
            btn.href = links[activeTub]["Delivery every 1 month"]
            productBlock.querySelector('.final-price').innerText = "$79.05"
          }
        break;
        case "Delivery every 2 months":
          if(activeTub == "1"){
            btn.href = links[activeTub]["Delivery every 2 months"]
            productBlock.querySelector('.final-price').innerText = "$31.00"
          }
          if(activeTub == "2"){
            btn.href = links[activeTub]["Delivery every 2 months"]
            productBlock.querySelector('.final-price').innerText = "$55.80"
          }
          if(activeTub == "3"){
            btn.href = links[activeTub]["Delivery every 2 months"]
            productBlock.querySelector('.final-price').innerText = "$79.05"
          }
        break;
        case "Delivery every 3 months":
          if(activeTub == "1"){
            btn.href = links[activeTub]["Delivery every 3 months"]
            productBlock.querySelector('.final-price').innerText = "$31.00"
          }
          if(activeTub == "2"){
            btn.href = links[activeTub]["Delivery every 3 months"]
            productBlock.querySelector('.final-price').innerText = "$55.80"
          }
          if(activeTub == "3"){
            btn.href = links[activeTub]["Delivery every 3 months"]
            productBlock.querySelector('.final-price').innerText = "$79.05"
          }
        break;
      }
    } else{
      productBlock.querySelector('.buy-product-select-items').style.display="none";
      tubs.forEach(tub =>{
        
        let dataTub = tub.getAttribute('data-tub');
        if(tub.classList.contains('active')){
          switch(dataTub){
            case "1":
              btn.href = 'https://secretelement.com/cart/51029759394076:1';
              productBlock.querySelector('.final-price').innerText = "$43.00"
              break;
            case "2":
              btn.href = 'https://secretelement.com/cart/51029759426844:1';
              productBlock.querySelector('.final-price').innerText = "$77.40"
            break;
            case "3":
              btn.href = 'https://secretelement.com/cart/51029759459612:1';
              productBlock.querySelector('.final-price').innerText = "$109.65"
            break;
          }
        }
        switch(dataTub){
          case "1":
            tub.querySelector('.buy-product-tub__each').innerText = "save $19.00"
            break;
          case "2":
            tub.querySelector('.buy-product-tub__each').innerText = "save $34.10"
          break;
          case "3":
            tub.querySelector('.buy-product-tub__each').innerText = "save $48.45"
          break;
        }
      })
    }
    
  })
})



// Переключение видимости элемента buy-product-select-items
trigger.addEventListener('click', function() {
    items.style.display = items.style.display === 'block' ? 'none' : 'block';
});

// Обработка клика по элементам выбора
selectItems.forEach(function(item) {
    item.addEventListener('click', function() {
        // Удаляем класс active у всех элементов
        selectItems.forEach(function(subItem) {
            subItem.classList.remove('active');
        });

        // Добавляем класс active к выбранному элементу
        item.classList.add('active');

        // Устанавливаем текст в trigger
        var text = item.querySelector('p').textContent;
        trigger.querySelector('p').textContent = text;

        // Скрываем элементы после выбора
        items.style.display = 'none';
    });
});
})


