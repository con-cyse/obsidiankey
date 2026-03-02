<script setup lang="ts"> 
  const year = new Date().getFullYear(); 
</script> 
 
<template> 
  <client-only> 
  <footer> 
    <nav> 
        <a href="terms">Terms and Conditions</a> 
        <span>&nbsp;|&nbsp;</span> 
        <a href="privacy">Privacy Policy</a> 
        <span>&nbsp;|&nbsp;</span> 
        <a href="support">Support</a> 
    </nav> 
    <p> 
      <span>&copy;&nbsp;</span> 
      <span>{{ year }}</span> 
      <span>&nbsp;Pathra. All rights reserved.</span> 
    </p> 
  </footer> 
  </client-only> 
</template> 
 
<style scoped></style> 
