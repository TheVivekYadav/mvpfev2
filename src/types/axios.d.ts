// src/types/axios.d.ts
import 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean; // Add our custom property to the interface
    }
}