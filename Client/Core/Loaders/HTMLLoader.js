export default class HTMLLoader{
    static Load(path){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.responseType = "text"
            xhr.open('GET', path, true)
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let response = xhr.response
                        let scripts = /<script[^>]*>([\s\S]*?)<\/script>/gi
                        scripts.exec(response)?.map(script => {
                            let src = script.match(/src="([^"]*)"/)
                            if(src){
                                HTMLLoader.Load(src[1]).then(js => {
                                    eval(js)
                                })
                            }
                        })
                        resolve(response)
                    } else {
                        reject(xhr.statusText)
                    }
                }
            }
            xhr.send()
        });
    }
}