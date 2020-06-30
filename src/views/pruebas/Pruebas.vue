<template>
    <div>
        pruebas
        <v-btn @click="subscribeNotificaciones(2)" style="margin-top:300px">
            prueba
        </v-btn>
    </div>
</template>

<script>
import Nots from '@/services/Nots';

    export default {
        methods: {
            //metodo de subscription en la web
            subscribeNotificaciones(id){
                if ("serviceWorker" in navigator && "PushManager" in window) {
                    navigator.serviceWorker.register('NotificationListener.js').then((response) => {
                        const applicationServerKey = this.urlB64ToUint8Array(this.key_notificaciones);
                        response.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: applicationServerKey,
                        }).then((subscription) => {
                            const traducirSbuscription = JSON.stringify(subscription);
                            this.postSubscribe(traducirSbuscription,id);
                        }).catch(function (err) {
                            console.log("Failed to subscribe the user: ", err);
                        });
                    }).catch(function (error) {
                        console.error("Service Worker Error", error);
                    });
                } else {
                    console.warn("Push messaging is not supported");
                    pushButton.textContent = "Push Not Supported";
                }
            },
            //encriptar public key de nots
            urlB64ToUint8Array(base64String) {
                const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
                const base64 = (base64String + padding)
                    .replace(/\-/g, "+")
                    .replace(/_/g, "/");

                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);

                for (let i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            },
            //subscribir para recibir nots
            postSubscribe(data,id){
                let subscribe = {
                    subscription_data:data,
                    usuario_id:id
                };
                Nots().post("/push/subscribe",{data:subscribe}).then((response) => {
                    console.log(response);
                }).catch(e => {
                    console.log(e);
                });
            },
        },
    }
</script>
