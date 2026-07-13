// Конфигурация продуктов
const PRODUCT_CONFIG = {
  '1': {
    prices: {
      oldPrice: '$70.00',
      price: '$40.00',
      oldPriceAutoship: '$60.00',
      priceAutoship: '$30.00',
      listPrice: '$30.00',
      finalPriceOneTime: '$40.00',
      finalPriceAutoship: '$30.00'
    },
    savings: {
      oneTime: 'save $30.00',
      autoship: 'save $30.00'
    },
    cartLinks: {
      oneTime: 'https://secretelement.com/cart/51112983527708:1',
      autoship: {
        'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51112983593244%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
        'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51112983626012%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
        'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51112983658780%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
      }
    },
    listMonth: 'Every Month',
    defaultDelivery: 'Delivery every 1 month',
    defaultDeliveryIndex: 0
  },
  '2': {
    prices: {
      oldPrice: '$108.00',
      price: '$72.00',
      oldPriceAutoship: '$108.00',
      priceAutoship: '$54.00',
      listPrice: '$54.00',
      finalPriceOneTime: '$72.00',
      finalPriceAutoship: '$54.00'
    },
    savings: {
      oneTime: 'save $36.00',
      autoship: 'save $54.00'
    },
    cartLinks: {
      oneTime: 'https://secretelement.com/cart/51112983527708:1',
      autoship: {
        'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51112983691548%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
        'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51112983724316%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
        'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51112983757084%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
      }
    },
    listMonth: 'Every 2 Months',
    defaultDelivery: 'Delivery every 2 months',
    defaultDeliveryIndex: 1
  },
  '3': {
    prices: {
      oldPrice: '$153.00',
      price: '$102.00',
      oldPriceAutoship: '$153.00',
      priceAutoship: '$76.50',
      listPrice: '$76.8505',
      finalPriceOneTime: '$102.00',
      finalPriceAutoship: '$76.50'
    },
    savings: {
      oneTime: 'save $51.00',
      autoship: 'save $76.50'
    },
    cartLinks: {
      oneTime: 'https://secretelement.com/cart/51112983560476:1',
      autoship: {
        'Delivery every 1 month': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51112983789852%26items[][quantity]=1%26items[][selling_plan]=693855551772%26return_to=/checkout',
        'Delivery every 2 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51112983822620%26items[][quantity]=1%26items[][selling_plan]=693855715612%26return_to=/checkout',
        'Delivery every 3 months': 'https://secretelement.com/cart/clear?return_to=/cart/add?items[][id]=51112983855388%26items[][quantity]=1%26items[][selling_plan]=693855879452%26return_to=/checkout'
      }
    },
    listMonth: 'Every 3 Months',
    defaultDelivery: 'Delivery every 3 months',
    defaultDeliveryIndex: 2
  }
};

// Класс для управления продуктом
class ProductManager {
  constructor(productBlock) {
    this.block = productBlock;
    this.elements = this.cacheElements();
    this.config = PRODUCT_CONFIG;
    this.init();
  }

  cacheElements() {
    return {
      tubs: this.block.querySelectorAll('.buy-product-tub'),
      btn: this.block.querySelector('.buy-product-type__btn'),
      productTypes: this.block.querySelectorAll('.buy-product-type'),
      trigger: this.block.querySelector('.buy-product-type-select__trigger'),
      items: this.block.querySelector('.buy-product-select-items'),
      selectItems: this.block.querySelectorAll('.buy-product-select-item'),
      oldPrice: this.block.querySelector('.buy-product__old-price'),
      price: this.block.querySelector('.buy-product__price'),
      oldPriceAutoship: this.block.querySelector('.buy-product__old-price--autoship'),
      priceAutoship: this.block.querySelector('.buy-product__price--autoship'),
      listPrice: this.block.querySelector('.list-price'),
      listMonth: this.block.querySelector('.list-month'),
      finalPrice: this.block.querySelector('.final-price'),
      shipping: this.block.querySelector('.buy-product-type__shipping')
    };
  }

  init() {
    this.attachTubListeners();
    this.attachProductTypeListeners();
    this.attachSelectListeners();
  }

  getActiveTub() {
    return this.block.querySelector('.buy-product-tub.active');
  }

  getTubData(tub) {
    return tub ? tub.getAttribute('data-tub') : null;
  }

  getActiveProductType() {
    return Array.from(this.elements.productTypes).find(type => type.classList.contains('active'));
  }

  isAutoshipActive() {
    const activeType = this.getActiveProductType();
    return activeType && activeType.classList.contains('buy-product-type__second');
  }

  updatePrices(tubData) {
    const config = this.config[tubData];
    if (!config) return;

    const { prices } = config;
    this.elements.oldPrice.textContent = prices.oldPrice;
    this.elements.price.textContent = prices.price;
    this.elements.oldPriceAutoship.textContent = prices.oldPriceAutoship;
    this.elements.priceAutoship.textContent = prices.priceAutoship;
    this.elements.listPrice.textContent = prices.listPrice;
    this.elements.listMonth.textContent = config.listMonth;
  }

  updateSavings(tubData, isAutoship = false) {
    const config = this.config[tubData];
    if (!config) return;

    const activeTub = this.getActiveTub();
    if (activeTub) {
      const savingsText = isAutoship ? config.savings.autoship : config.savings.oneTime;
      const savingsElement = activeTub.querySelector('.buy-product-tub__each');
      if (savingsElement) {
        savingsElement.textContent = savingsText;
      }
    }
  }

  updateAllSavings(isAutoship = false) {
    this.elements.tubs.forEach(tub => {
      const tubData = this.getTubData(tub);
      const config = this.config[tubData];
      if (config) {
        const savingsElement = tub.querySelector('.buy-product-tub__each');
        if (savingsElement) {
          const savings = isAutoship ? config.savings.autoship : config.savings.oneTime;
          savingsElement.textContent = savings;
        }
      }
    });
  }

  updateSelectItems(tubData) {
    const config = this.config[tubData];
    if (!config) return;

    this.elements.selectItems.forEach((item, index) => {
      item.classList.toggle('active', index === config.defaultDeliveryIndex);
    });

    const triggerText = this.elements.trigger.querySelector('p');
    if (triggerText) {
      triggerText.textContent = config.defaultDelivery;
    }
  }

  updateButtonLink(tubData, deliveryText = null) {
    const config = this.config[tubData];
    if (!config) return;

    const isAutoship = this.isAutoshipActive();
    
    if (isAutoship && deliveryText) {
      this.elements.btn.href = config.cartLinks.autoship[deliveryText] || '';
    } else {
      this.elements.btn.href = config.cartLinks.oneTime;
    }
  }

  updateFinalPrice(tubData, deliveryText = null) {
    const config = this.config[tubData];
    if (!config) return;

    const isAutoship = this.isAutoshipActive();
    const price = isAutoship ? config.prices.finalPriceAutoship : config.prices.finalPriceOneTime;
    this.elements.finalPrice.textContent = price;
  }

  updateShippingVisibility(tubData, deliveryText = null) {
    const isAutoship = this.isAutoshipActive();
    const activeTub = this.getActiveTub();
    const tubDataValue = this.getTubData(activeTub);
    
    // Логика видимости shipping
    if (isAutoship && tubDataValue === '1' && deliveryText === 'Delivery every 1 month') {
      this.elements.shipping.style.display = 'none';
    } else {
      this.elements.shipping.style.display = 'block';
    }
  }

  handleTubChange(tub) {
    // Удаляем active у всех tubs
    this.elements.tubs.forEach(t => t.classList.remove('active'));
    tub.classList.add('active');

    const tubData = this.getTubData(tub);
    this.updatePrices(tubData);
    this.updateSelectItems(tubData);

    const activeType = this.getActiveProductType();
    const isAutoship = activeType && activeType.classList.contains('buy-product-type__second');
    
    this.updateSavings(tubData, isAutoship);
    
    if (isAutoship) {
      const deliveryText = this.elements.trigger.querySelector('p').textContent;
      this.updateButtonLink(tubData, deliveryText);
      this.updateFinalPrice(tubData, deliveryText);
      this.updateShippingVisibility(tubData, deliveryText);
    } else {
      this.updateButtonLink(tubData);
      this.updateFinalPrice(tubData);
      this.updateShippingVisibility(tubData);
    }
  }

  handleProductTypeChange(productType) {
    // Удаляем active у всех типов
    this.elements.productTypes.forEach(type => type.classList.remove('active'));
    productType.classList.add('active');

    const isAutoship = productType.classList.contains('buy-product-type__second');
    const activeTub = this.getActiveTub();
    const tubData = this.getTubData(activeTub);

    if (!tubData) return;

    // Обновляем savings для всех tubs
    this.updateAllSavings(isAutoship);

    if (isAutoship) {
      const deliveryText = this.elements.trigger.querySelector('p').textContent;
      this.updateButtonLink(tubData, deliveryText);
      this.updateFinalPrice(tubData, deliveryText);
      this.updateShippingVisibility(tubData, deliveryText);
    } else {
      this.elements.items.style.display = 'none';
      this.updateButtonLink(tubData);
      this.updateFinalPrice(tubData);
      this.updateShippingVisibility(tubData);
    }
  }

  handleDeliveryChange(deliveryText) {
    const activeTub = this.getActiveTub();
    const tubData = this.getTubData(activeTub);
    
    if (!tubData || !this.isAutoshipActive()) return;

    this.updateButtonLink(tubData, deliveryText);
    this.updateFinalPrice(tubData, deliveryText);
    this.updateShippingVisibility(tubData, deliveryText);
  }

  attachTubListeners() {
    this.elements.tubs.forEach(tub => {
      tub.addEventListener('click', () => this.handleTubChange(tub));
    });
  }

  attachProductTypeListeners() {
    this.elements.productTypes.forEach(productType => {
      productType.addEventListener('click', () => this.handleProductTypeChange(productType));
    });
  }

  attachSelectListeners() {
    // Переключение видимости select
    this.elements.trigger.addEventListener('click', () => {
      this.elements.items.style.display = 
        this.elements.items.style.display === 'block' ? 'none' : 'block';
    });

    // Обработка выбора доставки
    this.elements.selectItems.forEach(item => {
      item.addEventListener('click', () => {
        this.elements.selectItems.forEach(subItem => subItem.classList.remove('active'));
        item.classList.add('active');

        const text = item.querySelector('p').textContent;
        const triggerText = this.elements.trigger.querySelector('p');
        if (triggerText) {
          triggerText.textContent = text;
        }

        this.elements.items.style.display = 'none';
        this.handleDeliveryChange(text);
      });
    });
  }
}

// Инициализация для всех продуктов на странице
document.querySelectorAll('.buy-product').forEach(productBlock => {
  new ProductManager(productBlock);
});
