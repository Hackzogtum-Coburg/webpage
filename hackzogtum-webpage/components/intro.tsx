import Image from 'next/image'
import Link from 'next/link'
import ICAL from "ical.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhotoVideo, faInfoCircle, faCodeBranch, faAddressBook, faUserSecret } from "@fortawesome/free-solid-svg-icons"; 
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';



export default function Intro() {

  interface ResultDate  {
      summary: string;
      startDate: string;
  }

  function getFirstFutureReoccurance(vevent: any) : ResultDate{
    let expand = new ICAL.RecurExpansion({
      component: vevent,
      dtstart: vevent.getFirstPropertyValue('dtstart')
    });
    let next = expand.next();


    while(Date.parse(next.toString()) < Date.now()){
      next = expand.next()
    }
    return {
      summary: vevent.getFirstPropertyValue('summary'),
      startDate: next.toString() 
    };
  }


  const [nextEvent, setNextEvent] = useState<{summary: string, startDate: string}| null>(null);
  useEffect(() => {
    fetch('https://cumulus.hackzogtum-coburg.de/remote.php/dav/public-calendars/YdJDi9ik8jRABobq/?export')
    .then(response => response.text())
    .then(icsData => {
      // Use ical.js or a parser to read .ics
      const jcalData = ICAL.parse(icsData);
      const comp = new ICAL.Component(jcalData);
      const events = comp.getAllSubcomponents("vevent");

      var nextEvent = events
        .map((e : any)=> {
          if(e.getFirstProperty('rrule')){
            return getFirstFutureReoccurance(e)
          }
          return {
            summary: e.getFirstPropertyValue('summary'),
            startDate: e.getFirstPropertyValue('dtstart').toString()
          };
        })
        .filter((e: ResultDate) => {
          return Date.parse(e.startDate) > Date.now()
        })
        .sort((a : ResultDate,b : ResultDate) => {
          return Date.parse(a.startDate) - Date.parse(b.startDate)
        })[0]

      setNextEvent({
        summary: nextEvent.summary,
        startDate: new Date(Date.parse(nextEvent.startDate.toString())).toLocaleString("de-DE")
      });
    })
    .catch(err => { setNextEvent(null); console.error('Failed to load calendar:', err)});
  }, [])

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
          <Link
            href="/"
            className="underline hover:text-success duration-200 transition-colors"
            title="Home">


            <Image
              src={data != null && data?.open ? '/images/open.gif' : '/images/logo.png'}
              alt="Logo of hackzogtum"
              width={280}
              height={150}
            />
          </Link>
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
          {nextEvent && (
            <p style={{color: "#00ff00"}}>Nächstes Event: <span style={{fontWeight: 'bold'}}>{nextEvent.summary}</span> am {nextEvent.startDate} Uhr</p>
          )
          }
          <p style={{color: "#00ff00"}}><a href="https://cumulus.hackzogtum-coburg.de/apps/calendar/p/YdJDi9ik8jRABobq">Eventkalender</a></p>

        </div>
      )}


          { /*
        <div className="btnCluster">
          <Link
            href="/"
            className="underline hover:text-success duration-200 transition-colors"
            title="Home">

            <div className="btn-menu">
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
            </div>

          </Link>

          <Link
            href="/media"
            className="underline hover:text-success duration-200 transition-colors"
            title="Media">

            <div className="btn-menu">
            <FontAwesomeIcon icon={faPhotoVideo}></FontAwesomeIcon>
            </div>

          </Link>
        </div>
          */ }

        <div className="flex flex-row md:flex-col">
          <Link
            href="/info"
            className="underline hover:text-success duration-200 transition-colors"
            title="Info">
            <div class="pl-2 pr-2">Wer&nbsp;sind&nbsp;wir</div>
          </Link>

          <Link
            href="/kontakt"
            className="underline hover:text-success duration-200 transition-colors"
            title="Kontakt">

            <div class="pl-2 pr-2">Kontakt</div>

          </Link>
          <Link
            href="/impressum"
            className="underline hover:text-success duration-200 transition-colors"
            title="Impressum">
            <div class="pl-2 pr-2">Impressum</div>


          </Link>
        </div>

    </section>

  )
}
