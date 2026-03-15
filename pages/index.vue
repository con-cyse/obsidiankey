<script lang="ts"></script> 
 
<template> 
    <client-only> 
        <NavBar />
        <div id="okMain" class="ok-main"></div> 
        <!-- <Cookies /> --> 
        <Copyright />
    </client-only> 
</template> 
 
<script setup lang="ts"> 
 
import { useSeoMeta, useHead } from '@vueuse/head'; 
 
const title = "Obsidian Key | Home"; 
const description = "A personalized course matching tailored to your strengths and interests."; 
 
useSeoMeta({ 
  title: () => title, 
  description: () => description, 
  charset: "utf-8", 
  viewport: "width=device-width, initial-scale=1.0" 
}); 
 
useHead({ 
  link: [ 
    {rel: 'icon', type: 'image/png', href: '/logo.png'}, 
    {rel: 'stylesheet', href: '/reset.css'}, 
    {rel: 'stylesheet', href: '/custom.css'} , 
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'}, 
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
    {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Noto+Sans+Display:ital,wght@0,100..900;1,100..900&display=swap'}
 
  ] 
});
</script> 
 
<style scoped></style> 
 
<style></style>