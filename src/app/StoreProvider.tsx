'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef(makeStore());

    return <Provider store={storeRef.current}>{children}</Provider>;
}
