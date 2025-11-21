# Kalon-Itenere

---

Este proyecto contiene la lógica de backend, frontend, base de datos y documentación para el sistema **Kalon-Itenere**.

--

## 📂 Estructura del proyecto

```text
Kalon-Itenere/
├── backend/                 # Lógica del lado del servidor
│   ├── main.py              # Archivo principal del backend en Python (gestiona rutas, lógica de negocio)
│   └── scripts.js           # Scripts en JavaScript (pueden ser para automatización, utilidades o integración con el frontend)
│
├── bd/                      # Base de datos y scripts SQL
│   └── bdkalon.sql          # Script para crear la base de datos, tablas y datos iniciales
│
├── docs/                    # Documentación del proyecto
│   └── Informe_AnalisisDiseno.pdf   # Documento con el análisis y diseño del sistema (diagrama, requerimientos, etc.)
│
├── frontend/                # Interfaz de usuario (lo que ve el cliente)
│   └── Index.html           # Página principal del frontend
│
└── README.md                # Descripción general del proyecto, cómo instalarlo y ejecutarlo
```

## 📖 Documentación

La documentación del análisis y diseño se encuentra en:
```
docs/Informe_AnalisisDiseno.pdf
```

---


### Download dependencies

```
1. cd frontend/

2. npm i

3. npm install --save @fortawesome/fontawesome-free

4. npm i axios

5. npm install react-router-dom

6. npm install emailjs-com

7. npm install @emailjs/browser

8. npm audit fix 

---------------------------------------------------

1. cd backend/

2. npm i

3. npm i prisma --save-dev

4. npm i @prisma/cli

5. npm install bcrypt

6. npm install --save-dev @types/bcrypt

7. npm install @nestjs/jwt passport-jwt bcrypt

8. npm install @nestjs/typeorm typeorm mysql2

9. npm install @nestjs/config

10. npm i -D ts-nod

11. npm install @nestjs/serve-static

12. npm install @types/multer

13. npm install nodemailer @nestjs-modules/mailer

14. npm install resend

```

Personal-Software-Process
About this repository
Repository to store my solutions for the Personal Software Process assignments.

Materials used to do the PSP assignments
PSP: A Self-Improvement Process for Software Engineers;
The Personal Software Process Body of Knowledge, Version 2.0
Self-Study PSP Material
About the PSP (according to wikipedia)
The Personal Software Process (PSP) is a structured software development process that is intended (planned) to help software engineers better understand and improve their performance by tracking their predicted and actual development of code. The PSP was created by Watts Humphrey to apply the underlying principles of the Software Engineering Institute's (SEI) Capability Maturity Model (CMM) to the software development practices of a single developer. It claims to give software engineers the process skills necessary to work on a team software process (TSP) team.

Objectives
The PSP aims to provide software engineers with disciplined methods for improving personal software development processes. The PSP helps software engineers to:

Improve their estimating and planning skills.
Make commitments they can keep.
Manage the quality of their projects.
Reduce the number of defects in their work.
PSP structure
PSP training follows an evolutionary improvement approach: an engineer learning to integrate the PSP into his or her process begins at the first level – PSP0 – and progresses in process maturity to the final level – PSP2.1. Each Level has detailed scripts, checklists and templates to guide the engineer through required steps and helps the engineer improve his own personal software process. Humphrey encourages proficient engineers to customise these scripts and templates as they gain an understanding of their own strengths and weaknesses.

Process
The input to PSP is the requirements; requirements document is completed and delivered to the engineer.

PSP0, PSP0.1 (Introduces process discipline and measurement)
PSP0 has 3 phases: planning, development (design, coding,Compile,test) and a post mortem. A baseline is established of current process measuring: time spent on programming, faults injected/removed, size of a program. In a post mortem, the engineer ensures all data for the projects has been properly recorded and analysed. PSP0.1 advances the process by adding a coding standard, a size measurement and the development of a personal process improvement plan (PIP). In the PIP, the engineer records ideas for improving his own process.

PSP1, PSP1.1 (Introduces estimating and planning)
Based upon the baseline data collected in PSP0 and PSP0.1, the engineer estimates how large a new program will be and prepares a test report (PSP1). Accumulated data from previous projects is used to estimate the total time. Each new project will record the actual time spent. This information is used for task and schedule planning and estimation (PSP1.1).

PSP2, PSP2.1 (Introduces quality management and design)
PSP2 adds two new phases: design review and code review. Defect prevention and removal of them are the focus at the PSP2. Engineers learn to evaluate and improve their process by measuring how long tasks take and the number of defects they inject and remove in each phase of development. Engineers construct and use checklists for design and code reviews. PSP2.1 introduces design specification and analysis techniques

The importance of data
One of the core aspects of the PSP is using historical data to analyze and improve process performance. PSP data collection is supported by four main elements:

Scripts.
Measures.
Standards.
Forms.
The PSP scripts provide expert-level guidance to following the process steps and they provide a framework for applying the PSP measures. The PSP has four core measures:

Size – the size measure for a product part, such as lines of code (LOC).
Effort – the time required to complete a task, usually recorded in minutes.
Quality – the number of defects in the product.
Schedule – a measure of project progression, tracked against planned and actual completion dates.
Applying standards to the process can ensure the data is precise and consistent. Data is logged in forms, normally using a PSP software tool. The SEI has developed a PSP tool and there are also open source options available, such as Process Dashboard. The key data collected in the PSP tool are time, defect, and size data – the time spent in each phase; when and where defects were injected, found, and fixed; and the size of the product parts. Software developers use many other measures that are derived from these three basic measures to understand and improve their performance. Derived measures include:

estimation accuracy (size/time)
prediction intervals (size/time)
time in phase distribution
defect injection distribution
defect removal distribution
productivity
reuse percentage
cost performance index
planned value
earned value
predicted earned value
defect density
defect density by phase
defect removal rate by phase
defect removal leverage
review rates
process yield
phase yield
failure cost of quality (COQ)
appraisal COQ
appraisal/failure COQ ratio
Planning and tracking
Logging time, defect, and size data is an essential part of planning and tracking PSP projects, as historical data is used to improve estimating accuracy.

The PSP uses the PROxy-Based Estimation (PROBE) method to improve a developer's estimating skills for more accurate project planning. For project tracking, the PSP uses the earned value method.

The PSP also uses statistical techniques, such as correlation, linear regression, and standard deviation, to translate data into useful information for improving estimating, planning and quality. These statistical formulas are calculated by the PSP tool.

Quality
High-quality software is the goal of the PSP, and quality is measured in terms of defects. For the PSP, a quality process should produce low-defect software that meets the user needs.

The PSP phase structure enables PSP developers to catch defects early. By catching defects early, the PSP can reduce the amount of time spent in later phases, such as Test.

The PSP theory is that it is more economical and effective to remove defects as close as possible to where and when they were injected, so software engineers are encouraged to conduct personal reviews for each phase of development. Therefore, the PSP phase structure includes two review phases:

Design Review.
Code Review.
To do an effective review, you need to follow a structured review process. The PSP recommends using checklists to help developers to consistently follow an orderly procedure.

The PSP follows the premise that when people make mistakes, their errors are usually predictable, so PSP developers can personalize their checklists to target their own common errors. Software engineers are also expected to complete process improvement proposals, to identify areas of weakness in their current performance that they should target for improvement. Historical project data, which exposes where time is spent and defects introduced, help developers to identify areas to improve.

PSP developers are also expected to conduct personal reviews before their work undergoes a peer or team review.

✍️ Autores: 

**Jose David Leon**

**Jhon Freddy Paez**

**Juan Diego Rodriguez**

**Angie Julith Coronado**
