<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">👥 Perfiles de Usuario</h1>

    <div class="d-flex flex-wrap gap-5 justify-content-center">
      <!-- Perfil 1 -->
       <PerfilUsuario>
        <template #imagen>
          <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style="width:150px; height:150px; background-color:#198754; color:white; font-size:3rem; font-weight:600;">
            PRST
          </div>
        </template>

        <template #info>
          <h5 class="card-title">Sarah</h5>
          <p class="text-muted mb-1">📧 Sarah@shiningforce.org</p>
          <p class="text-muted"><i class="bi bi-bandaid"></i>Priest-Elf</p>
        </template>

       <template #acciones>
          
          <button class="btn btn-primary btn-sm"> Editar perfil</button>
          <button class="btn btn-success btn-sm"> Ver perfil</button>
          <button class="btn btn-outline-danger btn-sm">🚪 Logout</button>
        </template>
      </PerfilUsuario>

      <!-- Perfil 2 -->
   <PerfilUsuario>
        <template #imagen>
          <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style="width:150px; height:150px; background-color:#dc3545; color:white; font-size:3rem; font-weight:600;">
            HERO
          </div>
        </template>

        <template #info>
          <h5 class="card-title">Bowie</h5>
          <p class="text-muted mb-1">📧 Bowie@shiningforce.org</p>
          <p class="text-muted"><i class="bi bi-gear"></i> Human-Hero</p>
        </template>

        <template #acciones>
          
          <button class="btn btn-primary btn-sm"> Editar perfil</button>
          <button class="btn btn-success btn-sm"> Ver perfil</button>
          <button class="btn btn-outline-danger btn-sm">🚪 Logout</button>
        </template>
      </PerfilUsuario>

<!--Perfil 3-->
      <PerfilUsuario>
        <template #imagen>
          <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style="width:150px; height:150px; background-color:#0d6efd; color:white; font-size:3rem; font-weight:600;">
            KNTE
          </div>
        </template>

        <template #info>
          <h5 class="card-title">Chester</h5>
          <p class="text-muted mb-1">📧 Chester@shiningforce.org</p>
          <p class="text-muted"><i class="bi bi-person-vcard"></i> Centaur - Knight </p>
        </template>

        <template #acciones>
          
          <button class="btn btn-primary btn-sm"> Editar perfil</button>
          <button class="btn btn-success btn-sm"> Ver perfil</button>
          <button class="btn btn-outline-danger btn-sm">🚪 Logout</button>
        </template>
      </PerfilUsuario>
    </div>
  </div>
</template>

<script setup>
import PerfilUsuario from './components/PerfilUsuario.vue'
</script>
