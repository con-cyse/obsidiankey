<template>  
  <client-only>  
    <header :class="['bh-navbar', navAdminMode]">  
      <nav class="bh-nav-left"> 
          <a href="/" class="bh-nav-home"> 
            <img src="/logo.png" width=20 height=20 class="bh-nav-logo"> 
            <span>Bleedingheart</span> 
          </a>  
      </nav>  
      <nav id="bhNavBasic" class="bh-nav-right bh-hidden">  
        <ul> 
          <li><a href="#" class="bh-nav-link">3R Guide</a></li> 
          <li><a href="#" class="bh-nav-link">Leaderboard</a></li> 
          <li><a href="#" class="bh-nav-link">Contribute</a></li> 
          <li><span id="bhNavBasicLogout" class="bh-nav-link">Logout</span></li> 
        </ul> 
      </nav> 
      <nav id="bhNavAdmin" class="bh-nav-right bh-hidden">  
        <ul> 
          <li><a href="#" class="bh-nav-link">Settings</a></li> 
          <li><a href="#" class="bh-nav-link">Reports</a></li> 
          <li><span id="bhNavAdminLogout" class="bh-nav-link">Logout</span></li> 
        </ul> 
      </nav> 
    </header>  
  </client-only>  
</template> 
 
<script setup lang="ts"> 
const props = defineProps<{ navAdminMode: string }>(); 
</script>