<template>
    <div class="p-10 text-center">
      <p>Connexion en cours...</p>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const query = new URLSearchParams(window.location.search);
      const token = query.get("token");
      const user = JSON.parse(decodeURIComponent(query.get("user")));
  
      if (token && user) {
        localStorage.setItem("access_token", token);
        localStorage.setItem("user", JSON.stringify(user));
  
        if (user.role === "admin") {
          this.$router.push("/dashboard");
        } else if (user.role === "organisateur") {
          this.$router.push("/profil_organisateur");
        } else {
          this.$router.push("/profil");
        }
      } else {
        this.$router.push("/login");
      }
    }
  };
  </script>
  