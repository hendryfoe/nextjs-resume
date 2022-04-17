import { Background } from '@/components/background';
import type { NextPage } from 'next';
import Head from 'next/head';
import { AiOutlineLinkedin, AiOutlineMail, AiTwotonePhone, AiOutlineCalendar } from 'react-icons/ai';

const Home: NextPage = () => {
  return (
    <div className="w-full">
      <Head>
        <title>My Resume</title>
        <meta name="description" content="My Resume" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="resume" className="w-[210mm] min-h-[297mm] mx-auto mt-10 border-stone-300 print:block bg-white">
        <div className="relative z-10 px-1">
          <section className="mb-4 top-0">
            <h1 className="text-4xl font-bold mb-1.5">HENDRYANTO FUDIKO</h1>
            <div className="flex text-xs font-semibold gap-14">
              <a href="tel:+6287786228706" className="flex items-center gap-1.5">
                <AiTwotonePhone className="text-blue-500" />
                <span>+62 877 8622 8706</span>
              </a>
              <a href="mailto:hendryanto.fudiko@gmail.com" className="flex items-center gap-1.5">
                <AiOutlineMail className="text-blue-500" />
                <span>hendryanto.fudiko@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/hfudiko" className="flex items-center gap-1.5">
                <AiOutlineLinkedin className="text-blue-500" />
                <span>https://www.linkedin.com/in/hfudiko</span>
              </a>
            </div>
          </section>
          <section className="flex gap-5">
            <section className="basis-7/12 flex flex-col gap-4">
              <section className="text-sm space-y-1">
                <h2 className="text-2xl font-bold border-b-2 border-black text-black">SUMMARY</h2>
                <p>
                  Software development engineer with more than 5 years of experience, especially in web development.
                  Enhanced web performance and created tools to boost development productivity. Passionate to build a
                  world class web application.
                </p>
              </section>
              <section className="text-sm space-y-1">
                <h2 className="text-2xl font-bold border-b-2 border-black text-black">PROFESSIONAL EXPERIENCE</h2>
                <div className="divide-y divide-dashed divide-slate-300 flex flex-col">
                  <section className="first:pb-3">
                    <h3 className="text-xl font-semibold">Senior Fullstack Engineer</h3>
                    <h4 className="font-semibold text-blue-500">
                      <a href="https://www.modalrakyat.id">Modal Rakyat - Fazz Financial</a>
                    </h4>
                    <div className="flex gap-1 text-xs text-gray-500 items-center py-0.5">
                      <AiOutlineCalendar />
                      <span>10/2021 - Present</span>
                    </div>
                    <ul className="list-disc ml-4">
                      <li>Develop and maintain Loan Service API</li>
                      <li>Develop Loan Back Office and User Facing web application</li>
                      <li>Develop API and migrated user log-in using SSO</li>
                      <li>Develop and maintain Microservice API</li>
                    </ul>
                  </section>
                  <section className="py-3">
                    <h3 className="text-xl font-semibold">Senior Software Development Engineer</h3>
                    <h4 className="font-semibold text-blue-500">GDP Labs</h4>
                    <div className="flex gap-1 text-xs text-gray-500 items-center py-0.5">
                      <AiOutlineCalendar />
                      <span>08/2016 - 10/2021</span>
                    </div>
                    <ul className="list-disc ml-4">
                      <li>Develop and maintain HR Platform web applications</li>
                      <li>Optimized web application performance</li>
                      <li>Develop and maintain frontend components</li>
                      <li>Develop framework custom web builder</li>
                      <li>Develop action to automate web application workflows</li>
                      <li>Develop cache mechanism to handle over fetching</li>
                      <li>Upgrading web framework</li>
                    </ul>
                  </section>
                  <section className="py-3">
                    <h3 className="text-xl font-semibold">Software Development Engineer</h3>
                    <h4 className="font-semibold text-blue-500">GDP Labs</h4>
                    <div className="flex gap-1 text-xs text-gray-500 items-center py-0.5">
                      <AiOutlineCalendar />
                      <span>08/2015 - 07/2016</span>
                    </div>
                    <ul className="list-disc ml-4">
                      <li>Develop and maintain web applications</li>
                      <li>
                        Develop a web application for check and populate Bank location and resources management data
                        with Google Maps
                      </li>
                      <li>Develop HR Platform web application</li>
                    </ul>
                  </section>
                  <section className="py-3">
                    <h3 className="text-xl font-semibold">Software Development Engineer</h3>
                    <h4 className="font-semibold text-blue-500">Tiket.com</h4>
                    <div className="flex gap-1 text-xs text-gray-500 items-center py-0.5">
                      <AiOutlineCalendar />
                      <span>09/2014 - 07/2015</span>
                    </div>
                    <ul className="list-disc ml-4">
                      <li>Develop and maintain Flight API Service</li>
                      <li>Develop and maintain web applications</li>
                      <li>Develop new product features</li>
                    </ul>
                  </section>
                </div>
              </section>
              <section className="text-sm space-y-1">
                <h2 className="text-2xl font-bold border-b-2 border-black text-black">EDUCATION</h2>
                <div className="divide-y divide-dashed divide-slate-300 flex flex-col">
                  <section>
                    <h3 className="text-xl font-semibold">Bachelor Degree of Information Systems</h3>
                    <h4 className="font-semibold text-blue-500">
                      <a href="https://www.modalrakyat.id">Binus University</a>
                    </h4>
                    <div className="flex gap-1 text-xs text-gray-500 items-center py-0.5">
                      <AiOutlineCalendar />
                      <span>2010 - 2014</span>
                    </div>
                  </section>
                </div>
              </section>
            </section>
            <section className="basis-5/12 flex flex-col gap-4">
              <section className="text-sm space-y-1">
                <h2 className="text-2xl font-bold border-b-2 border-black text-black">TECHNICAL SKILLS</h2>
                <div className="divide-y space-y-1 divide-dashed divide-slate-300">
                  <section className="flex gap-2 flex-wrap mt-2 mr-2 font-semibold text-xs">
                    <span className="border border-gray-400 px-2 py-1">Typescript</span>
                    <span className="border border-gray-400 px-2 py-1">Javascript</span>
                    <span className="border border-gray-400 px-2 py-1">Go</span>
                    <span className="border border-gray-400 px-2 py-1">Angular</span>
                    <span className="border border-gray-400 px-2 py-1">React</span>
                    <span className="border border-gray-400 px-2 py-1">Vue.js</span>
                    <span className="border border-gray-400 px-2 py-1">HTML</span>
                    <span className="border border-gray-400 px-2 py-1">CSS</span>
                    <span className="border border-gray-400 px-2 py-1">GraphQL</span>
                    <span className="border border-gray-400 px-2 py-1">Serverless</span>
                  </section>
                </div>
              </section>
              <section className="text-sm space-y-1">
                <h2 className="text-2xl font-bold border-b-2 border-black text-black">PROJECTS</h2>
                <div className="divide-y space-y-1 divide-dashed divide-slate-300">
                  <section className="first:pb-3">
                    <h2 className="font-semibold text-base text-blue-500">Tanifund.com</h2>
                    <p className="mr-2">
                      Develop frontend web application especially in Projects page using Vue.js and develop bank
                      transfer API
                    </p>
                  </section>
                  <section className="py-3">
                    <h2 className="font-semibold text-base text-blue-500">Kemnaker.go.id</h2>
                    <p className="mr-2">Develop frontend web application using Angular</p>
                  </section>
                </div>
              </section>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
