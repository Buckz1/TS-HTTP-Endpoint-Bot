declare global {
    namespace NodeJS {
        interface ProcessEnv {
            Token: string;
            appId: string;
            clientKey: string;
        }
    }
}

export {};