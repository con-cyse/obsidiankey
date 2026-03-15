<script lang="ts"></script> 
 
<template> 
    <client-only> 
        <NavBar />
        <div id="okMain" class="ok-main"></div> 
        <Cookies />
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

  const globalDelay = 500; 
  const allowCookies = useCookie<boolean>("allowCookies", { 
    sameSite: "none", 
    secure: true, 
    maxAge: 60 * 60 * 24, 
  }); 
  allowCookies.value = allowCookies.value || false; 
  async function loadModal() {   
    const cookieModal = document.getElementById("okCookieModal") as HTMLDivElement; 
    const cookieBox = document.getElementById("okCookieBox") as HTMLDivElement; 
    const cookieX = document.getElementById("okCookieX") as HTMLDivElement; 
    const cookieOK = document.getElementById("okCookieOK") as HTMLDivElement; 
    if ( !cookieModal || !cookieBox || !cookieX || !cookieOK ) return; 
    if (allowCookies.value === true) { 
      allowAllCookies(); 
      return; 
    }
    
    showCookiePopup();
    cookieX.addEventListener("click", (e) => { 
      showCookiePopup(false); 
    }); 
  
    cookieOK.addEventListener("click", (e) => { 
      allowAllCookies(); 
    }); 
  } 
 
  async function showCookiePopup(show: boolean = true) { 
    const cookieBox = document.getElementById("okCookieBox") as HTMLDivElement; 
    const cookieModal = document.getElementById("okCookieModal") as HTMLDivElement; 
    if (!cookieBox || !cookieModal) { 
      setTimeout(showCookiePopup, 50); 
      return; 
    } 
  
    if (!show) { 
      cookieBox.classList.add("ok-hidden"); 
      cookieModal.classList.add("ok-hidden"); 
      return; 
    } 
    
    cookieBox.classList.remove("ok-hidden"); 
    cookieModal.classList.remove("ok-hidden"); 
  } 
 
  let lastCookieClicked = 0; 
  async function allowAllCookies() { 
    if (lastCookieClicked >= Date.now() - globalDelay) return; 
    lastCookieClicked = Date.now(); 
    allowCookies.value = true; 
    showCookiePopup(false); 
  } 
 
  onMounted(() => { 
    setTimeout(() => { 
      loadModal(); 
    }, 1); 
  }); 
</script> 
 
<style scoped></style> 
 
<style></style>