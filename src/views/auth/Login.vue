<template>
   <div class="background elevation-3">
      <v-container>

         <v-layout row wrap justify-space-around class="my-5">
            <v-flex md2 sm2 xs2 lg2>
               <v-btn color="#005598" elevation="0" to="/" icon>
                  <v-icon large color="#fff">
                     home
                  </v-icon>
               </v-btn>
            </v-flex>

            <v-flex md2 sm2 xs2 lg2>
               <v-btn color="#005598" elevation="0" to="/register/cliente">
                  <span class="white--text">
                     Registrate
                  </span>
                  <v-icon x-large color="#fff">
                      keyboard_arrow_right
                  </v-icon>
               </v-btn>
            </v-flex>
         </v-layout>

         <v-layout row wrap justify-center>
            <v-flex md6 xs6 lg4 sm6> 
               <v-card elevation="5" class="pa-5 my-10">
                  <div class="text-center">
                     <v-btn text>
                        <v-img src="@/assets/log.png"></v-img>
                     </v-btn>
                  </div>
                  <v-divider class="my-7"></v-divider>

                  <formLogin/>
               </v-card>
            </v-flex>
         </v-layout>
      </v-container>

      <FooterAuth />
      <SubFooter />
   </div>
</template>

<script>
import FormLogin from '@/components/vistaAuth/FormLogin';
import SubFooter from '@/components/footer/SubFooter';
import FooterAuth from '@/components/vistaAuth/FooterAuth';

export default {
   components:{
      FormLogin,
      SubFooter,
      FooterAuth
   },
}
</script>

<style scoped>
   .background{
      background-color:rgba(0,82,152,0.8);
      height: 30%;
   } 
</style>