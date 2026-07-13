
// document.querySelectorAll('.buy-product').forEach(function(productBlock) {
//     let tubs = productBlock.querySelectorAll('.buy-product-tub')
//     let btn = productBlock.querySelector('.buy-product-type__btn'); 
//     let productTypes = productBlock.querySelectorAll('.buy-product-type');
  
//     var trigger = productBlock.querySelector('.buy-product-type-select__trigger');
//     var items = productBlock.querySelector('.buy-product-select-items');
//     var selectItems = productBlock.querySelectorAll('.buy-product-select-item');
  
//   const links = {
//       '1': {
//           'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061420828%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
//           'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061453596%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
//           'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061486364%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
//       },
//       '2': {
//           'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061519132%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
//           'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061551900%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
//           'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061584668%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
//           // [другие ссылки для '2']
//       },
//       '3': {
//           'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061617436%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
//           'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061650204%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
//           'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061682972%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
//           // [другие ссылки для '3']
//       }
//   };
//   tubs.forEach((tub)=>{
//     tub.addEventListener('click',()=>{
//       tubs.forEach((tub2)=>{
//         tub2.classList.remove('active')
//       })
//       tub.classList.add('active')
//       checkType(tub)
//     })
//   })
  
//   function checkType(tub){
//     productTypes.forEach((productType)=>{
//       // Меняем цену всем
//       let dataTub = tub.getAttribute('data-tub');
//       switch(dataTub){
//         case "1":
//           productBlock.querySelector('.buy-product__old-price').innerText = "$64.00"
//           productBlock.querySelector('.buy-product__price').innerText = "$44.00"
//           productBlock.querySelector('.buy-product__old-price--autoship').innerText = "$64.00"
//           productBlock.querySelector('.buy-product__price--autoship').innerText = "$32.00"
//           productBlock.querySelector('.list-price').innerText = "$32.00"
//           // productBlock.querySelector('.list-price-second').innerText = "$48.88"
//           productBlock.querySelector('.list-month').innerText = "Every Month"
//           productBlock.querySelector('.final-price').innerText = "$44.00"
//           trigger.querySelector('p').innerText = "Delivery every 1 month"
//           selectItems.forEach(selectItem=>{
//               selectItem.classList.remove('active')
//               selectItems[0].classList.add('active')
//           })
//           productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
//           break;
//         case "2":
//           productBlock.querySelector('.buy-product__old-price').innerText = "$115.20"
//           productBlock.querySelector('.buy-product__price').innerText = "$79.20"
//           productBlock.querySelector('.buy-product__old-price--autoship').innerText = "$115.20"
//           productBlock.querySelector('.buy-product__price--autoship').innerText = "$57.60"
//           productBlock.querySelector('.list-price').innerText = "$57.60"
//           // productBlock.querySelector('.list-price-second').innerText = "$97.88"
//            productBlock.querySelector('.list-month').innerText = "Every 2 Months"
//           productBlock.querySelector('.final-price').innerText = "$79.20"
//           trigger.querySelector('p').innerText = "Delivery every 2 months"
//           productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
//           selectItems.forEach(selectItem=>{
//               selectItem.classList.remove('active')
//               selectItems[1].classList.add('active')
//           })
//         break;
//         case "3":
//           productBlock.querySelector('.buy-product__old-price').innerText = "$163.20"
//           productBlock.querySelector('.buy-product__price').innerText = "$112.20"
//           productBlock.querySelector('.buy-product__old-price--autoship').innerText = "$163.20"
//           productBlock.querySelector('.buy-product__price--autoship').innerText = "$81.60"
//           productBlock.querySelector('.list-price').innerText = "$81.60"
//           // productBlock.querySelector('.list-price-second').innerText = "$146.64"
//                     productBlock.querySelector('.list-month').innerText = "Every 3 Months"
//           productBlock.querySelector('.final-price').innerText = "$112.20"
//           trigger.querySelector('p').innerText = "Delivery every 3 months"
//           productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
//           selectItems.forEach(selectItem=>{
//               selectItem.classList.remove('active')
//               selectItems[2].classList.add('active')
//           })
//         break;
//       }
//       // Меняем save и ссылку кнопки
//       if(productType.classList.contains('active') && !productType.classList.contains('buy-product-type__second')){
  
//         let dataTub = tub.getAttribute('data-tub');
//         switch(dataTub){
//           case "1":
//             tub.querySelector('.buy-product-tub__each').innerText = "save $20.00"
//             btn.href = 'https://secretelement.com/cart/49390061322524:1';
//             productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
//             // productBlock.querySelector('.buy-product-type__shipping').innerText = "-33%"
//             break;
//             case "2":
//             tub.querySelector('.buy-product-tub__each').innerText = "save $36.00"
//             btn.href = 'https://secretelement.com/cart/49390061355292:1';
//             productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
//             //  productBlock.querySelector('.buy-product-type__shipping').innerText = "-33%"
//           break;
//           case "3":
//             tub.querySelector('.buy-product-tub__each').innerText = "save $51.00"
//             btn.href = 'https://secretelement.com/cart/49390061388060:1';
//             productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
//             //  productBlock.querySelector('.buy-product-type__shipping').innerText = "-33%"
//           break;
//         }
//       } else if(productType.classList.contains('buy-product-type__second') && productType.classList.contains('active')){
        
//         let deliveryItem = productBlock.querySelector('.buy-product-type-select__trigger p').innerText
//         let activeTub = productBlock.querySelector('.buy-product-tub.active').getAttribute('data-tub')
        
//         switch(deliveryItem){
//           case "Delivery every 1 month":
//             if(activeTub == "1"){
//               btn.href = links[activeTub]["Delivery every 1 month"]
//               productBlock.querySelector('.final-price').innerText = "$32.00"
//               productBlock.querySelector('.buy-product-type__shipping').style.display = "none"
//             }
//             if(activeTub == "2"){
//               btn.href = links[activeTub]["Delivery every 1 month"]
//               productBlock.querySelector('.final-price').innerText = "$57.60"
//               productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
              
//             }
//             if(activeTub == "3"){
//               btn.href = links[activeTub]["Delivery every 1 month"]
//               productBlock.querySelector('.final-price').innerText = "$81.60"
//               productBlock.querySelector('.buy-product-type__shipping').style.display = "block"
//             }
//           break;
//           case "Delivery every 2 months":
//             if(activeTub == "1"){
//               btn.href = links[activeTub]["Delivery every 2 months"]
//               productBlock.querySelector('.final-price').innerText = "$32.00"
//             }
//             if(activeTub == "2"){
//               btn.href = links[activeTub]["Delivery every 2 months"]
//               productBlock.querySelector('.final-price').innerText = "$57.60"
//             }
//             if(activeTub == "3"){
//               btn.href = links[activeTub]["Delivery every 2 months"]
//               productBlock.querySelector('.final-price').innerText = "$81.60"
//             }
//           break;
//           case "Delivery every 3 months":
//             if(activeTub == "1"){
//               btn.href = links[activeTub]["Delivery every 3 months"]
//               productBlock.querySelector('.final-price').innerText = "$32.00"
//             }
//             if(activeTub == "2"){
//               btn.href = links[activeTub]["Delivery every 3 months"]
//               productBlock.querySelector('.final-price').innerText = "$57.60"
//             }
//             if(activeTub == "3"){
//               btn.href = links[activeTub]["Delivery every 3 months"]
//               productBlock.querySelector('.final-price').innerText = "$81.60"
//             }
//           break;
//         }
//       }
//     })
//   }
//   productTypes.forEach((productType)=>{
//     productType.addEventListener('click',()=>{
//       productTypes.forEach(productType2 =>{
//         productType2.classList.remove('active')
//       })
  
//       productType.classList.add('active')
//       if(productType.classList.contains('buy-product-type__second')){
//         tubs.forEach(tub =>{
//           let dataTub = tub.getAttribute('data-tub');
//           switch(dataTub){
//             case "1":
//               tub.querySelector('.buy-product-tub__each').innerText = "save $32.00"
//               break;
//             case "2":
//               tub.querySelector('.buy-product-tub__each').innerText = "save $57.60"
              
//             break;
//             case "3":
//               tub.querySelector('.buy-product-tub__each').innerText = "save $81.60"
//             break;
//           }
//         })
        
//         let deliveryItem = productBlock.querySelector('.buy-product-type-select__trigger p').innerText
//         let activeTub = productBlock.querySelector('.buy-product-tub.active').getAttribute('data-tub')
//         switch(deliveryItem){
//           case "Delivery every 1 month":
//             if(activeTub == "1"){
//               btn.href = links[activeTub]["Delivery every 1 month"]
//               productBlock.querySelector('.final-price').innerText = "$32.00"
//             }
//             if(activeTub == "2"){
//               btn.href = links[activeTub]["Delivery every 1 month"]
//               productBlock.querySelector('.final-price').innerText = "$57.60"
//             }
//             if(activeTub == "3"){
//               btn.href = links[activeTub]["Delivery every 1 month"]
//               productBlock.querySelector('.final-price').innerText = "$81.60"
//             }
//           break;
//           case "Delivery every 2 months":
//             if(activeTub == "1"){
//               btn.href = links[activeTub]["Delivery every 2 months"]
//               productBlock.querySelector('.final-price').innerText = "$32.00"
//             }
//             if(activeTub == "2"){
//               btn.href = links[activeTub]["Delivery every 2 months"]
//               productBlock.querySelector('.final-price').innerText = "$57.60"
//             }
//             if(activeTub == "3"){
//               btn.href = links[activeTub]["Delivery every 2 months"]
//               productBlock.querySelector('.final-price').innerText = "$81.60"
//             }
//           break;
//           case "Delivery every 3 months":
//             if(activeTub == "1"){
//               btn.href = links[activeTub]["Delivery every 3 months"]
//               productBlock.querySelector('.final-price').innerText = "$32.00"
//             }
//             if(activeTub == "2"){
//               btn.href = links[activeTub]["Delivery every 3 months"]
//               productBlock.querySelector('.final-price').innerText = "$57.60"
//             }
//             if(activeTub == "3"){
//               btn.href = links[activeTub]["Delivery every 3 months"]
//               productBlock.querySelector('.final-price').innerText = "$81.60"
//             }
//           break;
//         }
//       } else{
//         productBlock.querySelector('.buy-product-select-items').style.display="none";
//         tubs.forEach(tub =>{
          
//           let dataTub = tub.getAttribute('data-tub');
//           if(tub.classList.contains('active')){
//             switch(dataTub){
//               case "1":
//                 btn.href = 'https://secretelement.com/cart/49390061322524:1';
//                 productBlock.querySelector('.final-price').innerText = "$44.00"
//                 break;
//               case "2":
//                 btn.href = 'https://secretelement.com/cart/49390061355292:1';
//                 productBlock.querySelector('.final-price').innerText = "$79.20"
//               break;
//               case "3":
//                 btn.href = 'https://secretelement.com/cart/49390061388060:1';
//                 productBlock.querySelector('.final-price').innerText = "$112.20"
//               break;
//             }
//           }
//           switch(dataTub){
//             case "1":
//               tub.querySelector('.buy-product-tub__each').innerText = "save $20.00"
//               break;
//             case "2":
//               tub.querySelector('.buy-product-tub__each').innerText = "save $36.00"
//             break;
//             case "3":
//               tub.querySelector('.buy-product-tub__each').innerText = "save $51.00"
//             break;
//           }
//         })
//       }
      
//     })
//   })
  
  
  
//   // Переключение видимости элемента buy-product-select-items
//   trigger.addEventListener('click', function() {
//       items.style.display = items.style.display === 'block' ? 'none' : 'block';
//   });
  
//   // Обработка клика по элементам выбора
//   selectItems.forEach(function(item) {
//       item.addEventListener('click', function() {
//           // Удаляем класс active у всех элементов
//           selectItems.forEach(function(subItem) {
//               subItem.classList.remove('active');
//           });
  
//           // Добавляем класс active к выбранному элементу
//           item.classList.add('active');
  
//           // Устанавливаем текст в trigger
//           var text = item.querySelector('p').textContent;
//           trigger.querySelector('p').textContent = text;
  
//           // Скрываем элементы после выбора
//           items.style.display = 'none';
//       });
//   });
//   })


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".buy-product").forEach(initProductBlock);
});

function initProductBlock(productBlock) {
  const tubs = productBlock.querySelectorAll(".buy-product-tub");
  const btn = productBlock.querySelector(".buy-product-type__btn");
  const productTypes = productBlock.querySelectorAll(".buy-product-type");
  const trigger = productBlock.querySelector(".buy-product-type-select__trigger");
  const items = productBlock.querySelector(".buy-product-select-items");
  const selectItems = productBlock.querySelectorAll(".buy-product-select-item");

  // -------------------
  // CONFIG
  // -------------------
  const links = {
        '1': {
            'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061420828%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
            'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061453596%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
            'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061486364%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
        },
        '2': {
            'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061519132%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
            'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061551900%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
            'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061584668%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
            // [другие ссылки для '2']
        },
        '3': {
            'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061617436%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
            'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061650204%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
            'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390061682972%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout',
            // [другие ссылки для '3']
        }
    };
 
        // const prices = {
        //     1: { oneTime: { old: "$64.00", now: "$44.00", save: "$20.00" }, sub: { old: "$64.00", now: "$32.00", save: "$32.00" } },
        //     2: { oneTime: { old: "$115.20", now: "$79.20", save: "$36.00" }, sub: { old: "$115.20", now: "$57.60", save: "$57.60" } },
        //     3: { oneTime: { old: "$163.20", now: "$112.20", save: "$51.00" }, sub: { old: "$163.20", now: "$81.60", save: "$81.60" } }
        // };
        const prices = {
          1: { oneTime: { old: "$44.00", now: "$31.00", save: "13.00" }, sub: { old: "$44.00", now: "$22.00", save: "$22.00" } },
          2: { oneTime: { old: "$72.00", now: "$52.00", save: "$20.00" }, sub: { old: "$72.00", now: "$36.00", save: "$36.00" } },
          3: { oneTime: { old: "$104.00", now: "$74.40", save: "$29.60" }, sub: { old: "$104.00", now: "$52.00", save: "$52.00" } }
      };
    const oneTimeLinks = {
        1: "https://secretelement.com/cart/49390061322524:1",
        2: "https://secretelement.com/cart/49390061355292:1",
        3: "https://secretelement.com/cart/49390061388060:1"
    };

  // -------------------
  // MAIN FUNCTIONS
  // -------------------

  function updateDeliveryByTub(tubNum) {
    // 1 tub → every 1 month, 2 tubs → every 2 months, 3 tubs → every 3 months
    const mapping = {
      1: "Delivery every 1 month",
      2: "Delivery every 2 months",
      3: "Delivery every 3 months"
    };
    const newDelivery = mapping[tubNum];

    // update trigger text
    trigger.querySelector("p").textContent = newDelivery;

    // update dropdown active item
    selectItems.forEach(item => {
      const text = item.querySelector("p").textContent.trim();
      item.classList.toggle("active", text === newDelivery);
    });
  }

  function updatePrices(tubNum, isSubscription, deliveryText) {
    const data = prices[tubNum];
    const mode = isSubscription ? data.sub : data.oneTime;

    // --- обновляем текущие цены блока ---
    productBlock.querySelector(".buy-product__old-price").textContent = data.oneTime.old;
    productBlock.querySelector(".buy-product__price").textContent = data.oneTime.now;

    productBlock.querySelector(".buy-product__old-price--autoship").textContent = data.sub.old;
    productBlock.querySelector(".buy-product__price--autoship").textContent = data.sub.now;

    // --- обновляем финальные цены по активному режиму ---
    productBlock.querySelector(".list-price").textContent = isSubscription ? data.sub.now : data.oneTime.now;
    productBlock.querySelector(".final-price").textContent = mode.now;

    // --- обновляем "сэкономлено" ---
    tubs.forEach(tub => {
        const n = tub.getAttribute("data-tub");
        tub.querySelector(".buy-product-tub__each").textContent =
        "save " + prices[n][isSubscription ? "sub" : "oneTime"].save;
    });

    // --- обновляем текст частоты доставки ---
    const monthText =
        deliveryText === "Delivery every 1 month"
        ? "Every Month"
        : deliveryText === "Delivery every 2 months"
        ? "Every 2 Months"
        : "Every 3 Months";
    productBlock.querySelector(".list-month").textContent = monthText;
    tubNum == 2 || tubNum == 3 ? document.querySelector('.buy-product-type__shipping').style.display = "block" : document.querySelector('.buy-product-type__shipping').style.display = "none";
    // --- обновляем ссылку кнопки ---
    btn.href = isSubscription ? links[tubNum][deliveryText] : oneTimeLinks[tubNum];
    }


  function refreshUI() {
    const activeTub = productBlock.querySelector(".buy-product-tub.active")?.getAttribute("data-tub") || "1";
    const isSubscription = productBlock.querySelector(".buy-product-type__second.active") !== null;
    const deliveryText = trigger.querySelector("p")?.textContent || "Delivery every 1 month";

    updatePrices(activeTub, isSubscription, deliveryText);
  }

  // -------------------
  // EVENT LISTENERS
  // -------------------

  tubs.forEach(tub => {
    tub.addEventListener("click", () => {
      tubs.forEach(t => t.classList.remove("active"));
      tub.classList.add("active");

      const tubNum = tub.getAttribute("data-tub");
      updateDeliveryByTub(tubNum); // ← sync delivery text automatically
      refreshUI();
    });
  });

  productTypes.forEach(type => {
    type.addEventListener("click", () => {
      productTypes.forEach(t => t.classList.remove("active"));
      type.classList.add("active");
      refreshUI();
    });
  });

  trigger.addEventListener("click", () => {
    items.style.display = items.style.display === "block" ? "none" : "block";
  });

  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      selectItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const text = item.querySelector("p").textContent;
      trigger.querySelector("p").textContent = text;
      items.style.display = "none";

      refreshUI();
    });
  });

  // -------------------
  // INITIALIZATION
  // -------------------

  // set delivery according to default active tub (if missing)
  const defaultTub = productBlock.querySelector(".buy-product-tub.active")?.getAttribute("data-tub") || "1";
  updateDeliveryByTub(defaultTub);
  refreshUI();
}

// -------------------
// PRELOADER HANDLER
// -------------------
const preloader = document.querySelector(".preloader");
document.querySelectorAll(".buy-product-type__btn").forEach(btn => {
  btn.addEventListener("click", () => {
    preloader.style.display = "block";
    setTimeout(() => (preloader.style.display = "none"), 8000);
  });
});