
<template>
    <div class="alert alert-info mt-3">
        <h3>Soy Test.vue</h3>
        <p>{{ msg }}</p>
    </div>
</template>

<script>
export default {
    name: 'Test',
    props: {
        msg: String
    }
}
</script>