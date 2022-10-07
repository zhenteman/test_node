import { address } from 'ip';
import 'colors';

export const ServerStartConsole = (port, path) => {
    console.log(
        `Server Start Success --> http://127.0.0.1:${port}`.cyan.underline
            .italic.bold,
    );
    console.log(
        `Server Start Success --> http://${address()}:${port}`.cyan.underline
            .italic.bold,
    );
    console.log(
        `Swagger Server Start Success --> http://${address()}:${port}${path}`
            .cyan.underline.italic.bold,
    );
};
