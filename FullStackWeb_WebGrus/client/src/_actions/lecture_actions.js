import axios from 'axios';
import {
    REGISTER_LECTURE
} from './types';
import { LECTURE_SERVER } from '../components/Config.js';

export function registerLecture(dataToSubmit) {
    const request = axios.post(`${LECTURE_SERVER}/uploadLecture`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_LECTURE,
        payload: request
    }
}
