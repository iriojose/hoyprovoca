<template>
    <div>
        <div class="font-weight-black subtitle-1">¿En qué te podemos ayudar?</div>

        <v-card class="fixHeight" style="padding: 25px 45px 0 45px;background:#fdfdfd;"  min-height="570px">
            <div class="font-weight-black title" style="padding-top:10px;">Centro de Soporte al Cliente</div>
            <v-row justify="center" align="center" class="mt-3" style="padding-top:15px;">
                <div id="talkjs-container" style="width: 100%;; height: 450px"><i><v-spacer></v-spacer><loader style="padding-top:20%" /> <v-spacer></v-spacer></i></div>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Talk from 'talkjs';
import variables from '@/services/variables_globales';

    export default {
        data() {
            return {
                ...variables,
                me: null,
                other: null,
            }
        },
        computed:{
            ...mapState(['user','fotoChanged','foto','fotoFile']),
        },
        watch: {
            fotoFile:function(){
                console.log(this.fotoFile);
            },
            fotoChanged: function(){
                this.change = this.fotoChanged;
            },
        },
       methods:{
            ...mapActions(['setSnackbar','setFoto','setFotoChanged']),
            
        },
        mounted() {
            let inbox;
            Talk.ready.then(async () => {
                this.me = new Talk.User({
                    id: this.user.data.id !== 5 ? this.user.data.id : 5,
                    name: this.user.data.id !== 5 ? this.user.data.nombre + " " + this.user.data.apellido: "Soporte SOMOS SISTEMAS C.A",
                    email: this.user.data.id !== 5 ? this.user.data.email !== "" ? this.user.data.email : null : null, 
                    photoUrl: this.user.data.id !== 5 ? this.user.data.fotografia === 'default.png' ? require('@/assets/user.jpg') : this.imagen+this.user.data.fotografia : require('@/assets/AFTIM.png'),
                    welcomeMessage: this.user.data.id !== 5 ?  null : "En Somos Sistemas C.A, estamos encantados de ayudarte a solventar tus problemas. Déjanos un mensaje!",
                    role: 'Customer',
                    locale: 'es-ES'
                });
                window.talkSession = new Talk.Session({
                    appId: process.env.VUE_APP_TALKJS_ID,
                    me: this.me
                });
                
                
                if(this.user.data.id !== 5){
                    this.other = new Talk.User({
                        id: "5",
                        name: "Soporte SOMOS SISTEMAS C.A",
                        email: "azukadizero@gmail.com",
                        photoUrl: require('@/assets/AFTIM.png'),
                        welcomeMessage: "En Somos Sistemas C.A, estamos encantados de ayudarte a solventar tus problemas. Déjanos un mensaje!",
                        role:'Support',
                        locale: 'es-ES'
                    });
                    let conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(this.me, this.other));
                    conversation.setParticipant(this.me);
                    conversation.setParticipant(this.other);
                    inbox = window.talkSession.createInbox({selected: conversation});
                    
                }else{
                    window.talkSession = new Talk.Session({
                        appId: process.env.VUE_APP_TALKJS_ID,
                        me: this.me
                    });
                    let conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(this.me));
                    conversation.setParticipant(this.me);
                    
                    inbox = window.talkSession.createInbox({selected: conversation});
                }
                inbox.mount(document.getElementById("talkjs-container"));
            });
        }
    }
</script>

<style lang="scss" scoped>
    .fixHeight{
        @media (max-width:958px){
            margin-top:-25px!important;
            max-height: 100%!important;
        }
    }
</style>