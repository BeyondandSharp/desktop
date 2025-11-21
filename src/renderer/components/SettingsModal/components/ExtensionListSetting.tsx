// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect, useState} from 'react';

import './ExtensionListSetting.scss';

export default function ExtensionListSetting({
    id,
    onSave,
    label,
    subLabel,
    value: propValue,
    placeholder,
}: {
    id: string;
    onSave: (key: string, value: string[]) => void;
    label: React.ReactNode;
    subLabel?: React.ReactNode;
    value: string[];
    placeholder?: string;
}) {
    const [value, setValue] = useState<string>(propValue?.join(', ') || '');

    // 当 propValue 变化时更新显示值
    useEffect(() => {
        if (propValue && propValue.length > 0) {
            setValue(propValue.join(', '));
        }
    }, [propValue]);

    const handleBlur = () => {
        // 将逗号分隔的字符串转换为数组,并去除空白
        const extensions = value.
            split(',').
            map((ext) => ext.trim().toLowerCase()).
            filter((ext) => ext.length > 0);
        
        onSave(id, extensions);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className='ExtensionListSetting'>
            <h3 className='ExtensionListSetting__heading'>
                {label}
            </h3>
            {subLabel && <div className='ExtensionListSetting__label'>
                {subLabel}
            </div>}
            <input
                id={`extensionListSetting_${id}`}
                className='ExtensionListSetting__input'
                type='text'
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
            />
        </div>
    );
}
