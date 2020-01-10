<template>
    <div>
        <div v-if="sgrupos.length == 0" class="text-center mt-10">
            <strong class="grey--text">No se encontraron resultados...</strong>
            <v-row justify="center" align="center">
                <v-col cols="12" md="6">
                    <v-img src="@/assets/nodata.svg" height="500" contain />
            </v-col>
            </v-row>
        </div>
        <div v-for="subgrupo in sgrupos" :key="subgrupo.id" v-else>
            <div class="headline ml-12 mt-12 font-weight-black">{{subgrupo.nombre}}</div>
            <v-slide-group
                show-arrows
                class="my-5"
            >
                <v-slide-item
                    v-for="concepto in conceptos"
                    :key="concepto.id"
                    class="mx-2 mb-10 mt-5"
                >   
                    <div v-if="concepto.subgrupos_id == subgrupo.id">
                        <CardConceptos :concepto="concepto"/>
                    </div>
                </v-slide-item>
            </v-slide-group>  
        </div>
    </div>
</template>

<script>
import CardConceptos from '@/components/cards/CardConceptos';
import SliderConceptos from '@/components/sliders/SliderConceptos';//no usado por logica del componente (pensar que hacer!)

    export default {
        components:{
            CardConceptos,
            SliderConceptos
        },
        props:{//props que vienen de empresaData
            conceptos:{
                type:Array,
                dafault:() => []
            },
            subgrupos:{
                type:Array,
                default: () => []
            },
            grupos:{
                type:Array,
                default: () => []
            },
            selectGrupo:{
                type:Number,
                default:0
            },
            selectSubgrupo:{
                type:Number,
                default:0
            }
        },
        watch:{
            selectGrupo(){
                this.sgrupos= [];//reincio de variable

                for (let i=0; i < this.subgrupos.length; i++) {
                    if(this.subgrupos[i].grupos_id == this.selectGrupo){
                       this.sgrupos.push(this.subgrupos[i]);
                   }
                }
            },

            selectSubgrupo(){
                this.sgrupos= [];//reincio de variable
                
                for (let i = 0; i < this.subgrupos.length; i++) {
                    if(this.selectSubgrupo == this.subgrupos[i].id){
                        this.sgrupos.push(this.subgrupos[i]); 
                    }
                }
            },

            subgrupos(){
                this.sgrupos=this.subgrupos;
            }
        },
        data() {
            return {
                item:null,
                model:1,
                sgrupos:[],
            }
        },
    }
</script>

<style lang="css" scope>
    .ribbon {
        width: 0px;
        height: 80px;
        border-left: 50px solid #d9534f;
        border-right: 50px solid #d9534f;
        border-bottom: 35px solid transparent;
    }
</style>