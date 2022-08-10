import 'dotenv/config';
import { verifyKey } from 'discord-interactions';

export function VerifyDiscordRequest(clientKey:any) {
    
    return function (req:any, res:any, buf:any, encoding:any) {

        const signature = req.get('X-Signature-Ed25519');
        const timestamp = req.get('X-Signature-Timestamp');

        const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
        if (!isValidRequest) {
            res.status(401).send('Bad request signature')
            throw new Error('Bad request signature');
        };

    };

};

export async function DiscordRequest(endpoint: string, options:any) {

    const url = 'https://discord.com/api/v10/' + endpoint;

    if (options.body) options.body = JSON.stringify(options.body);
    

    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.Token}`,
            'Content-Type': 'application/json; charset=UTF-8',
        },
        ...options
    });

    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }

    return res;
    
};