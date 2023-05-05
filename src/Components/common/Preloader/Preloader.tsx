import React from 'react';
import { Space, Spin } from 'antd';
//@ts-ignore
import preloader from '../../../assets/images/preloader.gif';

const Preloader: React.FC = () => {
    return (<Space size="middle">
        <Spin size="large" tip="Loading..."/>
    </Space>

    )
}

export default Preloader;