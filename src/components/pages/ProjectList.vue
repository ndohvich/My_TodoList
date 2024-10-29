<script>
  import axios from 'axios'
  import LayoutDiv from '../LayoutDiv.vue'
  import Swal from 'sweetalert2'
  import Entete from '../Header.vue'
  import Footer from '../Footer.vue'
   
  export default {
    name: 'ProjectList',
    components: {
      LayoutDiv,
      Entete, 
      Footer
    },
    data() {
      return {
        projects:[]
      };
    },
    created() {
      this.fetchProjectList();
    },
    methods: {
      fetchProjectList() {
        axios.get('/api/projects')
          .then(response => {
              this.projects = response.data;
              return response
          })
          .catch(error => {
            return error
          });
      },
      handleDelete(id){
          Swal.fire({
              title: 'êtes-vous sur ?',
              text: "Vous êtes sur le point de supprimer une Tâche",
              icon: 'Avertissement',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Oui !'
            }).then((result) => {
              if (result.isConfirmed) {
                  axios.delete(`/api/projects/${id}`)
                  .then( response => {
                      Swal.fire({
                          icon: 'Succès',
                          title: 'Tâche supprimée avec succès!',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      this.fetchProjectList();
                      return response
                  })
                  .catch(error => {
                      Swal.fire({
                           icon: 'Erreur',
                          title: 'Une erreur est survenue!',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      return error
                  });
              }
            })
      }
    },
  };
</script>

<template>
  <layout-div>
    <Entete/>
  </layout-div>
    <layout-div>
          <div class="container">
            <br><br>
            <div class="card">
                  <div class="card-header">
                      <router-link to="/create"
                          class="btn btn-primary"
                          >Créer une tâches
                      </router-link>
                  </div>
                  <div class="card-body">
               
                      <table class="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Nom</th>
                                  <th>Description</th>
                                  <th width="380px">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                               
                              <tr v-for="project in projects" :key="project.id">
                                  <td>{{project.name}}</td>
                                  <td>{{project.description}}</td>
                                  <td>
                                      <router-link :to="`/show/${project.id}`" class="btn btn-danger mx-1">Afficher</router-link>
                                      <router-link :to="`/edit/${project.id}`" class="btn btn-success mx-1">Editer</router-link>
                                      <button 
                                          @click="handleDelete(project.id)"
                                          className="btn btn-dark mx-1">
                                          Supprimer
                                      </button>
                                  </td>
                              </tr>
                                   
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </layout-div>
    <layout-div>
      <Footer/>
    </layout-div>
  </template>