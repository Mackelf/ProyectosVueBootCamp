<script setup>
import LoginForm from './components/LoginForm.vue'
function onLogin(payload) {
  console.log(payload) // { email: 'mario@example.com', password: 'secret' }
}
</script>

<template>
  <LoginForm @login="onLogin"/>
</template>
