import { Faculty } from '@schedulty/client';

export class Converter {
    public static convert(original: any): Faculty[] {
        const faculties: Faculty[] = original.faculties.map((faculty) => {
            faculty.groups = faculty.groups.map((group) => {
                group.lessons = group.lessons.map((lesson) => {
                    lesson.time = {
                        start: this.convertTime(lesson.time.start),
                        end: this.convertTime(lesson.time.end),
                    }
                    lesson.date = {
                        start: this.convertDate(lesson.date.start),
                        end: this.convertDate(lesson.date.end),
                    }
                    lesson.audiences = lesson.audiences.map((audience) => audience.name);
                    lesson.teachers = lesson.teachers.map((teacher) => teacher.name);
                    return lesson;
                });
                return group;
            })
            return faculty;
        });
        return faculties;
    }

    public static convertTime(original: string): string {
        return original.substring(0, 5);
    }

    public static convertDate(original: string): string {
        return original.split('.').reverse().join('-');
    }
}