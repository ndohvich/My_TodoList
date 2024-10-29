<script>
import axios from 'axios';
import LayoutDiv from './LayoutDiv.vue'
  
export default {
  name: 'MyTodoList',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getUser();
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
      this.$router.push('/')
    }else {
      this.getUser();
    }
 
  },
  methods: {
    getUser() {
        axios.get('/api/user', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((r) => {
           this.user = r.data;
           return r
        })
        .catch((e) => {
           return e
        });
    },
 
    logoutAction () {
      axios.post('/api/logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((r) => {
          localStorage.setItem('token', "")
          this.$router.push('/')
          return r
      })
      .catch((e) => {
        return e
      });
    }
 
  },
};
</script>

<template>
    <layout-div>
       <div class="row justify-content-md-center">
         <div class="col-12">
             <nav class="navbar navbar-expand-lg navbar-light bg-light">
                 <div class="container-fluid">
                     <a class="navbar-brand" href="#"><b>MyTodoList : Tableau de Bord</b></a>
                     <div class="d-flex">
                         <ul class="navbar-nav">
                             <li class="nav-item">
                                 <a @click="logoutAction()" class="nav-link" aria-current="page" href="#"><b>Deconnexion</b></a>
                             </li>
                         </ul>
                     </div>
                 </div>
             </nav>
            <h2 class="text-center mt-5">Bienvenue, {{user?.name}}!</h2  >
         </div>
       </div>
    </layout-div>
</template>


<style lang="scss" scoped>

</style>