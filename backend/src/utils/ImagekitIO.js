import ImageKit from 'imagekit';
import dotenv from 'dotenv';
dotenv['config']({ 'path': '.env' });

let imagekit = null;

if (process['env']['IMAGEKIT_PUBLICKEY'] && process['env']['IMAGEKIT_PRIVATEKEY'] && process['env']['IMAGEKIT_URLENDPOINT']) {
    imagekit = new ImageKit({
        'publicKey': process['env']['IMAGEKIT_PUBLICKEY'],
        'privateKey': process['env']['IMAGEKIT_PRIVATEKEY'],
        'urlEndpoint': process['env']['IMAGEKIT_URLENDPOINT']
    });
}

export default imagekit;