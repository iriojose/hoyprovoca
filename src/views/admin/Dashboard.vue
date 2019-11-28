<template>
    <!--Charts-->
    <div>

        <v-container
            fill-height
            fluid
            grid-list-xl
        >
            <v-layout wrap>
                <v-flex
                    md6
                    sm12
                    lg6
                >
                    <Chart
                        :data="dailySalesChart.data"
                        :options="dailySalesChart.options"
                        color="info"
                        type="Line"
                    >
                        <h4 class="title font-weight-light">Daily Sales</h4>
                        <p class="category d-inline-flex font-weight-light">
                            <v-icon
                                color="green"
                                small
                            >
                                arrow_up
                            </v-icon>
                                <span class="green--text">55%</span>&nbsp;
                                increase in today's sales
                        </p>

                        <template slot="actions">
                            <v-icon
                                class="mr-2"
                                small
                            >
                                mdi-clock-outline
                            </v-icon>
                            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
                        </template>
                    </Chart>
                </v-flex>
            </v-layout>
        </v-container>

        <v-row>
            <v-col cols="12" md="8" lg="8" offset="0">
                <v-card color="deep-purple darken-3">
                    <v-card-title class="my-5">
                        <div class="white--text">Sales Values</div>
                        <v-spacer />
                        <!--<v-btn 
                            @click.prevent="initBigChart(0)"
                            elevation="0"
                            class="mx-5"
                            :dark="bigLineChart.activeIndex == 0 ? true:false"
                            :color="bigLineChart.activeIndex == 0 ? '#673AB7':'#fff'"
                        >
                            Mes
                        </v-btn>

                        <v-btn 
                            elevation="0"
                            :dark="bigLineChart.activeIndex == 1 ? true:false"
                            @click.prevent="initBigChart(1)"
                            :color="bigLineChart.activeIndex == 1 ? '#673AB7':'#fff'"
                        >
                            Semana
                        </v-btn>-->
                    </v-card-title>
                    <v-card-text>
                        <!--<LineChart
                            :height="350"
                            ref="bigChart"
                            :chart-data="bigLineChart.chartData"
                            :extra-options="bigLineChart.extraOptions"
                        >
                        </LineChart> -->
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" lg="4" offset="0">
                <v-card>
                    <v-card-title class="my-3">
                        <h3 class="grey--text">Ordenes totales</h3>
                    </v-card-title>
                    <v-card-text>
                        <!--<BarChart
                            :height="350"
                            ref="barChart"
                            :chart-data="redBarChart.chartData"
                        >
                        </BarChart>-->
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>         
</template>

/* <script>
import * as chartConfigs from '@/components/chartjs/config';
//import LineChart from '@/components/chartjs/LineChart';
//import BarChart from '@/components/chartjs/BarChart';
import Chart from '@/components/chartjs2/Chart';

    export default {
        components:{
            //LineChart,
            //BarChart
            Chart
        },
        

        data () {
            return {
            dailySalesChart: {
                data: {
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                series: [
                    [12, 17, 7, 17, 23, 18, 38]
                ]
                },
                options: {
                lineSmooth: this.$chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
                }
            },
            dataCompletedTasksChart: {
                data: {
                labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
                series: [
                    [230, 750, 450, 300, 280, 240, 200, 190]
                ]
                },
                options: {
                lineSmooth: this.$chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
                }
            },
            emailsSubscriptionChart: {
                data: {
                labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
                series: [
                    [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

                ]
                },
                options: {
                axisX: {
                    showGrid: false
                },
                low: 0,
                high: 1000,
                chartPadding: {
                    top: 0,
                    right: 5,
                    bottom: 0,
                    left: 0
                }
                },
                responsiveOptions: [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0]
                    }
                    }
                }]
                ]
            },
            headers: [
                {
                sortable: false,
                text: 'ID',
                value: 'id'
                },
                {
                sortable: false,
                text: 'Name',
                value: 'name'
                },
                {
                sortable: false,
                text: 'Salary',
                value: 'salary',
                align: 'right'
                },
                {
                sortable: false,
                text: 'Country',
                value: 'country',
                align: 'right'
                },
                {
                sortable: false,
                text: 'City',
                value: 'city',
                align: 'right'
                }
            ],
            items: [
                {
                name: 'Dakota Rice',
                country: 'Niger',
                city: 'Oud-Tunrhout',
                salary: '$35,738'
                },
                {
                name: 'Minerva Hooper',
                country: 'Curaçao',
                city: 'Sinaai-Waas',
                salary: '$23,738'
                }, {
                name: 'Sage Rodriguez',
                country: 'Netherlands',
                city: 'Overland Park',
                salary: '$56,142'
                }, {
                name: 'Philip Chanley',
                country: 'Korea, South',
                city: 'Gloucester',
                salary: '$38,735'
                }, {
                name: 'Doris Greene',
                country: 'Malawi',
                city: 'Feldkirchen in Kārnten',
                salary: '$63,542'
                }
            ],
            tabs: 0,
            list: {
                0: false,
                1: false,
                2: false
            }
            }
        },

    methods: {
        complete (index) {
            this.list[index] = !this.list[index]
        }
    }

        /*data() {
            return {
                bigLineChart: {
                    allData: [
                        [0, 20, 10, 30, 15, 40, 20, 60, 60],
                        [0, 20, 5, 25, 10, 30, 15, 40, 40]
                    ],
                    activeIndex: 0,
                    chartData: {
                        datasets: [],
                        labels: [],
                    },
                    extraOptions: chartConfigs.blueChartOptions,
                },
                redBarChart: {
                    chartData: {
                        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Sales',
                            data: [25, 20, 30, 22, 17, 29]
                        }]
                    }
                }
            };
        },

        methods: {
            initBigChart(index) {
                let chartData = {
                    datasets: [
                        {
                            label: 'Performance',
                            data: this.bigLineChart.allData[index]
                        }
                    ],
                    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                };
                this.bigLineChart.chartData = chartData;
                this.bigLineChart.activeIndex = index;
            }
        },

        mounted() {
            this.initBigChart(0);
        } */
    } 
</script> 