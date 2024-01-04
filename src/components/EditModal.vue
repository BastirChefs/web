<script setup>
const props = defineProps(['data'])
const emits = defineEmits(['close'])
console.log(props.data)
</script>

<template>
<Teleport to="body">
  <div class="modal">
    <div v-for="(value, key) in data" :key="key" style="display: flex; justify-content: space-between;">
        <label>{{ key }}</label>
        <input type="text" v-model="data[key]"/>
    </div>

    <button @click="$emit('save')">Save</button>
    <button @click="$emit('close')">Close</button>
    </div>
</Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  height: 200px;
  border-radius: 10px;

  margin-left: -150px;
  background: var(--vt-c-black);
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 5px;

}
</style>