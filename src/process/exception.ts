import { create } from 'domain';
import APM from '../service/apm';

const listen = create();
listen.on('error', (err) => {
    APM.setTransactionError(err);
});

export default listen;
