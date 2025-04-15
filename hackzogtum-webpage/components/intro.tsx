import Image from 'next/image'
import Link from 'next/link'
import ICAL from "ical.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhotoVideo, faInfoCircle, faCodeBranch, faAddressBook, faUserSecret } from "@fortawesome/free-solid-svg-icons"; 
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';



export default function Intro() {

  const [nextEvent, setNextEvent] = useState<string | null>(null);
  useEffect(() => {
    fetch('https://cumulus.hackzogtum-coburg.de/remote.php/dav/public-calendars/YdJDi9ik8jRABobq/?export')
    .then(response => response.text())
    .then(icsData => {
      // Use ical.js or a parser to read .ics
      const jcalData = ICAL.parse(icsData);
      const comp = new ICAL.Component(jcalData);
      const events = comp.getAllSubcomponents("vevent");

      var nextEvent = events
        .map(e => {
          return new ICAL.Event(e)
        })
        .filter(e => {
          return Date.parse(e.startDate) > Date.now()
        })
        .sort((a,b) => {
          return b.startDate - a.startDate
        })[0]

      setNextEvent(`${nextEvent.summary} am ${new Date(Date.parse(nextEvent.startDate)).toLocaleString("de-DE")} Uhr`);
    })
    .catch(err => { setNextEvent("error"); console.error('Failed to load calendar:', err)});
  })

  const [data, setData] = useState<{
    open: any; api: string, sensors: any, next_open: string
} | null>(null);

  useEffect(() => {
    fetch('https://spaceapi.hackzogtum-coburg.de/')
      .then((response) => response.json())
      .then((data) => {
//        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error('Fehler bei der API-Anfrage:', error);
      });
  }, []);


  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 headBorder">
      <a className="hiddenLink" rel="me" href="https://chaos.social/@Hackzogtum">Mastodon</a>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <div className="topLogo">
          <Image
            src={data != null && data?.open ? '/images/open.gif' : '/images/logo.png'}
            alt="Logo of hackzogtum"
            width={280}
            height={150}
          />
        </div>
      </h1>

      {data && (
        <div className='m-10 grow'>
          <p style={{color: "#00ff00"}}>Die Space Tür ist <span style={{ color: data.open ? '#00ff00' : '#ff0000' }}>{data.open ? 'offen' : 'geschlossen'}</span>.</p>
          <div className='flex flex-row justify-items-start'>
            <div className='mr-1' style={{color: "#00ff00"}}>Anwesend: </div>
            {data.sensors["in space"].map((item: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => (
              <div className='mr-1' style={{color: "#008000"}} key={index}><h1>{item}{index !== data.sensors["in space"].length - 1 && <span>, </span>}</h1></div>
            ))}
          </div>
          <p style={{color: "#00ff00"}}>Nächstes Event: {nextEvent}</p>
          <p style={{color: "#00ff00"}}><a href="https://cumulus.hackzogtum-coburg.de/apps/calendar/p/YdJDi9ik8jRABobq">Eventkalender</a></p>

        </div>
      )}


      <h4 className="menuBtns">
        <div className="btnCluster">
          {' '}
          <Link
            href="/"
            className="underline hover:text-success duration-200 transition-colors"
            title="Home">

            <div className="btn-menu">
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
            </div>

          </Link>

          {' '}
          <Link
            href="/media"
            className="underline hover:text-success duration-200 transition-colors"
            title="Media">

            <div className="btn-menu">
            <FontAwesomeIcon icon={faPhotoVideo}></FontAwesomeIcon>
            </div>

          </Link>
        </div>

        <div className="btnCluster">
          {' '}
          <Link
            href="/info"
            className="underline hover:text-success duration-200 transition-colors"
            title="Info">

            <div className="btn-menu">
            <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
            </div>

          </Link>

          {' '}
          <Link
            href="/kontakt"
            className="underline hover:text-success duration-200 transition-colors"
            title="Kontakt">

            <div className="btn-menu">
            <FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>
            </div>

          </Link>
        </div>

        <div className="btnCluster">
          {' '}
          <a href="https://github.com/Hackzogtum-Coburg" 
          className="underline hover:text-success duration-200 transition-colors" 
          target="_blank" 
          title="Github Profile"
          rel="noreferrer">
            <div className="btn-menu">
            <FontAwesomeIcon icon={faCodeBranch}></FontAwesomeIcon>
            </div>
          </a>

          {' '}
          <Link
            href="/impressum"
            className="underline hover:text-success duration-200 transition-colors"
            title="Impressum">

            <div className="btn-menu">
            <FontAwesomeIcon icon={faUserSecret}></FontAwesomeIcon>
            </div>

          </Link>
        </div>
      </h4>
    </section>
  )
}
