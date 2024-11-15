interface EducationEntry {
    degree: string;
    school: string;
    graduationYear: string;
}

interface ExperienceEntry {
    jobTitle: string;
    company: string;
    workDates: string;
    jobDescription: string;
}

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    address: string;
    education: EducationEntry[];
    experience: ExperienceEntry[];
    skills: string;
}

class DynamicResumeBuilder {
    private form: HTMLFormElement;
    private outputElement: HTMLElement;
    private templateSelector: HTMLSelectElement;
    private addEducationButton: HTMLButtonElement;
    private addExperienceButton: HTMLButtonElement;

    constructor() {
        this.form = document.getElementById('resumeForm') as HTMLFormElement;
        this.outputElement = document.getElementById('resumeOutput') as HTMLElement;
        this.templateSelector = document.getElementById('template') as HTMLSelectElement;
        this.addEducationButton = document.getElementById('addEducation') as HTMLButtonElement;
        this.addExperienceButton = document.getElementById('addExperience') as HTMLButtonElement;

        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.templateSelector.addEventListener('change', this.updateTemplate.bind(this));
        this.addEducationButton.addEventListener('click', this.addEducationField.bind(this));
        this.addExperienceButton.addEventListener('click', this.addExperienceField.bind(this));
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();
        const data = this.getFormData();
        this.renderResume(data);
    }

    private getFormData(): ResumeData {
        const educationEntries = Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
            degree: (entry.querySelector('.degree') as HTMLInputElement).value,
            school: (entry.querySelector('.school') as HTMLInputElement).value,
            graduationYear: (entry.querySelector('.graduationYear') as HTMLInputElement).value
        }));

        const experienceEntries = Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
            jobTitle: (entry.querySelector('.jobTitle') as HTMLInputElement).value,
            company: (entry.querySelector('.company') as HTMLInputElement).value,
            workDates: (entry.querySelector('.workDates') as HTMLInputElement).value,
            jobDescription: (entry.querySelector('.jobDescription') as HTMLTextAreaElement).value
        }));

        return {
            name: (document.getElementById('name') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            phone: (document.getElementById('phone') as HTMLInputElement).value,
            address: (document.getElementById('address') as HTMLInputElement).value,
            education: educationEntries,
            experience: experienceEntries,
            skills: (document.getElementById('skills') as HTMLInputElement).value,
        };
    }

    private renderResume(data: ResumeData): void {
        const personalInfo = document.getElementById('personalInfo') as HTMLElement;
        const educationInfo = document.getElementById('educationInfo') as HTMLElement;
        const workExperience = document.getElementById('workExperience') as HTMLElement;
        const skillsInfo = document.getElementById('skillsInfo') as HTMLElement;

        personalInfo.innerHTML = `
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Address:</strong> ${data.address}</p>
        `;

        educationInfo.innerHTML = `
            <h3>Education</h3>
            ${data.education.map(edu => `
                <div>
                    <p><strong>Degree:</strong> ${edu.degree}</p>
                    <p><strong>School/University:</strong> ${edu.school}</p>
                    <p><strong>Graduation Year:</strong> ${edu.graduationYear}</p>
                </div>
            `).join('')}
        `;

        workExperience.innerHTML = `
            <h3>Work Experience</h3>
            ${data.experience.map(exp => `
                <div>
                    <p><strong>Job Title:</strong> ${exp.jobTitle}</p>
                    <p><strong>Company:</strong> ${exp.company}</p>
                    <p><strong>Work Dates:</strong> ${exp.workDates}</p>
                    <p><strong>Job Description:</strong> ${exp.jobDescription}</p>
                </div>
            `).join('')}
        `;

        skillsInfo.innerHTML = `
            <h3>Skills</h3>
            <p>${data.skills.split(',').map(skill => skill.trim()).join(', ')}</p>
        `;
    }

    private updateTemplate(): void {
        const selectedTemplate = this.templateSelector.value;
        this.outputElement.className = `resume-output ${selectedTemplate}`;
    }

    private addEducationField(): void {
        const educationFields = document.getElementById('educationFields') as HTMLElement;
        const newField = document.createElement('div');
        newField.className = 'education-entry';
        newField.innerHTML = `
            <input type="text" class="degree" placeholder="Degree" required>
            <input type="text" class="school" placeholder="School/University" required>
            <input type="text" class="graduationYear" placeholder="Graduation Year" required>
        `;
        educationFields.appendChild(newField);
    }

    private addExperienceField(): void {
        const experienceFields = document.getElementById('experienceFields') as HTMLElement;
        const newField = document.createElement('div');
        newField.className = 'experience-entry';
        newField.innerHTML = `
            <input type="text" class="jobTitle" placeholder="Job Title" required>
            <input type="text" class="company" placeholder="Company" required>
            <input type="text" class="workDates" placeholder="Work Dates" required>
            <textarea class="jobDescription" placeholder="Job Description" required></textarea>
        `;
        experienceFields.appendChild(newField);
    }
}

// Initialize the DynamicResumeBuilder when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicResumeBuilder();
});