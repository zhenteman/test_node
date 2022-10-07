import PluginsModule from './plugins/index.module';
import OperationsModule from './operations/index.module';

export default [...OperationsModule, ...PluginsModule];
