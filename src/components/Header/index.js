import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import React, { useState } from 'react';
import {
  EuiHeader,
  EuiHeaderLogo,
  EuiSwitch,
  EuiSpacer,
} from '@elastic/eui';

export default function Header() {
  const [position, setPosition] = useState('static');

  const sections = [
    {
      items: [<EuiHeaderLogo>Elastic</EuiHeaderLogo>],
      borders: 'right',
    },
  ];

  return (
    <>
      <EuiSwitch
        label={'Make header fixed position'}
        checked={position === 'fixed'}
        onChange={(e) => setPosition(e.target.checked ? 'fixed' : 'static')}
      />
      <EuiSpacer />
      <EuiHeader position={position} sections={sections} />
    </>
  );
};