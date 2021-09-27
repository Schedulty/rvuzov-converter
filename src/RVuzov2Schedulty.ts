import fetch from 'node-fetch';
import { Faculty, SchedultyClient } from '@schedulty/client';
import { Converter } from './Converter';

/**
 * 
 * @param apiUrl сслыка на расписание в формате rvuzov
 * @param schedultyToken ключ доступа Schedulty
 * @param raw middleware для обработки сырого расписания 
 * @param converted middleware для обработки конвертированного расписания
 * @returns результат операции
 */
export async function RVuzov2Schedulty(
    apiUrl: string,
    schedultyToken: string,
    raw: (x: any) => any = null,
    converted: (x: Faculty[]) => Faculty[] = null,
): Promise<boolean> {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Cant get schedule');
    }
    let original = await response.json();

    if (raw) {
        original = raw(original);
    }

    let schedule: Faculty[] = Converter.convert(original);

    if (converted) {
        schedule = converted(schedule);
    }

    const schedulty: SchedultyClient = new SchedultyClient(schedultyToken);
    return schedulty.setSchedule({ schedule });
}