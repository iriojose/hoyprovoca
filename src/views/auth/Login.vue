<template>
   <div class="background elevation-3">
      <v-row class="pt-10">
         <v-col cols="12" md="3" sm="3" lg="3" offset="3">
               <v-btn color="#005598" elevation="0" to="/" icon>
                  <v-icon large color="#fff">
                     home
                  </v-icon>
               </v-btn>
         </v-col>
         <v-col cols="12" md="3" lg="3" sm="3" offset="2">
            <v-btn color="#005598" elevation="0" to="/register/cliente">
                  <span class="white--text">
                     Registrate
                  </span>
                  <v-icon x-large color="#fff">
                      keyboard_arrow_right
                  </v-icon>
               </v-btn>
         </v-col>
      </v-row>

      <v-row>
         <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
            <v-img 
               contain 
               class="margen"
               :src="require('@/assets/undrawlogin.svg')"
            ></v-img>
         </v-col>

         <v-col cols="12" md="4" sm="8" lg="4">
            <v-card elevation="15" class="pa-5 my-10">

               <div class="text-center">
                  <v-btn text>
                     <v-img src="@/assets/log.png"></v-img>
                  </v-btn>
               </div>
               <v-divider class="mt-5"></v-divider>

               <v-card-text>
                  <formLogin/>
               </v-card-text>
               <v-divider></v-divider>

               <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text class="decoracion text-lowercase" depressed>
                     Olvido su contraseña?
                  </v-btn>
               </v-card-actions>
            </v-card>
         </v-col>

         <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
            <v-img 
               contain 
               class="margen"
               :src="require('@/assets/undrawlogin2.svg')" 
               height="300"
            ></v-img>
         </v-col>
      </v-row>
      
      <SubFooter />
   </div>
</template>

<script>
import FormLogin from '@/components/vistaAuth/FormLogin';
import SubFooter from '@/components/footer/SubFooter';

export default {
   components:{
      FormLogin,
      SubFooter,
   },
}
</script>

<style scoped>
   .background{
      background-color:rgba(0,82,152,0.8);
      height: 30%;
   } 
   .margen{
      margin-top:250px;
   }

   .decoracion{
      text-decoration: underline;
   }
</style>