<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// getter que definimos en el módulo auth
const favorites = computed(() => store.getters['auth/favorites']);
const user = computed(() => store.getters['auth/currentUser']);
</script>

<template>
  <section class="container py-4">
    <h1 class="mb-3">Mis lugares favoritos</h1>

    <p class="text-muted" v-if="user">
      Usuario: <strong>{{ user.name }}</strong>
    </p>

    <!-- Sin favoritos -->
    <p v-if="!favorites || favorites.length === 0" class="text-muted">
      No tienes lugares favoritos configurados.
    </p>

    <!-- Lista de favoritos -->
    <ul v-else class="list-group col-md-4">
      <li
        v-for="city in favorites"
        :key="city"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{{ city }}</span>
        <!-- Aquí más adelante puedes poner un botón para ir al detalle -->
        <!-- <RouterLink :to="...">Ver pronóstico</RouterLink> -->
      </li>
    </ul>
  </section>
</template>