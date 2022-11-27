import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineLinkedin, AiOutlineMail, AiTwotonePhone, AiOutlineCalendar, AiOutlineGithub } from 'react-icons/ai';
import { z } from 'zod';

import { cloneDeep, obscureData } from '@/utils/utils';

const schema = z.object({
  contact: z.object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    email: z.string(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    summary: z.string()
  }),
  experiences: z.array(
    z.object({
      companyName: z.string(),
      companyWebsite: z.string(),
      title: z.string(),
      workingPeriod: z.string(),
      descriptions: z.array(z.string())
    })
  ),
  educations: z.array(z.object({ schoolName: z.string(), major: z.string(), year: z.string().optional() })).optional(),
  technicalSkills: z.array(z.string()),
  projects: z.array(z.object({ name: z.string(), description: z.string() })).optional()
});

const obscureKeys = process.env.OBSCURE_KEYS;
const apiKey = process.env.API_AUTHENTICATION_KEY;
const resumeDataEndpoint = process.env.RESUME_CONTENT_URL;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const password = context.query.p;
  let resume;

  if (process.env.NODE_ENV === 'production') {
    if (resumeDataEndpoint == null || resumeDataEndpoint === '') {
      throw new Error('"RESUME_CONTENT_URL" is not valid!');
    }

    const response = await fetch(resumeDataEndpoint);
    if (!response.ok) {
      throw new Error(`Endpoint "${resumeDataEndpoint}" is not valid!`);
    }
    const resumeData = await response.json();

    const result = schema.safeParse(resumeData);

    if (!result.success) {
      console.log(result.error.format());
      throw new Error(`Invalid Schema, please check response from "${resumeDataEndpoint}" !`);
    }

    resume = cloneDeep(resumeData);
  } else {
    const resumeData = require('../../lib/data/resume.json');

    const result = schema.safeParse(resumeData);

    if (!result.success) {
      console.log(result.error.format());
      throw new Error(`Invalid Schema, please check "lib/data/resume.json" !`);
    }

    resume = cloneDeep(resumeData);
  }

  if (process.env.NODE_ENV === 'production' && password !== apiKey) {
    resume = obscureData(resume, obscureKeys.split(';'));
  }

  return {
    props: {
      resume
    }
  };
};

const Home: NextPage<{ resume: z.infer<typeof schema> }> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { contact, experiences, educations, technicalSkills, projects } = props.resume;

  function handleDownload() {
    const password = window.prompt('Input password');
    if (password != null && password !== '') {
      setLoading(true);
      router.push(`/api/pdf?p=${password}`);
    }
  }

  function handlePreview() {
    const password = window.prompt('Input password');
    if (password != null && password !== '') {
      window.location.href = `/?p=${password}`;
    }
  }

  return (
    <div className="w-full">
      <div className="w-[210mm] py-3 mb-3 mx-auto border-stone-300 flex gap-2 print:hidden">
        <button
          onClick={handlePreview}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semi py-2 px-4 rounded w-full transition-all disabled:bg-blue-700"
        >
          Preview
        </button>
        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semi py-2 px-4 rounded w-full transition-all disabled:bg-blue-700"
        >
          Download
        </button>
      </div>
      <div id="resume" className="w-[210mm] py-9 mx-auto border-stone-300 print:block bg-white">
        <div className="relative z-10 px-10">
          <section className="mb-5 top-0">
            <h1 className="text-4xl font-bold mb-1.5">
              {contact.firstName} {contact.lastName}
            </h1>
            <div className="flex text-xs font-semibold gap-x-6 gap-y-2 flex-wrap">
              <a href={'tel:' + contact.phone.replace(/\s/g, '')} className="flex items-center gap-1.5">
                <AiTwotonePhone className="text-blue-500" />
                <span>{contact.phone}</span>
              </a>
              <a href={'mailto:' + contact.email} className="flex items-center gap-1.5">
                <AiOutlineMail className="text-blue-500" />
                <span>{contact.email}</span>
              </a>
              {contact.linkedin && (
                <a href={contact.linkedin} className="flex items-center gap-1.5">
                  <AiOutlineLinkedin className="text-blue-500" />
                  <span>{contact.linkedin}</span>
                </a>
              )}
              {contact.github && (
                <a href={contact.github} className="flex items-center gap-1.5">
                  <AiOutlineGithub className="text-blue-500" />
                  <span>{contact.github}</span>
                </a>
              )}
            </div>
          </section>
          <section className="flex gap-5">
            <section className="basis-7/12 flex flex-col gap-4">
              <section className="text-sm space-y-1">
                <h2 className="text-2xl font-bold border-b-2 border-black text-black">SUMMARY</h2>
                <p>{contact.summary}</p>
              </section>
              <section className="text-sm space-y-1">
                <h2 className="text-2xl font-bold border-b-2 border-black text-black">PROFESSIONAL EXPERIENCE</h2>
                <div className="divide-y divide-dashed divide-slate-300 flex flex-col">
                  {experiences.map((experience, index: number) => (
                    <section key={index} className="first:pt-0 py-3">
                      <h3 className="text-xl font-semibold">{experience.title}</h3>
                      <h4 className="font-semibold text-blue-500">
                        {experience.companyWebsite ? (
                          <a href={experience.companyWebsite}>{experience.companyName}</a>
                        ) : (
                          experience.companyName
                        )}
                      </h4>
                      <div className="flex gap-1 text-xs text-slate-500 items-center py-0.5">
                        <AiOutlineCalendar />
                        <span>{experience.workingPeriod}</span>
                      </div>
                      <ul className="list-disc ml-5">
                        {experience.descriptions.map((description: string, idx) => (
                          <li key={idx}>{description}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </section>
              {educations && educations.length > 0 && (
                <section className="text-sm space-y-1">
                  <h2 className="text-2xl font-bold border-b-2 border-black text-black">EDUCATION</h2>
                  <div className="divide-y divide-dashed divide-slate-300 flex flex-col">
                    {educations.map((education, index: number) => (
                      <section key={index}>
                        <h3 className="text-xl font-semibold">{education.major}</h3>
                        <h4 className="font-semibold text-blue-500">
                          <a>{education.schoolName}</a>
                        </h4>
                        {education.year && (
                          <div className="flex gap-1 text-xs text-gray-500 items-center py-0.5">
                            <AiOutlineCalendar />
                            <span>{education.year}</span>
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                </section>
              )}
            </section>
            <section className="basis-5/12 flex flex-col gap-4">
              <section className="text-sm space-y-1">
                <h2 className="text-2xl font-bold border-b-2 border-black text-black">TECHNICAL SKILLS</h2>
                <div className="divide-y space-y-1 divide-dashed divide-slate-300">
                  <section className="flex gap-2 flex-wrap mt-2 mr-2 font-semibold text-xs">
                    {technicalSkills.map((skill: string) => (
                      <span key={skill} className="border border-gray-400 px-2 py-1">
                        {skill}
                      </span>
                    ))}
                  </section>
                </div>
              </section>
              {projects && projects.length > 0 && (
                <section className="text-sm space-y-1">
                  <h2 className="text-2xl font-bold border-b-2 border-black text-black">PROJECTS</h2>
                  <div className="divide-y space-y-1 divide-dashed divide-slate-300">
                    {projects.map((project) => (
                      <section key={project.name} className="first:pt-0 py-3">
                        <h2 className="font-semibold text-base text-blue-500">{project.name}</h2>
                        <p className="mr-2">{project.description}</p>
                      </section>
                    ))}
                  </div>
                </section>
              )}
            </section>
          </section>
          <footer className="text-center text-sm text-gray-500 py-1 border border-dashed border-gray-400 mt-10">
            Generate with{' '}
            <a href="https://github.com/hendryfoe/nextjs-resume">https://github.com/hendryfoe/nextjs-resume</a>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
