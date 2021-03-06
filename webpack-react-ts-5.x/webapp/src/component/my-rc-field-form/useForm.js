import { useRef } from 'react';

// 状态管理库 财务部门
class FormStore {
    constructor() {
        this.store = {}; //状态管理库
        this.fieldEntities = [];
        this.callbacks = {};
    }

    setCallbacks = callbacks => {
        this.callbacks = {
            ...this.callbacks,
            ...callbacks
        };
    };

    // 注册实例
    registerFieldEntities = entity => {
        this.fieldEntities.push(entity);
        return () => {
            this.fieldEntities = this.fieldEntities.filter(_entity => _entity !== entity);
            delete this.store[entity.props.name];
        };
    };

    // 返回状态值
    getFieldValue = name => {
        return this.store[name];
    };

    getFieldsValue = () => {
        return { ...this.store };
    };

    // 设置状态值
    // key value
    setFieldsValue = newStore => {
        // 1. 更新状态管理库
        this.store = {
            ...this.store,
            ...newStore
        };

        // 2. 让组件更新
        this.fieldEntities.forEach(entity => {
            Object.keys(newStore).forEach(k => {
                if (k === entity.props.name) {
                    entity.onStoreChange();
                }
            });
        });
    };

    // 校验
    validate = () => {
        const err = [];
        this.fieldEntities.forEach(entity => {
            const rules = entity.props.rules;
            const rule = rules && rules[0];
            const name = entity.props.name;
            const value = this.getFieldValue(name);
            if ((rule && rule.required && value === undefined) || value === '') {
                err.push({
                    [name]: rule
                });
            }
        });

        // todo

        return err;
    };

    // 提交
    submit = () => {
        // 1. validate
        const err = this.validate();

        // 2.  onFinish, onFinishFailed
        const { onFinish, onFinishFailed } = this.callbacks;
        if (err.length === 0) {
            onFinish(this.getFieldsValue());
        } else {
            onFinishFailed(err, this.getFieldsValue());
        }
    };

    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            setFieldsValue: this.setFieldsValue,
            registerFieldEntities: this.registerFieldEntities,
            setCallbacks: this.setCallbacks,
            submit: this.submit
        };
    };
}

export default function useForm(form) {
    const formRef = useRef();
    console.log('haha', formRef.current);
    if (!formRef.current) {
        if (form) {
            console.log('hehe', formRef.current);
            formRef.current = form;
        } else {
            console.log('heihei', formRef.current);
            const formStore = new FormStore();
            formRef.current = formStore.getForm();
        }
    }

    return [formRef.current];
}
