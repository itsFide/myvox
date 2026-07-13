// document.querySelectorAll('.buy-product').forEach(function(productBlock) {
//   const tubs = productBlock.querySelectorAll('.buy-product-tub');
//   const btn = productBlock.querySelector('.buy-product-type__btn'); 
//   const productTypes = productBlock.querySelectorAll('.buy-product-type');
//   const trigger = productBlock.querySelector('.buy-product-type-select__trigger');
//   const items = productBlock.querySelector('.buy-product-select-items');
//   const selectItems = productBlock.querySelectorAll('.buy-product-select-item');
   
//   // Кэшируем часто используемые элементы
//   const elements = {
//     oldPrice: productBlock.querySelector('.buy-product__old-price'),
//     price: productBlock.querySelector('.buy-product__price'),
//     oldPriceAutoship: productBlock.querySelector('.buy-product__old-price--autoship'),
//     priceAutoship: productBlock.querySelector('.buy-product__price--autoship'),
//     listPrice: productBlock.querySelector('.list-price'),
//     listMonth: productBlock.querySelector('.list-month'),
//     finalPrice: productBlock.querySelector('.final-price'),
//     shipping: productBlock.querySelector('.buy-product-type__shipping'),
//     triggerText: trigger.querySelector('p')
//   };

//   // Конфигурация данных для каждого варианта
//   const productConfig = {
//     '1': {
//       prices: {
//         oldPrice: '$60.00',
//         price: '$36.90',
//         oldPriceAutoship: '$60.00',
//         priceAutoship: '$27.00',
//         listPrice: '$27.00',
//         listMonth: 'Every Month',
//         finalPrice: '$36.90'
//       },
//       cartUrl: 'https://secretelement.com/cart/49390027899164:1',
//       shippingDisplay: 'none',
//       deliveryText: 'Delivery every 1 month',
//       selectItemIndex: 0
//     },
//     '2': {
//       prices: {
//         oldPrice: '$108.00',
//         price: '$66.42',
//         oldPriceAutoship: '$108.00',
//         priceAutoship: '$48.60',
//         listPrice: '$48.60',
//         listMonth: 'Every 2 Months',
//         finalPrice: '$66.42'
//       },
//       cartUrl: 'https://secretelement.com/cart/49390027931932:1',
//       shippingDisplay: 'block',
//       deliveryText: 'Delivery every 2 months',
//       selectItemIndex: 1
//     },
//     '3': {
//       prices: {
//         oldPrice: '$153.00',
//         price: '$94.95',
//         oldPriceAutoship: '$153.00',
//         priceAutoship: '$68.85',
//         listPrice: '$68.85',
//         listMonth: 'Every 3 Months',
//         finalPrice: '$94.95'
//       },
//       cartUrl: 'https://secretelement.com/cart/49390027964700:1',
//       shippingDisplay: 'block',
//       deliveryText: 'Delivery every 3 months',
//       selectItemIndex: 2
//     }
//   };

//   // Автодоставка: финальные цены для каждого варианта
//   const autoshipFinalPrices = {
//     '1': { 'Delivery every 1 month': `${productConfig['1'].prices.priceAutoship}`, 'Delivery every 2 months': `${productConfig['2'].prices.priceAutoship}`, 'Delivery every 3 months': `${productConfig['3'].prices.priceAutoship}` },
//     '2': { 'Delivery every 1 month': `${productConfig['2'].prices.priceAutoship}`, 'Delivery every 2 months': `${productConfig['2'].prices.priceAutoship}`, 'Delivery every 3 months': `${productConfig['3'].prices.priceAutoship}` },
//     '3': { 'Delivery every 1 month': `${productConfig['3'].prices.priceAutoship}`, 'Delivery every 2 months': `${productConfig['2'].prices.priceAutoship}`, 'Delivery every 3 months': `${productConfig['3'].prices.priceAutoship}` }
//   };

//   const links = {
//     '1': {
//       'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390027997468%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
//       'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028030236%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
//       'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028063004%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
//     },
//     '2': {
//       'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028095772%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
//       'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028128540%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
//       'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028161308%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
//     },
//     '3': {
//       'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028194076%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
//       'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028226844%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
//       'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028259612%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
//     }
//   };

//   // Вспомогательные функции
//   function parsePrice(priceString) {
//     return parseFloat(priceString.replace(/[^0-9.]/g, ''));
//   }

//   function formatPrice(amount) {
//     return `$${amount.toFixed(2)}`;
//   }

//   function calculateSave(oldPrice, newPrice) {
//     const old = parsePrice(oldPrice);
//     const newPriceValue = parsePrice(newPrice);
//     const save = old - newPriceValue;
//     return save > 0 ? `save ${formatPrice(save)}` : '';
//   }

//   function updatePrices(config) {
//     elements.oldPrice.textContent = config.prices.oldPrice;
//     elements.price.textContent = config.prices.price;
//     elements.oldPriceAutoship.textContent = config.prices.oldPriceAutoship;
//     elements.priceAutoship.textContent = config.prices.priceAutoship;
//     elements.listPrice.textContent = config.prices.listPrice;
//     elements.listMonth.textContent = config.prices.listMonth;
//     elements.finalPrice.textContent = config.prices.finalPrice;
//     elements.shipping.style.display = config.shippingDisplay;
//     elements.triggerText.textContent = config.deliveryText;
//   }

//   function updateSelectItems(activeIndex) {
//     selectItems.forEach((item, index) => {
//       item.classList.toggle('active', index === activeIndex);
//     });
//   }

//   function updateTubSaves(isAutoship) {
//     // Обновляем save для каждого tub в зависимости от типа покупки
//     tubs.forEach(tub => {
//       const tubData = tub.getAttribute('data-tub');
//       const config = productConfig[tubData];
//       if (config) {
//         const saveElement = tub.querySelector('.buy-product-tub__each');
//         if (saveElement) {
//           if (isAutoship) {
//             // Для автодоставки используем oldPriceAutoship и priceAutoship
//             const deliveryItem = elements.triggerText.textContent.trim();
//             const finalPrice = autoshipFinalPrices[tubData][deliveryItem];
//             saveElement.textContent = calculateSave(config.prices.oldPriceAutoship, finalPrice);
//           } else {
//             // Для обычной покупки используем oldPrice и price
//             saveElement.textContent = calculateSave(config.prices.oldPrice, config.prices.price);
//           }
//         }
//       }
//     });
//   }

//   function getActiveTub() {
//     return productBlock.querySelector('.buy-product-tub.active');
//   }

//   function getActiveTubData() {
//     const activeTub = getActiveTub();
//     return activeTub ? activeTub.getAttribute('data-tub') : null;
//   }

//   function getActiveProductType() {
//     return Array.from(productTypes).find(type => type.classList.contains('active'));
//   }

//   function isAutoshipActive() {
//     const activeType = getActiveProductType();
//     return activeType && activeType.classList.contains('buy-product-type__second');
//   }

//   function updateAutoshipLink() {
//     const activeTub = getActiveTubData();
//     const deliveryItem = elements.triggerText.textContent.trim();
    
//     if (activeTub && links[activeTub] && links[activeTub][deliveryItem]) {
//       btn.href = links[activeTub][deliveryItem];
//       const finalPrice = autoshipFinalPrices[activeTub][deliveryItem];
//       elements.finalPrice.textContent = finalPrice;
//       elements.shipping.style.display = activeTub === '1' ? 'none' : 'block';
//     }
//   }

//   function checkType(tub) {
//     const dataTub = tub.getAttribute('data-tub');
//     const config = productConfig[dataTub];
//     if (!config) return;

//     // Обновляем цены для всех типов
//     updatePrices(config);
//     updateSelectItems(config.selectItemIndex);

//     const activeType = getActiveProductType();
//     if (!activeType) return;

//     // Обновляем в зависимости от активного типа (save НЕ обновляем при переключении tubs)
//     if (activeType.classList.contains('active') && !activeType.classList.contains('buy-product-type__second')) {
//       // Обычная покупка
//       btn.href = config.cartUrl;
//       elements.shipping.style.display = config.shippingDisplay;
//     } else if (activeType.classList.contains('buy-product-type__second') && activeType.classList.contains('active')) {
//       // Автодоставка
//       updateAutoshipLink();
//     }
//   }

//   // Обработчики событий для вкладок
//   tubs.forEach(tub => {
//     tub.addEventListener('click', () => {
//       tubs.forEach(t => t.classList.remove('active'));
//       tub.classList.add('active');
//       checkType(tub);
//     });
//   });

//   // Обработчики событий для типов продукта
//   productTypes.forEach(productType => {
//     productType.addEventListener('click', () => {
//       productTypes.forEach(type => type.classList.remove('active'));
//       productType.classList.add('active');

//       if (productType.classList.contains('buy-product-type__second')) {
//         // Автодоставка - обновляем save для всех tubs
//         updateTubSaves(true);
//         updateAutoshipLink();
//       } else {
//         // Обычная покупка - обновляем save для всех tubs
//         items.style.display = 'none';
//         const activeTub = getActiveTubData();
//         if (activeTub) {
//           const config = productConfig[activeTub];
//           btn.href = config.cartUrl;
//           elements.finalPrice.textContent = config.prices.finalPrice;
//         }
//         updateTubSaves(false);
//       }
//     });
//   });

//   // Переключение видимости элемента выбора
//   trigger.addEventListener('click', () => {
//     items.style.display = items.style.display === 'block' ? 'none' : 'block';
//   });

//   // Обработка клика по элементам выбора доставки
//   selectItems.forEach((item, index) => {
//     item.addEventListener('click', () => {
//       selectItems.forEach(subItem => subItem.classList.remove('active'));
//       item.classList.add('active');
      
//       const text = item.querySelector('p').textContent;
//       elements.triggerText.textContent = text;
//       items.style.display = 'none';
      
//       // Обновляем ссылку и save если активна автодоставка
//       if (isAutoshipActive()) {
//         updateTubSaves(true);
//         updateAutoshipLink();
//       }
//     });
//   });

//   // Инициализация save при загрузке страницы
//   const initialActiveType = getActiveProductType();
//   if (initialActiveType) {
//     if (initialActiveType.classList.contains('buy-product-type__second')) {
//       updateTubSaves(true);
//     } else {
//       updateTubSaves(false);
//     }
//   }
// });


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
            'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390027997468%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
            'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028030236%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
            'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028063004%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
          },
          '2': {
            'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028095772%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
            'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028128540%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
            'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028161308%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
          },
          '3': {
            'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028194076%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
            'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028226844%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
            'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=49390028259612%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
          }
        };

        // const prices = {
        //     1: { oneTime: { old: "$60.00", now: "$41.00", save: "19.00" }, sub: { old: "$60.00", now: "$30.00", save: "$30.00" } },
        //     2: { oneTime: { old: "$108.00", now: "$73.80", save: "$34.20" }, sub: { old: "$108.00", now: "$54.00", save: "$54.00" } },
        //     3: { oneTime: { old: "$153.00", now: "$104.55", save: "$48.45" }, sub: { old: "$153.00", now: "$76.50", save: "$76.50" } }
        // };
        const prices = {
            1: { oneTime: { old: "$44.00", now: "$31.00", save: "13.00" }, sub: { old: "$44.00", now: "$22.00", save: "$22.00" } },
            2: { oneTime: { old: "$72.00", now: "$52.00", save: "$20.00" }, sub: { old: "$72.00", now: "$36.00", save: "$36.00" } },
            3: { oneTime: { old: "$104.00", now: "$74.40", save: "$29.60" }, sub: { old: "$104.00", now: "$52.00", save: "$52.00" } }
        };

    const oneTimeLinks = {
        1: "https://secretelement.com/cart/49390027899164:1",
        2: "https://secretelement.com/cart/49390027931932:1",
        3: "https://secretelement.com/cart/49390027964700:1"
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
