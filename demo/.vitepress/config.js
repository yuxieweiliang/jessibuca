module.exports = {
    title: 'Jessibuca',
    description: '一款纯H5直播流播放器',
    themeConfig: {
        repo: "langhuihui/jessibuca/tree/v3",
        docsBranch: "v2",
        sidebar: "auto",
        nav: [
            {text: 'API', link: '/api'},
            {text: 'DEMO', link: '/demo' },
            {text: 'Document', link: '/document'},
            {text: 'HTTP', link: 'http://jessibuca.monibuca.com/'},
            {text: 'HTTPS', link: 'https://j.m7s.live/'},
        ],
        logo: 'logo.png',
    },
    head: [
        // ['script', {src: '/jessibuca.js'}]
        ['script', {src: '/jessibuca.js'}],
        ['script', {src: '/vconsole.js'}]
    ],

    configureWebpack: (config, isServer) => {
        console.log(config, isServer)
        config.devServer = {
            proxy: {
                '/webrtc-api': {
                    target: "http://192.168.1.70:8080",
                        pathRewrite: {'^/webrtc-api': 'api'},
                    changeOrigin: true,
                        secure: false
                },
            }
        }
    },
    devServer: {
        proxy: {
            '/webrtc-api': {
                target: "http://192.168.1.70:8080",
                pathRewrite: {'^/webrtc-api': 'api'},
                changeOrigin: true,
                secure: false
            },
        }
    },
}
