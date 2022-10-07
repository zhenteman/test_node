import * as stream from 'stream';

export const customOssDir = async (file, dir, desc) => {
    let name = file.originalname;
    name = name.split('.');
    if (!name.length) {
        return;
    }

    let type = name[name.length - 1];
    const timestamp = Date.now();
    const headers = {};

    if (type === 'mp3' || type === 'wav') {
        headers['content-type'] = 'audio/mp3';
        type = 'mp3';
    }
    if (type === 'mp4') {
        headers['content-type'] = 'audio/mp4';
    }

    const url = `${dir}/${desc}/${timestamp}.${type}`;
    const bufferStream = new stream.PassThrough();
    const reader = bufferStream.end(file.buffer);

    return {
        url,
        reader,
        options: {
            headers,
        },
    };
};
