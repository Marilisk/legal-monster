import React from 'react';
import { LeftNavigationBar } from '../Staff/StaffNavigation/LeftNavigationBar';
import c from './SettingsContainer.module.scss'
import { Route, Routes } from 'react-router-dom';
import PipelineEditor from './PipelineEditor/PipelineEditor';
import CommonSettings from './CommonSettings/CommonSettings';

const SettingsContainer = () => {


    const settingsNavigationBtns = [
        { title: 'общие', link: '/settings' },
        { title: 'воронка продаж', link: '/settings/salespipeline', },
    ]

    return (
        <div className={c.wrap}>

            <LeftNavigationBar items={settingsNavigationBtns} />

            <div>
                <Routes>
                    <Route path='/' element={<CommonSettings />} />
                    <Route path='/salespipeline' element={<PipelineEditor />} />
                </Routes>
            </div>

        </div>
    );
};

export default SettingsContainer;