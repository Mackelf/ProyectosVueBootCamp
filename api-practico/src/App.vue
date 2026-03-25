App.vue

<template>
  <div class="app-container">
    <h1>API REST</h1>

    <div class="seccion">
      <ProductList />
    </div>

    <div class="seccion">
      <ProductDetail />
    </div>

    <div class="seccion">
      <ProductsByCategory />
    </div>

    <div class="seccion">
      <CreateProduct />
    </div>

    <div class="seccion">
      <UpdateProduct />
    </div>

    <div class="seccion">
      <DeleteProduct />
    </div>
  </div>
</template>

<script setup>
import ProductList from './components/ProductList.vue'
import ProductDetail from './components/ProductDetail.vue'
import ProductsByCategory from './components/ProductsByCategory.vue'
import CreateProduct from './components/CreateProduct.vue'
import UpdateProduct from './components/UpdateProduct.vue'
import DeleteProduct from './components/DeleteProduct.vue'
</script>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 10px;
}

.intro {
  margin-bottom: 20px;
  color: #555;
}

.seccion {
  margin-bottom: 25px;
}
</style>