

const pkg = require('../package.json');
const nodeFetch = require("node-fetch")
let url = pkg.user ? `${pkg.url}/${pkg.user}` : pkg.url

let config = `${url}/launcher/config-launcher/config.json`;
let news = `${url}/launcher/news-launcher/news.json`;

class Config {
    GetConfig() {
        return new Promise((resolve, reject) => {
            nodeFetch(config).then(async config => {
                if (config.status === 200) return resolve(config.json());
                else return reject({ error: { code: config.statusText, message: 'Servidor no accesible.' } });
            }).catch(error => {
                return reject({ error });
            })
        })
    }

    async getInstanceList() {
        let urlInstance = `${url}/files`
        let instances = await nodeFetch(urlInstance).then(res => res.json()).catch(err => err)
        let instancesList = []
        instances = Object.entries(instances)

        for (let [name, data, background] of instances) {
            let instance = data
            instance.name = name
            instance.background = background
            instancesList.push(instance)
        }
        return instancesList
    }

    async getNews() {
        return new Promise((resolve, reject) => {
            nodeFetch(news).then(async config => {
                if (config.status === 200) return resolve(config.json());
                else return reject({ error: { code: config.statusText, message: 'Servidor no accessible.' } });
            }).catch(error => {
                return reject({ error });
            })
        })
    }
}

export default new Config;