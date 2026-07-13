
document.querySelectorAll('.buy-product').forEach(function(productBlock) {
    let tubs = productBlock.querySelectorAll('.buy-product-tub')
    let btn = productBlock.querySelector('.buy-product-type__btn'); 
    let productTypes = productBlock.querySelectorAll('.buy-product-type');
    let preloader = document.querySelector('.preloader');
    var trigger = productBlock.querySelector('.buy-product-type-select__trigger');
    var items = productBlock.querySelector('.buy-product-select-items');
    var selectItems = productBlock.querySelectorAll('.buy-product-select-item');
  
  const links = {
      '1': {
          'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390027997468%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
          'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028030236%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
          'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028063004%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
      },
      '2': {
          'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028095772%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
          'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028128540%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
          'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028161308%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
          // [другие ссылки для '2']
      },
      '3': {
          'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028194076%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
          'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028226844%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
          'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028259612%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
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
          productBlock.querySelector('.buy-product__price').innerText = "$41.00"
          productBlock.querySelector('.buy-product__old-price--autoship').innerText = "$62.00"
          productBlock.querySelector('.buy-product__price--autoship').innerText = "$30.00"
          productBlock.querySelector('.list-price').innerText = "$30.00"
        //   productBlock.querySelector('.list-price-second').innerText = "$62.88"
          productBlock.querySelector('.list-month').innerText = "Every Month"
          productBlock.querySelector('.final-price').innerText = "$41.00"
          trigger.querySelector('p').innerText = "Delivery every 1 month"
          selectItems.forEach(selectItem=>{
              selectItem.classList.remove('active')
              selectItems[0].classList.add('active')
          })
          productBlock.querySelector('.buy-product-type__shipping').style.display = "none"
          break;
        case "2":
          productBlock.querySelector('.buy-product__old-price').innerText = "$111.60"
          productBlock.querySelector('.buy-product__price').innerText = "$73.80"
          productBlock.querySelector('.buy-product__old-price--autoship').innerText = "$111.60"
          productBlock.querySelector('.buy-product__price--autoship').innerText = "$54.00"
          productBlock.querySelector('.list-price').innerText = "$54.00"
        //   productBlock.querySelector('.list-price-second').innerText = "$111.60"
           productBlock.querySelector('.list-month').innerText = "Every 2 Months"
          productBlock.querySelector('.final-price').innerText = "$73.80"
          trigger.querySelector('p').innerText = "Delivery every 2 months"
          productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
          selectItems.forEach(selectItem=>{
              selectItem.classList.remove('active')
              selectItems[1].classList.add('active')
          })
        break;
        case "3":
          productBlock.querySelector('.buy-product__old-price').innerText = "$158.10"
          productBlock.querySelector('.buy-product__price').innerText = "$104.55"
          productBlock.querySelector('.buy-product__old-price--autoship').innerText = "$158.10"
          productBlock.querySelector('.buy-product__price--autoship').innerText = "$76.50"
          productBlock.querySelector('.list-price').innerText = "$76.50"
        //   productBlock.querySelector('.list-price-second').innerText = "$158.10"
                    productBlock.querySelector('.list-month').innerText = "Every 3 Months"
          productBlock.querySelector('.final-price').innerText = "$104.55"
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
            tub.querySelector('.buy-product-tub__each').innerText = "save $11.00"
            btn.href = 'https://secretelement.com/cart/49390027899164:1';
            productBlock.querySelector('.buy-product-type__shipping').style.display = "none"
            
            // productBlock.querySelector('.buy-product-type__shipping').innerText = "-33%"
            break;
            case "2":
            tub.querySelector('.buy-product-tub__each').innerText = "save $19.80"
            btn.href = 'https://secretelement.com/cart/49390027931932:1';
            productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
            //  productBlock.querySelector('.buy-product-type__shipping').innerText = "-33%"
          break;
          case "3":
            tub.querySelector('.buy-product-tub__each').innerText = "save $28.05"
            btn.href = 'https://secretelement.com/cart/49390027964700:1';
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
              productBlock.querySelector('.final-price').innerText = "$30.00"
              productBlock.querySelector('.buy-product-type__shipping').style.display = "none"
            }
            if(activeTub == "2"){
              btn.href = links[activeTub]["Delivery every 1 month"]
              productBlock.querySelector('.final-price').innerText = "$54.00"
              productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
              
            }
            if(activeTub == "3"){
              btn.href = links[activeTub]["Delivery every 1 month"]
              productBlock.querySelector('.final-price').innerText = "$76.50"
              productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
            }
          break;
          case "Delivery every 2 months":
            if(activeTub == "1"){
              btn.href = links[activeTub]["Delivery every 2 months"]
              productBlock.querySelector('.final-price').innerText = "$30.00"
            }
            if(activeTub == "2"){
              btn.href = links[activeTub]["Delivery every 2 months"]
              productBlock.querySelector('.final-price').innerText = "$54.00"
            }
            if(activeTub == "3"){
              btn.href = links[activeTub]["Delivery every 2 months"]
              productBlock.querySelector('.final-price').innerText = "$76.50"
            }
          break;
          case "Delivery every 3 months":
            if(activeTub == "1"){
              btn.href = links[activeTub]["Delivery every 3 months"]
              productBlock.querySelector('.final-price').innerText = "$30.00"
            }
            if(activeTub == "2"){
              btn.href = links[activeTub]["Delivery every 3 months"]
              productBlock.querySelector('.final-price').innerText = "$54.00"
            }
            if(activeTub == "3"){
              btn.href = links[activeTub]["Delivery every 3 months"]
              productBlock.querySelector('.final-price').innerText = "$76.50"
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
              tub.querySelector('.buy-product-tub__each').innerText = "save $32.00"
              break;
            case "2":
              tub.querySelector('.buy-product-tub__each').innerText = "save $57.60"
              
            break;
            case "3":
              tub.querySelector('.buy-product-tub__each').innerText = "save $81.60"
            break;
          }
        })
        
        let deliveryItem = productBlock.querySelector('.buy-product-type-select__trigger p').innerText
        let activeTub = productBlock.querySelector('.buy-product-tub.active').getAttribute('data-tub')
        switch(deliveryItem){
          case "Delivery every 1 month":
            if(activeTub == "1"){
              btn.href = links[activeTub]["Delivery every 1 month"]
              productBlock.querySelector('.final-price').innerText = "$30.00"
            }
            if(activeTub == "2"){
              btn.href = links[activeTub]["Delivery every 1 month"]
              productBlock.querySelector('.final-price').innerText = "$54.00"
            }
            if(activeTub == "3"){
              btn.href = links[activeTub]["Delivery every 1 month"]
              productBlock.querySelector('.final-price').innerText = "$76.50"
            }
          break;
          case "Delivery every 2 months":
            if(activeTub == "1"){
              btn.href = links[activeTub]["Delivery every 2 months"]
              productBlock.querySelector('.final-price').innerText = "$30.00"
            }
            if(activeTub == "2"){
              btn.href = links[activeTub]["Delivery every 2 months"]
              productBlock.querySelector('.final-price').innerText = "$54.00"
            }
            if(activeTub == "3"){
              btn.href = links[activeTub]["Delivery every 2 months"]
              productBlock.querySelector('.final-price').innerText = "$76.50"
            }
          break;
          case "Delivery every 3 months":
            if(activeTub == "1"){
              btn.href = links[activeTub]["Delivery every 3 months"]
              productBlock.querySelector('.final-price').innerText = "$30.00"
            }
            if(activeTub == "2"){
              btn.href = links[activeTub]["Delivery every 3 months"]
              productBlock.querySelector('.final-price').innerText = "$54.00"
            }
            if(activeTub == "3"){
              btn.href = links[activeTub]["Delivery every 3 months"]
              productBlock.querySelector('.final-price').innerText = "$76.50"
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
                btn.href = 'https://secretelement.com/cart/49390027899164:1';
                productBlock.querySelector('.final-price').innerText = "$41.00"
                break;
              case "2":
                btn.href = 'https://secretelement.com/cart/49390027931932:1';
                productBlock.querySelector('.final-price').innerText = "$73.80"
              break;
              case "3":
                btn.href = 'https://secretelement.com/cart/49390027964700:1';
                productBlock.querySelector('.final-price').innerText = "$104.55"
              break;
            }
          }
          switch(dataTub){
            case "1":
              tub.querySelector('.buy-product-tub__each').innerText = "save $11.00"
              break;
            case "2":
              tub.querySelector('.buy-product-tub__each').innerText = "save $19.80"
            break;
            case "3":
              tub.querySelector('.buy-product-tub__each').innerText = "save $28.05"
            break;
          }
        })
      }
      
    })
  })
  
  btn.addEventListener('click',()=>{
    preloader.style.display = 'block';
    // bodyTag.classList.add('hidden')
    setTimeout(()=>{
        // bodyTag.classList.remove('hidden')
        preloader.style.display = 'none';
    },8000)
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
  