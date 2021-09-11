const App = Vue.createApp({
  data() {
    return {
      max: 50,
      cart: [],
      displayCart: false,
      products : []
    }
  },
  created() {
    fetch("https://hplussport.com/api/products/order/price")
      .then(response => response.json())
      .then(data => {
        this.products = data;
      });
  },
  computed: {
    filteredProducts() {
      return this.products.filter( item => (item.price < this.max))
    },
    cartTotal() {
      return this.cart.reduce( (inc, item) => Number(item.price) + inc, 0 )
    }
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
      if (this.cartTotal >=100) {this.salesBtn = 'btn-danger'}
    }
  }
}) 
App.component('product', {
  props: ['item'],
  emits: ['addToCart'],
  template: `
    <div class="col-2 m-auto">
      <button @click="$emit('addToCart', item)" class="btn btn-success">+</button>
    </div>
    <div class="col-sm-4">
      <img class="img-fluid d-block" :src="item.image" :alt="item.name">
    </div>
    <div class="col">
     <h3 class="text-primary">{{item.name }}</h3>
     <p class="mb-0">{{ item.description }}</p>
     <div class="h5 float-right">
       <span class="label"></span><curr :amt="item.price"></curr></div>
    </div>
  `
})
App.component('curr', {
  props: ['amt'],
  template: `{{dollar(amt)}}`,
  methods: {
    dollar(value) {
      return '$' + Number.parseFloat(value).toFixed(2);
    }
  }
  
})
App.mount('#app')

