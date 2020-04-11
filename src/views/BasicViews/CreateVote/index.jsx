import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import StepForm from './components/StepForm';

const { Cell } = ResponsiveGrid;

const FormStep = (props) => (
  <ResponsiveGrid gap={20}>
    <Cell colSpan={12}>
      <StepForm goBackMain={() => {
        props.history.push('/basic/main');
      }} />
    </Cell>
  </ResponsiveGrid>
);

export default FormStep;
