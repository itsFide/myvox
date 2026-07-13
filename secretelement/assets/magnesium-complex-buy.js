// // Все ссылки для подписки — одна общая константа, а не внутри каждого блока
// const subscriptionLinks = {
//     '1': {
//       'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120385820%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
//       'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120418588%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
//       'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120451356%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
//     },
//     '2': {
//       'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120484124%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
//       'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120516892%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
//       'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120549660%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
//     },
//     '3': {
//       'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120582428%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
//       'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120615196%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
//       'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120647964%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
//     }
//   };
  
//   document.querySelectorAll('.buy-product').forEach(function (productBlock) {
//     const tubs = productBlock.querySelectorAll('.buy-product-tub');
//     const btn = productBlock.querySelector('.buy-product-type__btn');
//     const productTypes = productBlock.querySelectorAll('.buy-product-type');
  
//     const trigger = productBlock.querySelector('.buy-product-type-select__trigger');
//     const items = productBlock.querySelector('.buy-product-select-items');
//     const selectItems = productBlock.querySelectorAll('.buy-product-select-item');
  
//     // Кэшируем часто используемые элементы
//     const oldPrice = productBlock.querySelector('.buy-product__old-price');
//     const price = productBlock.querySelector('.buy-product__price');
//     const oldPriceAutoship = productBlock.querySelector('.buy-product__old-price--autoship');
//     const priceAutoship = productBlock.querySelector('.buy-product__price--autoship');
//     const listPrice = productBlock.querySelector('.list-price');
//     const listMonthEl = productBlock.querySelector('.list-month');
//     const finalPriceEl = productBlock.querySelector('.final-price');
//     const shippingEl = productBlock.querySelector('.buy-product-type__shipping');
//     const triggerTextEl = trigger.querySelector('p');
  
//     function getActiveTub() {
//       const active = productBlock.querySelector('.buy-product-tub.active');
//       return active ? active.getAttribute('data-tub') : null;
//     }
  
//     // Базовое состояние по выбранному количеству (1 / 2 / 3 тубы)
//     function setTubBaseState(dataTub) {
//       switch (dataTub) {
//         case '1':
//           oldPrice.innerText = '$52.00';
//           price.innerText = '$35.00';
//           oldPriceAutoship.innerText = '$52.00';
//           priceAutoship.innerText = '$26.00';
//           listPrice.innerText = '$26.00';
//           listMonthEl.innerText = 'Every Month';
//           finalPriceEl.innerText = '$35.00';
//           triggerTextEl.innerText = 'Delivery every 1 month';
//           selectItems.forEach(function (item, index) {
//             item.classList.toggle('active', index === 0);
//           });
//           shippingEl.style.display = 'none';
//           break;
  
//         case '2':
//           oldPrice.innerText = '$108.00';
//           price.innerText = '$72.80';
//           oldPriceAutoship.innerText = '$108.00';
//           priceAutoship.innerText = '$54.00';
//           listPrice.innerText = '$54.00';
//           listMonthEl.innerText = 'Every 2 Months';
//           finalPriceEl.innerText = '$72.80';
//           triggerTextEl.innerText = 'Delivery every 2 months';
//           selectItems.forEach(function (item, index) {
//             item.classList.toggle('active', index === 1);
//           });
//           shippingEl.style.display = 'block';
//           break;
  
//         case '3':
//           oldPrice.innerText = '$153.00';
//           price.innerText = '$102.00';
//           oldPriceAutoship.innerText = '$153.00';
//           priceAutoship.innerText = '$76.50';
//           listPrice.innerText = '$76.50';
//           listMonthEl.innerText = 'Every 3 Months';
//           finalPriceEl.innerText = '$102.00';
//           triggerTextEl.innerText = 'Delivery every 3 months';
//           selectItems.forEach(function (item, index) {
//             item.classList.toggle('active', index === 2);
//           });
//           shippingEl.style.display = 'block';
//           break;
//       }
//     }
  
//     // Универсальная функция обновления для подписки (autoship)
//     function updateAutoshipHrefAndPrice(deliveryText, activeTub) {
//       const linksByTub = subscriptionLinks[activeTub];
//       if (linksByTub && linksByTub[deliveryText]) {
//         btn.href = linksByTub[deliveryText];
//       }
  
//       switch (deliveryText) {
//         case 'Delivery every 1 month':
//           if (activeTub === '1') {
//             finalPriceEl.innerText = '$26.00';
//             shippingEl.style.display = 'none';
//           }
//           if (activeTub === '2') {
//             finalPriceEl.innerText = '$54.00';
//             shippingEl.style.display = 'block';
//           }
//           if (activeTub === '3') {
//             finalPriceEl.innerText = '$76.50';
//             shippingEl.style.display = 'block';
//           }
//           break;
  
//         case 'Delivery every 2 months':
//           if (activeTub === '1') {
//             finalPriceEl.innerText = '$26.00';
//           }
//           if (activeTub === '2') {
//             finalPriceEl.innerText = '$54.00';
//           }
//           if (activeTub === '3') {
//             finalPriceEl.innerText = '$76.50';
//           }
//           break;
  
//         case 'Delivery every 3 months':
//           if (activeTub === '1') {
//             finalPriceEl.innerText = '$26.00';
//           }
//           if (activeTub === '2') {
//             finalPriceEl.innerText = '$54.00';
//           }
//           if (activeTub === '3') {
//             finalPriceEl.innerText = '$76.50';
//           }
//           break;
//       }
//     }
  
//     // Логика при переключении количества туб (кликаем по .buy-product-tub)
//     function checkType(tub) {
//       const dataTub = tub.getAttribute('data-tub');
//       setTubBaseState(dataTub);
  
//       const activeType = productBlock.querySelector('.buy-product-type.active');
//       if (!activeType) return;
  
//       const isAutoship = activeType.classList.contains('buy-product-type__second');
  
//       if (!isAutoship) {
//         // One-time покупка
//         switch (dataTub) {
//           case '1':
//             tub.querySelector('.buy-product-tub__each').innerText = 'save $17.00';
//             btn.href = 'https://secretelement.com/cart/53480120287516:1';
//             shippingEl.style.display = 'none';
//             break;
//           case '2':
//             tub.querySelector('.buy-product-tub__each').innerText = 'save $36.00';
//             btn.href = 'https://secretelement.com/cart/53480120320284:1';
//             shippingEl.style.display = 'block';
//             break;
//           case '3':
//             tub.querySelector('.buy-product-tub__each').innerText = 'save $51.00';
//             btn.href = 'https://secretelement.com/cart/53480120353052:1';
//             shippingEl.style.display = 'block';
//             break;
//         }
//       } else {
//         // Autoship (подписка)
//         const deliveryText = triggerTextEl.innerText.trim();
//         updateAutoshipHrefAndPrice(deliveryText, dataTub);
//       }
//     }
  
//     // Слушатели для тубов (1 / 2 / 3)
//     tubs.forEach(function (tub) {
//       tub.addEventListener('click', function () {
//         tubs.forEach(function (tub2) {
//           tub2.classList.remove('active');
//         });
//         tub.classList.add('active');
//         checkType(tub);
//       });
//     });
  
//     // Слушатели для типов покупки (one-time / autoship)
//     productTypes.forEach(function (productType) {
//       productType.addEventListener('click', function () {
//         productTypes.forEach(function (pt) {
//           pt.classList.remove('active');
//         });
//         productType.classList.add('active');
  
//         const activeTub = getActiveTub();
//         if (!activeTub) return;
  
//         const isAutoship = productType.classList.contains('buy-product-type__second');
  
//         if (isAutoship) {
//           // При включении подписки меняем "save" на autoship-значения
//           tubs.forEach(function (tub) {
//             const dataTub = tub.getAttribute('data-tub');
//             switch (dataTub) {
//               case '1':
//                 tub.querySelector('.buy-product-tub__each').innerText = 'save $26.00';
//                 break;
//               case '2':
//                 tub.querySelector('.buy-product-tub__each').innerText = 'save $54.00';
//                 break;
//               case '3':
//                 tub.querySelector('.buy-product-tub__each').innerText = 'save $76.50';
//                 break;
//             }
//           });
  
//           const deliveryText = triggerTextEl.innerText.trim();
//           updateAutoshipHrefAndPrice(deliveryText, activeTub);
//         } else {
//           // One-time mode
//           items.style.display = 'none';
  
//           tubs.forEach(function (tub) {
//             const dataTub = tub.getAttribute('data-tub');
  
//             if (tub.classList.contains('active')) {
//               switch (dataTub) {
//                 case '1':
//                   btn.href = 'https://secretelement.com/cart/53480120287516:1';
//                   finalPriceEl.innerText = '$35.00';
//                   break;
//                 case '2':
//                     btn.href = 'https://secretelement.com/cart/53480120320284:1';
//                   finalPriceEl.innerText = '$72.00'; // как в исходном коде
//                   break;
//                 case '3':
//                     btn.href = 'https://secretelement.com/cart/53480120353052:1';
//                   finalPriceEl.innerText = '$102.00';
//                   break;
//               }
//             }
  
//             // Возвращаем "save" для one-time
//             switch (dataTub) {
//               case '1':
//                 tub.querySelector('.buy-product-tub__each').innerText = 'save $20.00';
//                 break;
//               case '2':
//                 tub.querySelector('.buy-product-tub__each').innerText = 'save $36.00';
//                 break;
//               case '3':
//                 tub.querySelector('.buy-product-tub__each').innerText = 'save $51.00';
//                 break;
//             }
//           });
//         }
//       });
//     });
  
//     // Переключение видимости dropdown с периодами доставки
//     trigger.addEventListener('click', function () {
//       items.style.display = items.style.display === 'block' ? 'none' : 'block';
//     });
  
//     // Выбор конкретного периода доставки
//     selectItems.forEach(function (item) {
//       item.addEventListener('click', function () {
//         selectItems.forEach(function (subItem) {
//           subItem.classList.remove('active');
//         });
  
//         item.classList.add('active');
  
//         const text = item.querySelector('p').textContent.trim();
//         triggerTextEl.textContent = text;
//         items.style.display = 'none';
  
//         // Если сейчас активна подписка — сразу обновляем ссылку и финальную цену
//         const activeType = productBlock.querySelector('.buy-product-type.active');
//         const activeTub = getActiveTub();
  
//         if (activeType && activeTub && activeType.classList.contains('buy-product-type__second')) {
//           updateAutoshipHrefAndPrice(text, activeTub);
//         }
//       });
//     });
  
//     // Опционально: инициализация состояния по дефолтно активному тубу
//     const initialActiveTub = productBlock.querySelector('.buy-product-tub.active') || tubs[0];
//     if (initialActiveTub) {
//       initialActiveTub.classList.add('active');
//       checkType(initialActiveTub);
//     }
//   });
  
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
          'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120385820%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
          'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120418588%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
          'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120451356%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
        },
        '2': {
          'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120484124%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
          'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120516892%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
          'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120549660%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
        },
        '3': {
          'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120582428%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
          'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120615196%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
          'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=53480120647964%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
        }
      };

      const prices = {
        1: { oneTime: { old: "$44.00", now: "$31.00", save: "13.00" }, sub: { old: "$44.00", now: "$22.00", save: "$22.00" } },
        2: { oneTime: { old: "$72.00", now: "$52.00", save: "$20.00" }, sub: { old: "$72.00", now: "$36.00", save: "$36.00" } },
        3: { oneTime: { old: "$104.00", now: "$74.40", save: "$29.60" }, sub: { old: "$104.00", now: "$52.00", save: "$52.00" } }
    };

    const oneTimeLinks = {
        1: "https://secretelement.com/cart/53480120287516:1",
        2: "https://secretelement.com/cart/53480120320284:1",
        3: "https://secretelement.com/cart/53480120353052:1"
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