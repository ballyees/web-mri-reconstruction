
const config = {
    "development": {
        "baseURL": process.env.URL_DEV || "http://localhost:8000"
    },
    "production": {
        "baseURL": process.env.URL_PROD || "http://localhost:8000"
    }
};

export default function Config() {
    console.log(process.env.NODE_ENV)
    // console.log(process.env, config)
    if (process.env.NODE_ENV === 'production') {
        return config.production;
    }
    else {
        return config.development;
    }
}