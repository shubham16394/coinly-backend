const env = process.env.NODE_ENV || 'dev';

const devConfig = {
    db: "coinly"
}

const prodConfig = {
    db: "coinly"
}


export const config = env === 'prod' ? prodConfig : devConfig;