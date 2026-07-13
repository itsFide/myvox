document.addEventListener("DOMContentLoaded", function() {
    // Обработчик для открытия модальных окон
    const modalTriggers = document.querySelectorAll('.cross-sale-item__what');
  
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        // Получаем значение data-trigger
        const triggerValue = this.getAttribute('data-trigger');
  
        // Находим модальное окно, у которого data-modal соответствует triggerValue
        const modal = document.querySelector(`.product-modal[data-modal="${triggerValue}"]`);
        
        if (modal) {
          // Добавляем класс, который открывает модальное окно (например, is-open)
          modal.classList.add('is-open');
        } else {
          console.warn(`Модальное окно с data-modal="${triggerValue}" не найдено.`);
        }
      });
    });
  
    // Обработчик для закрытия модальных окон
    const closeButtons = document.querySelectorAll('.product-modal-close-btn');
  
    closeButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        // Находим ближайший родительский элемент с классом product-modal
        const modal = this.closest('.product-modal');
        
        if (modal) {
          modal.classList.remove('is-open');
        }
      });
    });
}); 

  


// document.addEventListener('DOMContentLoaded', function() {
//     // Очистка всех ключей localStorage, связанных с кросс‑сейлом.
//     // Предполагается, что все ключи, которые мы используем, начинаются с "crossSaleBlock_"
//     for (let i = localStorage.length - 1; i >= 0; i--) {
//       let key = localStorage.key(i);
//       if (key.indexOf('crossSaleBlock_') === 0) {
//         localStorage.removeItem(key);
//       }
//     }
  
//     // Перебираем все блоки кросс‑сейлов на странице
//     document.querySelectorAll('.cross-sale').forEach(function(crossSaleBlock, blockIndex) {
//       // Формируем префикс для ключей localStorage для данного блока
//       var storagePrefix = 'crossSaleBlock_' + blockIndex + '_';
  
//       // Функция для формирования ключа с учётом префикса
//       function getProductKey(item) {
//         var title = item.querySelector('.cross-sale-item__title').textContent.trim();
//         return storagePrefix + title;
//       }
  
//       // Функция обновления выбранных товаров и применения скидок
//       function updateSelectedProducts() {
//         var items = crossSaleBlock.querySelectorAll('.cross-sale-item');
//         var selectedItems = [];
//         items.forEach(function(item) {
//           var key = getProductKey(item);
//           if (localStorage.getItem(key)) {
//             selectedItems.push(item);
//           }
//         });
//         var count = selectedItems.length;
  
//         // Обновляем сохранённый id для каждого выбранного товара в зависимости от их количества
//         selectedItems.forEach(function(item) {
//           var key = getProductKey(item);
//           if (count === 1) {
//             localStorage.setItem(key, item.getAttribute('data-default-id'));
//           } else if (count === 2) {
//             localStorage.setItem(key, item.getAttribute('data-discount15-id'));
//           } else if (count === 3) {
//             localStorage.setItem(key, item.getAttribute('data-discount20-id'));
//           }
//         });
  
//         // Находим конкретные блоки скидок внутри данного контейнера
//         var discount15 = crossSaleBlock.querySelector('.cross-sale-15-discount');
//         var discount20 = crossSaleBlock.querySelector('.cross-sale-20-discount');
//         if (discount15 && discount20) {
//           if (count >= 3) {
//             // Если выбрано 3 товара – активируем блок 20% скидки
//             discount20.classList.add('active');
//             discount15.classList.remove('active');
//           } else if (count === 2) {
//             // Если выбрано 2 товара – активируем блок 15% скидки
//             discount15.classList.add('active');
//             discount20.classList.remove('active');
//           } else {
//             // Если товаров меньше 2 – убираем активный класс
//             discount15.classList.remove('active');
//             discount20.classList.remove('active');
//           }
//         }
//       }
  
//       // Обработчик для кнопок ADD/REMOVE в данном блоке
//       function toggleProduct(e) {
//         var btn = e.currentTarget;
//         var item = btn.closest('.cross-sale-item');
//         var key = getProductKey(item);
//         if (localStorage.getItem(key)) {
//           localStorage.removeItem(key);
//           btn.textContent = 'ADD';
//           btn.classList.remove('added');
//         } else {
//           localStorage.setItem(key, item.getAttribute('data-default-id'));
//           btn.textContent = 'REMOVE';
//           btn.classList.add('added');
//         }
//         updateSelectedProducts();
//       }
  
//       // Вешаем обработчики на все кнопки ADD/REMOVE в данном блоке
//       crossSaleBlock.querySelectorAll('.cross-sale-item__btn').forEach(function(button) {
//         button.addEventListener('click', toggleProduct);
//       });
  
//       // Находим кнопку перехода (ORDER NOW) для родительского блока товара (.buy-product)
//       var parentBuyProduct = crossSaleBlock.closest('.buy-product');
//       if (parentBuyProduct) {
//         var checkoutBtn = parentBuyProduct.querySelector('.open-upsell');
//         if (checkoutBtn) {
//           checkoutBtn.addEventListener('click', function(e) {
//             e.preventDefault();
//             var originalHref = checkoutBtn.getAttribute('href');
//             // Собираем id выбранных товаров только из данного блока
//             var crossSaleItems = [];
//             crossSaleBlock.querySelectorAll('.cross-sale-item').forEach(function(item) {
//               var key = getProductKey(item);
//               var id = localStorage.getItem(key);
//               if (id) {
//                 crossSaleItems.push(id);
//               }
//             });
//             // Если товаров не выбрано – переходим по оригинальному URL
//             if (crossSaleItems.length === 0) {
//               window.location.href = originalHref;
//               return;
//             }
//             var newUrl = originalHref;
//             // Формируем новый URL в зависимости от его формата
//             if (originalHref.includes('/cart/clear') && originalHref.includes('return_to=/cart/add?')) {
//               var outerUrl = new URL(originalHref);
//               var returnToParam = outerUrl.searchParams.get('return_to');
//               var returnToUrl = new URL(returnToParam, window.location.origin);
//               crossSaleItems.forEach(function(id) {
//                 returnToUrl.searchParams.append('items[][id]', id);
//                 returnToUrl.searchParams.append('items[][quantity]', '1');
//               });
//               var newReturnTo = returnToUrl.pathname + '?' + returnToUrl.searchParams.toString();
//               outerUrl.searchParams.set('return_to', newReturnTo);
//               newUrl = outerUrl.toString();
//             } else if (originalHref.includes('/cart/')) {
//               var url = new URL(originalHref);
//               var cartItems = url.pathname.replace('/cart/', '');
//               if (cartItems && cartItems.slice(-1) !== ',') {
//                 cartItems += ',';
//               }
//               var crossSaleString = crossSaleItems.map(function(id) {
//                 return id + ':1';
//               }).join(',');
//               cartItems += crossSaleString;
//               url.pathname = '/cart/' + cartItems;
//               newUrl = url.toString();
//             }
//             window.location.href = newUrl;
//           });
//         }
//       }
//     });
// });
  

// document.addEventListener('DOMContentLoaded', function() {
//   // Очистка всех ключей localStorage, связанных с кросс‑сейлом.
//   for (let i = localStorage.length - 1; i >= 0; i--) {
//     let key = localStorage.key(i);
//     if (key.indexOf('crossSaleBlock_') === 0) {
//       localStorage.removeItem(key);
//     }
//   }

//   // Функция, возвращающая активный тип покупки:
//   // 'otp' – если активен элемент с классом .buy-product-type.otp-type.active
//   // 'subs' – если активен элемент с классом .buy-product-type.buy-product-type__second.active
//   function getActivePurchaseType() {
//     if (document.querySelector('.buy-product-type.otp-type.active')) {
//       return 'otp';
//     } else if (document.querySelector('.buy-product-type.buy-product-type__second.active')) {
//       return 'subs';
//     }
//     return null;
//   }

//   // Функция обновления выбранных товаров, цен и id для одного блока кросс‑сейлов
//   function updateSelectedProducts(crossSaleBlock) {
//     const items = crossSaleBlock.querySelectorAll('.cross-sale-item');
//     const activeType = getActivePurchaseType();
//     let oldPrice, newPrice;
    
//     if (activeType === 'otp') {
//       oldPrice = 44;
//       newPrice = (44 * 0.8).toFixed(2);
//     } else if (activeType === 'subs') {
//       oldPrice = 32;
//       newPrice = (32 * 0.8).toFixed(2);
//     }

//     let selectedItems = [];
//     items.forEach(function(item) {
//       // Ключ для localStorage основан на заголовке товара
//       const title = item.querySelector('.cross-sale-item__title').textContent.trim();
//       const key = 'crossSaleBlock_' + crossSaleBlock.dataset.blockIndex + '_' + title;
      
//       // Обновляем отображение цен, если цены заданы
//       const oldPriceElem = item.querySelector('.cross-sale-item__old');
//       const newPriceElem = item.querySelector('.cross-sale-item__new');
//       if (oldPriceElem && newPriceElem && oldPrice) {
//         oldPriceElem.textContent = '$' + oldPrice + ".00";
//         newPriceElem.textContent = '$' + newPrice;
//       }
      
//       // Если товар выбран – обновляем его id в localStorage
//       if (localStorage.getItem(key)) {
//         selectedItems.push(item);
//         let productId;
//         if (activeType === 'otp') {
//           productId = item.getAttribute('data-otp-id');
//         } else if (activeType === 'subs') {
//           productId = item.getAttribute('data-subscr-id');
//         }
//         localStorage.setItem(key, productId);
//       }
//     });
    
//     // Обновляем класс скидки, если выбрано более одного товара
//     const discountBlock = crossSaleBlock.querySelector('.cross-sale__discount');
//     if (discountBlock) {
//       const discountTextElem = discountBlock.querySelector('p');

//       if (selectedItems.length >= 1) {
//         discountBlock.classList.add('active');
//         discountTextElem.textContent = "Additional discount on " + selectedItems.length + " products – 20%";
//       } else {
//         discountBlock.classList.remove('active');
//         discountTextElem.textContent = "Additional discount on 0 products – 20%";

//       }
//     }
//   }

//   // Обработчик для кнопок ADD/REMOVE внутри блока cross-sale
//   function toggleProduct(e) {
//     const btn = e.currentTarget;
//     const item = btn.closest('.cross-sale-item');
//     // Формируем ключ: здесь предполагается, что родительскому блоку cross-sale присвоен data-block-index
//     const title = item.querySelector('.cross-sale-item__title').textContent.trim();
//     const crossSaleBlock = item.closest('.cross-sale');
//     const blockIndex = crossSaleBlock.dataset.blockIndex;
//     const key = 'crossSaleBlock_' + blockIndex + '_' + title;
//     const activeType = getActivePurchaseType();

//     if (localStorage.getItem(key)) {
//       localStorage.removeItem(key);
//       btn.textContent = 'ADD';
//       btn.classList.remove('added');
//       item.classList.remove('active')
//     } else {
//       let productId;
//       if (activeType === 'otp') {
//         productId = item.getAttribute('data-otp-id');
//       } else if (activeType === 'subs') {
//         productId = item.getAttribute('data-subscr-id');
//       }
//       localStorage.setItem(key, productId);
//       btn.textContent = 'REMOVE';
//       btn.classList.add('added');
//       item.classList.add('active')
//     }
//     updateSelectedProducts(crossSaleBlock);
//   }

//   // Присваиваем data-атрибут blockIndex для каждого блока cross-sale
//   document.querySelectorAll('.cross-sale').forEach(function(crossSaleBlock, blockIndex) {
//     crossSaleBlock.dataset.blockIndex = blockIndex;
    
//     // Назначаем обработчики для кнопок ADD/REMOVE
//     crossSaleBlock.querySelectorAll('.cross-sale-item__btn').forEach(function(button) {
//       button.addEventListener('click', toggleProduct);
//     });
//   });

//   // Функция обновления для всех блоков cross-sale (вызывается при переключении типа покупки)
//   function updateAllCrossSales() {
//     document.querySelectorAll('.cross-sale').forEach(function(block) {
//       updateSelectedProducts(block);
//     });
//   }

//   // Обработчик клика для переключения типа покупки.
//   // Предполагается, что переключение происходит по клику на элемент .buy-product-type
//   document.querySelectorAll('.buy-product-type').forEach(function(typeBlock) {
//     typeBlock.addEventListener('click', function() {
//       // Небольшая задержка, чтобы дать время измениться классам active
//       setTimeout(function() {
//         updateAllCrossSales();
//       }, 50);
//     });
//   });

//   // Обработка перехода к checkout (без изменений)
//   const checkoutBtn = document.querySelector('.open-upsell');
//   if (checkoutBtn) {
//     checkoutBtn.addEventListener('click', function(e) {
//       e.preventDefault();
//       const originalHref = checkoutBtn.getAttribute('href');
//       let crossSaleItems = [];
//       document.querySelectorAll('.cross-sale').forEach(function(crossSaleBlock) {
//         const blockIndex = crossSaleBlock.dataset.blockIndex;
//         crossSaleBlock.querySelectorAll('.cross-sale-item').forEach(function(item) {
//           const title = item.querySelector('.cross-sale-item__title').textContent.trim();
//           const key = 'crossSaleBlock_' + blockIndex + '_' + title;
//           const id = localStorage.getItem(key);
//           if (id) {
//             crossSaleItems.push(id);
//           }
//         });
//       });
//       if (crossSaleItems.length === 0) {
//         window.location.href = originalHref;
//         return;
//       }
//       let newUrl = originalHref;
//       if (originalHref.includes('/cart/clear') && originalHref.includes('return_to=/cart/add?')) {
//         const outerUrl = new URL(originalHref);
//         const returnToParam = outerUrl.searchParams.get('return_to');
//         const returnToUrl = new URL(returnToParam, window.location.origin);
//         crossSaleItems.forEach(function(id) {
//           returnToUrl.searchParams.append('items[][id]', id);
//           returnToUrl.searchParams.append('items[][quantity]', '1');
//         });
//         const newReturnTo = returnToUrl.pathname + '?' + returnToUrl.searchParams.toString();
//         outerUrl.searchParams.set('return_to', newReturnTo);
//         newUrl = outerUrl.toString();
//       } else if (originalHref.includes('/cart/')) {
//         const url = new URL(originalHref);
//         let cartItems = url.pathname.replace('/cart/', '');
//         if (cartItems && cartItems.slice(-1) !== ',') {
//           cartItems += ',';
//         }
//         const crossSaleString = crossSaleItems.map(function(id) {
//           return id + ':1';
//         }).join(',');
//         cartItems += crossSaleString;
//         url.pathname = '/cart/' + cartItems;
//         newUrl = url.toString();
//       }
//       window.location.href = newUrl;
//     });
//   }
// });
// document.addEventListener('DOMContentLoaded', function() {
//   // Очистка всех ключей localStorage, связанных с кросс‑сейлом.
//   for (let i = localStorage.length - 1; i >= 0; i--) {
//     let key = localStorage.key(i);
//     if (key.indexOf('crossSaleBlock_') === 0) {
//       localStorage.removeItem(key);
//     }
//   }

//   // Объект с ценами для каждого продукта. Ключ – название продукта (как в .cross-sale-item__title).
//   // Для каждого продукта задаются цены для OTP и для подписки (autoship).
//   const productPrices = {
//     "Black Seed Oil": {
//       otp: { old: 66, new: (45 * 0.8).toFixed(2) },       // Например, 44.00 -> 35.20
//       autoship: { old: 32, new: (33 * 0.8).toFixed(2) }      // Например, 32.00 -> 25.60
//     },
//     "Magnezium Glycinate": {
//       otp: { old: 52, new: (35 * 0.8).toFixed(2) },
//       autoship: { old: 52, new: (26 * 0.8).toFixed(2) }
//     },
//     "Shilajit Capsules": {
//       otp: { old: 62, new: (43 * 0.8).toFixed(2) },
//       autoship: { old: 62, new: (31 * 0.8).toFixed(2) }
//     },
//     "Citrus Bergamot": {
//       otp: { old: 60, new: (41 * 0.8).toFixed(2) },
//       autoship: { old: 60, new: (30 * 0.8).toFixed(2) }
//     },
//     "Berberine Capsules": {
//       otp: { old: 64, new: (44 * 0.8).toFixed(2) },
//       autoship: { old: 64, new: (32 * 0.8).toFixed(2) }
//     },
//     "Magnezium Gummies": {
//       otp: { old: 70, new: (40 * 0.8).toFixed(2) },
//       autoship: { old: 60, new: (30 * 0.8).toFixed(2) }
//     },
//     "Sea Moss Capsules": {
//       otp: { old: 64, new: (44 * 0.8).toFixed(2) },
//       autoship: { old: 64, new: (32 * 0.8).toFixed(2) }
//     }
//   };

//   // Функция, возвращающая активный тип покупки:
//   // 'otp' – если активен элемент с классом .buy-product-type.otp-type.active
//   // 'autoship' – если активен элемент с классом .buy-product-type.buy-product-type__second.active
//   function getActivePurchaseType() {
//     if (document.querySelector('.buy-product-type.otp-type.active')) {
//       return 'otp';
//     } else if (document.querySelector('.buy-product-type.buy-product-type__second.active')) {
//       return 'autoship';
//     }
//     return null;
//   }

//   // Функция обновления выбранных товаров и цен для одного блока кросс‑сейлов
//   function updateSelectedProducts(crossSaleBlock) {
//     const items = crossSaleBlock.querySelectorAll('.cross-sale-item');
//     const activeType = getActivePurchaseType();
    
//     let selectedItems = [];
//     items.forEach(function(item) {
//       const titleElem = item.querySelector('.cross-sale-item__title');
//       if (!titleElem) return;
//       const title = titleElem.textContent.trim();
//       const pricing = productPrices[title];
      
//       // Если для данного продукта не задан объект цен – пропускаем
//       if (!pricing) return;
      
//       let oldPrice, newPrice;
//       if (activeType === 'otp') {
//         oldPrice = pricing.otp.old;
//         newPrice = pricing.otp.new;
//       } else if (activeType === 'autoship') {
//         oldPrice = pricing.autoship.old;
//         newPrice = pricing.autoship.new;
//       }
      
//       // Обновляем отображение цен, если элементы найдены
//       const oldPriceElem = item.querySelector('.cross-sale-item__old');
//       const newPriceElem = item.querySelector('.cross-sale-item__new');
//       if (oldPriceElem && newPriceElem) {
//         oldPriceElem.textContent = '$' + oldPrice + ".00";
//         newPriceElem.textContent = '$' + newPrice;
//       }
      
//       // Если товар выбран – обновляем его id в localStorage с учетом выбранного типа
//       const key = 'crossSaleBlock_' + crossSaleBlock.dataset.blockIndex + '_' + title;
//       if (localStorage.getItem(key)) {
//         selectedItems.push(item);
//         let productId;
//         if (activeType === 'otp') {
//           productId = item.getAttribute('data-otp-id');
//         } else if (activeType === 'autoship') {
//           productId = item.getAttribute('data-subscr-id');
//         }
//         localStorage.setItem(key, productId);
//       }
//     });
    
//     // Обновляем блок скидки внутри данного контейнера
//     const discountBlock = crossSaleBlock.querySelector('.cross-sale__discount');
//     if (discountBlock) {
//       const discountTextElem = discountBlock.querySelector('p');
//       if (selectedItems.length >= 1) {
//         discountBlock.classList.add('active');
//         discountTextElem.textContent = "Additional discount on " + selectedItems.length + " products – 20%";
//       } else {
//         discountBlock.classList.remove('active');
//         discountTextElem.textContent = "Additional discount on 0 products – 20%";
//       }
//     }
//   }

//   // Обработчик для кнопок ADD/REMOVE внутри блока cross-sale
//   function toggleProduct(e) {
//     const btn = e.currentTarget;
//     const item = btn.closest('.cross-sale-item');
//     const title = item.querySelector('.cross-sale-item__title').textContent.trim();
//     const crossSaleBlock = item.closest('.cross-sale');
//     const blockIndex = crossSaleBlock.dataset.blockIndex;
//     const key = 'crossSaleBlock_' + blockIndex + '_' + title;
//     const activeType = getActivePurchaseType();

//     if (localStorage.getItem(key)) {
//       localStorage.removeItem(key);
//       btn.textContent = 'ADD';
//       btn.classList.remove('added');
//       item.classList.remove('active');
//     } else {
//       let productId;
//       if (activeType === 'otp') {
//         productId = item.getAttribute('data-otp-id');
//       } else if (activeType === 'autoship') {
//         productId = item.getAttribute('data-subscr-id');
//       }
//       localStorage.setItem(key, productId);
//       btn.textContent = 'REMOVE';
//       btn.classList.add('added');
//       item.classList.add('active');
//     }
//     updateSelectedProducts(crossSaleBlock);
//   }

//   // Присваиваем data-атрибут blockIndex для каждого блока cross-sale и вешаем обработчики на кнопки
//   document.querySelectorAll('.cross-sale').forEach(function(crossSaleBlock, blockIndex) {
//     crossSaleBlock.dataset.blockIndex = blockIndex;
//     crossSaleBlock.querySelectorAll('.cross-sale-item__btn').forEach(function(button) {
//       button.addEventListener('click', toggleProduct);
//     });
//   });

//   // Функция обновления для всех блоков cross-sale (вызывается при переключении типа покупки)
//   function updateAllCrossSales() {
//     document.querySelectorAll('.cross-sale').forEach(function(block) {
//       updateSelectedProducts(block);
//     });
//   }

//   // Обработчик клика для переключения типа покупки.
//   // Предполагается, что переключение происходит по клику на элемент .buy-product-type
//   document.querySelectorAll('.buy-product-type').forEach(function(typeBlock) {
//     typeBlock.addEventListener('click', function() {
//       // Небольшая задержка, чтобы дать время измениться классам active
//       setTimeout(function() {
//         updateAllCrossSales();
//       }, 50);
//     });
//   });

//   // Обработка перехода к checkout (остальной функционал без изменений)
//   const checkoutBtn = document.querySelector('.open-upsell');
//   if (checkoutBtn) {
//     checkoutBtn.addEventListener('click', function(e) {
//       e.preventDefault();
//       const originalHref = checkoutBtn.getAttribute('href');
//       let crossSaleItems = [];
//       document.querySelectorAll('.cross-sale').forEach(function(crossSaleBlock) {
//         const blockIndex = crossSaleBlock.dataset.blockIndex;
//         crossSaleBlock.querySelectorAll('.cross-sale-item').forEach(function(item) {
//           const title = item.querySelector('.cross-sale-item__title').textContent.trim();
//           const key = 'crossSaleBlock_' + blockIndex + '_' + title;
//           const id = localStorage.getItem(key);
//           if (id) {
//             crossSaleItems.push(id);
//           }
//         });
//       });
//       if (crossSaleItems.length === 0) {
//         window.location.href = originalHref;
//         return;
//       }
//       let newUrl = originalHref;
//       if (originalHref.includes('/cart/clear') && originalHref.includes('return_to=/cart/add?')) {
//         const outerUrl = new URL(originalHref);
//         const returnToParam = outerUrl.searchParams.get('return_to');
//         const returnToUrl = new URL(returnToParam, window.location.origin);
//         crossSaleItems.forEach(function(id) {
//           returnToUrl.searchParams.append('items[][id]', id);
//           returnToUrl.searchParams.append('items[][quantity]', '1');
//         });
//         const newReturnTo = returnToUrl.pathname + '?' + returnToUrl.searchParams.toString();
//         outerUrl.searchParams.set('return_to', newReturnTo);
//         newUrl = outerUrl.toString();
//       } else if (originalHref.includes('/cart/')) {
//         const url = new URL(originalHref);
//         let cartItems = url.pathname.replace('/cart/', '');
//         if (cartItems && cartItems.slice(-1) !== ',') {
//           cartItems += ',';
//         }
//         const crossSaleString = crossSaleItems.map(function(id) {
//           return id + ':1';
//         }).join(',');
//         cartItems += crossSaleString;
//         url.pathname = '/cart/' + cartItems;
//         newUrl = url.toString();
//       }
//       window.location.href = newUrl;
//     });
//   }
// });

document.addEventListener('DOMContentLoaded', function() {
  // Очистка всех ключей localStorage, связанных с кросс‑сейлом.
  for (let i = localStorage.length - 1; i >= 0; i--) {
    let key = localStorage.key(i);
    if (key.indexOf('crossSaleBlock_') === 0) {
      localStorage.removeItem(key);
    }
  }

  // Объект с ценами для каждого продукта.
  // При этом "new" пересчитывается с уменьшением на 20%.
  const productPrices = {
    "Black Seed Oil": {
      otp: { old: 66, new: (45 * 0.8).toFixed(2) },       // Например, 44.00 -> 35.20
      autoship: { old: 66, new: (33 * 0.8).toFixed(2) }      // Например, 32.00 -> 25.60
    },
    "Magnezium Glycinate": {
      otp: { old: 52, new: (35 * 0.8).toFixed(2) },
      autoship: { old: 52, new: (26 * 0.8).toFixed(2) }
    },
    "Shilajit Capsules": {
      otp: { old: 62, new: (43 * 0.8).toFixed(2) },
      autoship: { old: 62, new: (31 * 0.8).toFixed(2) }
    },
    "Citrus Bergamot": {
      otp: { old: 60, new: (41 * 0.8).toFixed(2) },
      autoship: { old: 60, new: (30 * 0.8).toFixed(2) }
    },
    "Berberine Capsules": {
      otp: { old: 64, new: (44 * 0.8).toFixed(2) },
      autoship: { old: 64, new: (32 * 0.8).toFixed(2) }
    },
    "Magnezium Gummies": {
      otp: { old: 70, new: (40 * 0.8).toFixed(2) },
      autoship: { old: 60, new: (30 * 0.8).toFixed(2) }
    },
    "Sea Moss Capsules": {
      otp: { old: 64, new: (44 * 0.8).toFixed(2) },
      autoship: { old: 64, new: (32 * 0.8).toFixed(2) }
    }
  };

  // Функция, возвращающая активный тип покупки:
  // 'otp' – если активен элемент с классом .buy-product-type.otp-type.active
  // 'autoship' – если активен элемент с классом .buy-product-type.buy-product-type__second.active
  function getActivePurchaseType() {
    if (document.querySelector('.buy-product-type.otp-type.active')) {
      return 'otp';
    } else if (document.querySelector('.buy-product-type.buy-product-type__second.active')) {
      return 'autoship';
    }
    return null;
  }

  // Функция обновления выбранных товаров и цен для одного блока кросс‑сейлов
  function updateSelectedProducts(crossSaleBlock) {
    const items = crossSaleBlock.querySelectorAll('.cross-sale-item');
    const activeType = getActivePurchaseType();
    
    let selectedItems = [];
    items.forEach(function(item) {
      const titleElem = item.querySelector('.cross-sale-item__title');
      if (!titleElem) return;
      const title = titleElem.textContent.trim();
      const pricing = productPrices[title];
      if (!pricing) return;
      
      let oldPrice, newPrice;
      if (activeType === 'otp') {
        oldPrice = pricing.otp.old;
        newPrice = pricing.otp.new;
      } else if (activeType === 'autoship') {
        oldPrice = pricing.autoship.old;
        newPrice = pricing.autoship.new;
      }
      
      // Обновляем отображение цен
      const oldPriceElem = item.querySelector('.cross-sale-item__old');
      const newPriceElem = item.querySelector('.cross-sale-item__new');
      if (oldPriceElem && newPriceElem) {
        oldPriceElem.textContent = '$' + oldPrice + ".00";
        newPriceElem.textContent = '$' + newPrice;
      }
      
      // Если товар выбран – обновляем его id в localStorage с учетом выбранного типа
      const key = 'crossSaleBlock_' + crossSaleBlock.dataset.blockIndex + '_' + title;
      if (localStorage.getItem(key)) {
        selectedItems.push(item);
        let productId;
        if (activeType === 'otp') {
          productId = item.getAttribute('data-otp-id');
        } else if (activeType === 'autoship') {
          productId = item.getAttribute('data-subscr-id');
        }
        localStorage.setItem(key, productId);
      }
    });
    
    // Обновляем блок скидки внутри данного контейнера
    const discountBlock = crossSaleBlock.querySelector('.cross-sale__discount');
    if (discountBlock) {
      const discountTextElem = discountBlock.querySelector('p');
      if (selectedItems.length >= 1) {
        discountBlock.classList.add('active');
        // discountTextElem.textContent = "Additional discount on " + selectedItems.length + " products – 20%";
      } else {
        discountBlock.classList.remove('active');
        // discountTextElem.textContent = "Additional discount on 0 products – 20%";
      }
    }
  }

  // Обработчик для кнопок ADD/REMOVE внутри блока cross-sale
  function toggleProduct(e) {
    const btn = e.currentTarget;
    const item = btn.closest('.cross-sale-item');
    const title = item.querySelector('.cross-sale-item__title').textContent.trim();
    const crossSaleBlock = item.closest('.cross-sale');
    const blockIndex = crossSaleBlock.dataset.blockIndex;
    const key = 'crossSaleBlock_' + blockIndex + '_' + title;
    const activeType = getActivePurchaseType();

    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      btn.textContent = 'ADD';
      btn.classList.remove('added');
      item.classList.remove('active');
    } else {
      let productId;
      if (activeType === 'otp') {
        productId = item.getAttribute('data-otp-id');
      } else if (activeType === 'autoship') {
        productId = item.getAttribute('data-subscr-id');
      }
      localStorage.setItem(key, productId);
      btn.textContent = 'REMOVE';
      btn.classList.add('added');
      item.classList.add('active');
    }
    updateSelectedProducts(crossSaleBlock);
  }

  // Присваиваем data-атрибут blockIndex для каждого блока cross-sale и вешаем обработчики на кнопки
  document.querySelectorAll('.cross-sale').forEach(function(crossSaleBlock, blockIndex) {
    crossSaleBlock.dataset.blockIndex = blockIndex;
    crossSaleBlock.querySelectorAll('.cross-sale-item__btn').forEach(function(button) {
      button.addEventListener('click', toggleProduct);
    });
  });

  // Функция обновления для всех блоков cross-sale (вызывается при переключении типа покупки)
  function updateAllCrossSales() {
    document.querySelectorAll('.cross-sale').forEach(function(block) {
      updateSelectedProducts(block);
    });
  }

  // При загрузке страницы сразу обновляем цены согласно выбранному типу покупки
  updateAllCrossSales();

  // Обработчик клика для переключения типа покупки.
  // Предполагается, что переключение происходит по клику на элемент .buy-product-type
  document.querySelectorAll('.buy-product-type').forEach(function(typeBlock) {
    typeBlock.addEventListener('click', function() {
      // Небольшая задержка, чтобы дать время измениться классам active
      setTimeout(function() {
        updateAllCrossSales();
      }, 50);
    });
  });

  // Обработка перехода к checkout (остальной функционал без изменений)
  const checkoutBtn = document.querySelector('.open-upsell');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const originalHref = checkoutBtn.getAttribute('href');
      let crossSaleItems = [];
      document.querySelectorAll('.cross-sale').forEach(function(crossSaleBlock) {
        const blockIndex = crossSaleBlock.dataset.blockIndex;
        crossSaleBlock.querySelectorAll('.cross-sale-item').forEach(function(item) {
          const title = item.querySelector('.cross-sale-item__title').textContent.trim();
          const key = 'crossSaleBlock_' + blockIndex + '_' + title;
          const id = localStorage.getItem(key);
          if (id) {
            crossSaleItems.push(id);
          }
        });
      });
      if (crossSaleItems.length === 0) {
        window.location.href = originalHref;
        return;
      }
      let newUrl = originalHref;
      if (originalHref.includes('/cart/clear') && originalHref.includes('return_to=/cart/add?')) {
        const outerUrl = new URL(originalHref);
        const returnToParam = outerUrl.searchParams.get('return_to');
        const returnToUrl = new URL(returnToParam, window.location.origin);
        crossSaleItems.forEach(function(id) {
          returnToUrl.searchParams.append('items[][id]', id);
          returnToUrl.searchParams.append('items[][quantity]', '1');
        });
        const newReturnTo = returnToUrl.pathname + '?' + returnToUrl.searchParams.toString();
        outerUrl.searchParams.set('return_to', newReturnTo);
        newUrl = outerUrl.toString();
      } else if (originalHref.includes('/cart/')) {
        const url = new URL(originalHref);
        let cartItems = url.pathname.replace('/cart/', '');
        if (cartItems && cartItems.slice(-1) !== ',') {
          cartItems += ',';
        }
        const crossSaleString = crossSaleItems.map(function(id) {
          return id + ':1';
        }).join(',');
        cartItems += crossSaleString;
        url.pathname = '/cart/' + cartItems;
        newUrl = url.toString();
      }
      window.location.href = newUrl;
    });
  }
});



