<script lang="ts"> 
if (typeof (window as any).global === "undefined") { 
  (window as any).global = window; 
} 
 
export default { 
  //components: true, 
}; 
</script> 
 
<template> 
  <client-only> 
    <div id="textMessage" class="text-message">Hello, world!</div> 
  </client-only> 
</template> 
 
<script setup lang="ts"></script> 
 
<style scoped></style> 
 
<style></style> 