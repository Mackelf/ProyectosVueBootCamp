
<template>
    <div class="alert alert-info mt-3">
        <h3>Soy Test2.vue</h3>
        <p>{{ msg }}</p>
    </div>
</template>

<script>
export default {
    name: 'Test2',
    props: {
        msg: String
    }
}
</script>