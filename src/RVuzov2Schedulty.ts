import fetch from 'node-fetch';
import { Faculty, SchedultyClient } from '@schedulty/client';
import { Converter } from './Converter';

export async function RVuzov2Schedulty(
    apiUrl: string,
    schedultyToken: string,
    middleware: (x: any) => any = null,
): Promise<boolean> {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Cant get schedule');
    }
    let original = await response.json();

    if (middleware) {
        original = middleware(original);
    }

    const schedule: Faculty[] = Converter.convert(original);
    const schedulty: SchedultyClient = new SchedultyClient(schedultyToken);
    await schedulty.setSchedule({ schedule });

    return true;
}