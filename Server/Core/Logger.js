require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

module.exports = class Logger{
    static log(title, smallTitle, description = "no futher actions needed", color){
        //color codes can be found here https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
        this.params = {
            username: "Server Logs",
            avatar_url: "https://cdn.discordapp.com/attachments/920976500612816906/921130664286363648/unknown.png",
            content: "",
            embeds: [
                {
                    "title": `${title}`,
                    "color": `${color}`,
                    "thumbnail": {
                        "url": "",
                    },
                    "fields": [
                        {
                            "name": `${smallTitle}`,
                            "value": `${description}`,
                            "inline": true
                        }
                    ],
                    "timestamp" : new Date(),
                }
            ]
        }
        fetch(process.env.SERVERWEBHOOK, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.params)
        })
    }
}