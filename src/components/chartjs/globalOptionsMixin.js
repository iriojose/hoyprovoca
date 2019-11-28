import Chart from 'chart.js';
import { initGlobalOptions } from "@/components/chartjs/config";
export default {
  mounted() {
    initGlobalOptions(Chart);
  }
}
