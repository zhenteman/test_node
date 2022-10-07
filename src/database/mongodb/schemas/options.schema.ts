import { SchemaOptions } from 'mongoose';

class OptionsSchema implements SchemaOptions {
    versionKey: false;
    timestamps: { createdAt: 'created_time'; updatedAt: 'updated_time' };
}

export default new OptionsSchema();
