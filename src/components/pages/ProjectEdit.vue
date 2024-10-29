<template>
  <layout-div>
    <Header />
  </layout-div>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Editer La tâche</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/">Voir les tâches
                 </router-link>
             </div>
             <div class="card-body">
                 <form>
                     <div class="form-group">
                         <label htmlFor="name">Nom</label>
                         <input 
                             v-model="project.name"
                             type="text"
                             class="form-control"
                             id="name"
                             name="name"/>
                     </div>
                     <div class="form-group">
                         <label htmlFor="description">Description</label>
                         <textarea 
                             v-model="project.description"
                             class="form-control"
                             id="description"
                             rows="3"
                             name="description"></textarea>
                     </div>
                     <button 
                         @click="handleSave()"
                         :disabled="isSaving"
                         type="button"
                         class="btn btn-outline-primary mt-3">
                         Enregistrer la tâche
                     </button>
                 </form>
             </div>
         </div>
    </layout-div>
    <layout-div>
      <Header />
    </layout-div>
 </template>
  
 <script>
 import axios from 'axios';
 import LayoutDiv from '../LayoutDiv.vue';
 import Swal from 'sweetalert2'
 import Header from '../Header.vue'
 import Footer from '../Footer.vue'
  
 export default {
   name: 'ProjectEdit',
   components: {
     LayoutDiv,
     Header, 
     Footer
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
     handleSave() {
         this.isSaving = true
         const id = this.$route.params.id;
         axios.patch(`/api/projects/${id}`, this.project)
           .then(response => {
             Swal.fire({
                 icon: 'succès',
                 title: 'La tâche est enregistré avec succès!',
                 showConfirmButton: false,
                 timer: 1500
             })
             this.isSaving = false
             this.project.name = ""
             this.project.description = ""
             return response
           })
           .catch(error => {
             this.isSaving = false
             Swal.fire({
                 icon: 'Erreur',
                 title: 'Une Erreur est survenue!',
                 showConfirmButton: false,
                 timer: 1500
             })
             return error
           });
     },
   },
 };
 </script>