import NAMES_MAP from '../analytics/transaction.name';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const apm = require('elastic-apm-node').start({
    serviceName: 'Shoudeng',
    secretToken: '',
    serverUrl: 'http://localhost:8200',
    environment: 'production',
});

const setTransactionName = (context, exception?) => {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const transaction = {
        protocol: context.getType().toLocaleUpperCase(),
        path: request.path,
        method: request.method,
    };

    const custom = {
        class_name: context?.getClass()?.name || '无',
        handler: context?.getHandler()?.name || '无',
        body: response.body || '无',
    };

    const pathData = NAMES_MAP[transaction.path];
    const path = transaction.path.split('/').join('');
    let name = '';

    if (!pathData) {
        name = `未定义路径 | ${path}`;
    } else {
        name = pathData[transaction.method];
        if (!name) {
            name = `未定义类型 | ${path}`;
        }

        if (path) {
            name = `${name} | ${path}`;
        }
    }

    const transactionName = [transaction.protocol, transaction.method, name];

    if (exception) {
        transactionName.push(exception.statusCode);
        apm.addLabels({
            name: exception.name,
            message: exception.message,
            stack: exception.stack,
        });
    } else {
        transactionName.push(response.statusCode);
    }

    apm.setTransactionName(transactionName.join(' -> '));
    apm.addLabels(custom);
};

const setTransactionError = (e) => apm.captureError(e);

export default {
    setTransactionName,
    setTransactionError,
};
