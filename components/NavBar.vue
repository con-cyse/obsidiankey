<template>  
  <client-only>  
    <header :class="['ok-navbar', navAdminMode]">   
      <nav class="ok-nav-left"> 
          <a href="/" class="ok-nav-home"> 
            <img src="/logo.png" width=20 height=20 class="ok-nav-logo"> 
            <span>Obsidian Key</span> 
          </a>  
      </nav>  
      <nav id="okNavBasic" class="ok-nav-right ok-hidden">  
        <ul> 
          <li><a href="#" class="ok-nav-link">Generate Course Recommendations</a></li> 
          <li><a href="#" class="ok-nav-link">View Course Details</a></li> 
          <li><a href="#" class="ok-nav-link">Update Profile</a></li>
          <li><span id="okNavBasicLogout" class="ok-nav-link">Logout</span></li> 
        </ul> 
      </nav>  
      <nav id="okNavAdmin" class="ok-nav-right ok-hidden">  
        <ul> 
          <li><a href="#" class="ok-nav-link">Settings</a></li> 
          <li><a href="#" class="ok-nav-link">Reports</a></li> 
          <li><span id="okNavAdminLogout" class="ok-nav-link">Logout</span></li> 
        </ul> 
      </nav>
    </header>  
  </client-only>  
</template>

<script setup lang="ts"> 
const props = defineProps<{ navAdminMode: string }>(); 
</script>