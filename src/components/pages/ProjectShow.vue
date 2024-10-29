<template>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Afficher les tâches</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/">Voir tous les projets
                 </router-link>
             </div>
             <div class="card-body">
                 <b className="text-muted">Nom:</b>
                 <p>{{project.name}}</p>
                 <b className="text-muted">Description:</b>
                 <p>{{project.description}}</p>
             </div>
         </div>
    </layout-div>
 </template>
  
 <script>
 import axios from 'axios';
 import LayoutDiv from '../LayoutDiv.vue';
 import Swal from 'sweetalert2'
  
 export default {
   name: 'ProjectShow',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       project: {
         name: '',
         description: '',
       },
       isSaving:false,
     };
   },
   created() {
     const id = this.$route.params.id;
     axios.get(`/api/projects/${id}`)
     .then(response => {
         let projectInfo = response.data
         this.project.name = projectInfo.name
         this.project.description = projectInfo.description
         return response
     })
     .catch(error => {
         Swal.fire({
             icon: 'Erreur',
             title: 'Une Erreur est survenue!',
             showConfirmButton: false,
             timer: 1500
         })
         return error
     })
   },
   methods: {
      
   },
 };
 </script>