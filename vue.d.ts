/* declare module "*.vue"{
    import Vue from "vue";
    export default Vue;
} */

declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
  }