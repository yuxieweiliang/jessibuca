import DefaultTheme from 'vitepress/theme'
import DemoPlayer from "../../components/DemoPlayer.vue"
import DemoPlayer2 from "../../components/DemoPlayer2.vue"
import DemoPlayerWebRTC from "../../components/DemoPlayerWebRTC.vue"
export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('DemoPlayer', DemoPlayer);
        app.component('DemoPlayer2', DemoPlayer2);
        app.component('DemoPlayerWebRTC', DemoPlayerWebRTC);
    }
}
