<!--Ejercicio:

Implemente una aplicación Vue que consuma los siguientes endpoints de una API:

https://dummyjson.com/products
https://dummyjson.com/products/1
https://dummyjson.com/products/category/smartphones
-->

<template>
  <div class="app-container">
    <h1>API REST</h1>
    <div>
      <ProductList />
    </div>

    <div>
      <ProductDetails />
    </div>
    
</div>
</template>

<script setup>
import ProductList from './components/ProductList.vue'
import ProductDetails from './components/ProductDetails.vue';
</script>