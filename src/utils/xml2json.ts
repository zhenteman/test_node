import * as xml2js from 'xml2js';
import * as xml2json from 'xml2json';

const buildXML = (obj, rootName = 'xml') => {
    const opt = {
        xmldec: null,
        rootName,
        allowSurrogateChars: true,
        cdata: true,
    };

    return new xml2js.Builder(opt).buildObject(obj);
};

const replyData = (msg) =>
    buildXML(
        msg
            ? { return_code: 'FAIL', return_msg: msg }
            : { return_code: 'SUCCESS' },
    );

const toJson = (data) => {
    try {
        const json = xml2json.toJson(data);
        return JSON.parse(json);
    } catch (e) {
        return false;
    }
};

export default {
    toJson,
    replyData,
};
