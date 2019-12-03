<template>
     <div class="mx-10 mt-5">
        <CardTable 
            :headers="headers"
            :desserts="desserts"
            title="Aliados"
            color="green"
            ventas="true"
            ver="true"
        />
    </div>
</template>

<script>
import CardTable from '@/components/vistaAdmin/CardTable';

    export default {
        components:{
            CardTable
        },
        data(){
            return{
                headers: [
                    {
                        text: 'Nombre(s)',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'Apellido(s)',sortable: false,value: 'apellido'},
                    { text: 'Cedula', value: 'cedula',sortable: false},
                    { text: 'Email', value: 'email',sortable: false},
                    { text: 'Telefono', value: 'telefono',sortable: false },
                    { text: 'Acciones', value: 'action', sortable: false },
                ],
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        apellido:'Yogurt',
                        cedula:'26707104',
                        email: 'iriojgomezv@gmail.com',
                        telefono: '0412-7959576',
                    },
                    {
                        name: 'Frozen Yogurt',
                        apellido:'Yogurt',
                        cedula:'26707104',
                        email: 'iriojgomezv@gmail.com',
                        telefono: '0412-7959576',
                    },
                    {
                        name: 'Frozen Yogurt',
                        apellido:'Yogurt',
                        cedula:'26707104',
                        email: 'iriojgomezv@gmail.com',
                        telefono: '0412-7959576',
                    },
                    {
                        name: 'Frozen Yogurt',
                        apellido:'Yogurt',
                        cedula:'26707104',
                        email: 'iriojgomezv@gmail.com',
                        telefono: '0412-7959576',
                    },
                    {
                        name: 'Frozen Yogurt',
                        apellido:'Yogurt',
                        cedula:'26707104',
                        email: 'iriojgomezv@gmail.com',
                        telefono: '0412-7959576',
                    },
                    {
                        name: 'Frozen Yogurt',
                        apellido:'Yogurt',
                        cedula:'26707104',
                        email: 'iriojgomezv@gmail.com',
                        telefono: '0412-7959576',
                    },
                    {
                        name: 'Frozen Yogurt',
                        apellido:'Yogurt',
                        cedula:'26707104',
                        email: 'iriojgomezv@gmail.com',
                        telefono: '0412-7959576',
                    },
                    {
                        name: 'Frozen Yogurt',
                        apellido:'Yogurt',
                        cedula:'26707104',
                        email: 'iriojgomezv@gmail.com',
                        telefono: '0412-7959576',
                    },
                    {
                        name: 'Frozen Yogurt',
                        apellido:'Yogurt',
                        cedula:'26707104',
                        email: 'iriojgomezv@gmail.com',
                        telefono: '0412-7959576',
                    },
                ]
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>