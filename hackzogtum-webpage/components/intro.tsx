import Image from 'next/image'
import Link from 'next/link'
import ICAL from "ical.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhotoVideo, faInfoCircle, faCodeBranch, faAddressBook, faUserSecret, faPhone, faDoorOpen, faPerson, faCalendar, faUsd, faUser } from "@fortawesome/free-solid-svg-icons"; 
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';



export default function Intro() {
  // Debug-Modus: Setze auf true um Mock-Daten zu verwenden
  const DEBUG_MODE = false;

  // Mock-Daten für Testing
  const MOCK_DATA = {
    open: true,
    api: "0.13",
    sensors: {
      "in space": ["Alice", "Bob", "Charlie"]
    },
    next_open: ""
  };

  const MOCK_EVENT = {
    summary: "Test Hackathon",
    startDate: "15.12.2025, 19:00:00"
  };

  interface ResultDate  {
      summary: string;
      startDate: string;
      endDate: string;
  }

  function getFirstFutureReoccurance(vevent: any) : ResultDate{
    let startDates = new ICAL.RecurExpansion({
      component: vevent,
      dtstart: vevent.getFirstPropertyValue('dtstart')
    });
    let nextStartDate = startDates.next();

    let endDates = new ICAL.RecurExpansion({
      component: vevent,
      dtstart: vevent.getFirstPropertyValue('dtend')
    });
    let nextEndDate = endDates.next();


    while(Date.parse(nextEndDate.toString()) < Date.now()){
      nextStartDate = startDates.next()
      nextEndDate = endDates.next()
    }
    return {
      summary: vevent.getFirstPropertyValue('summary'),
      startDate: nextStartDate.toString(),
      endDate: nextEndDate.toString() 
    };
  }


  const [nextEvent, setNextEvent] = useState<{summary: string, startDate: string}| null>(null);
  useEffect(() => {
    if (DEBUG_MODE) {
      console.log('🔧 DEBUG MODE: Using mock event data');
      setNextEvent(MOCK_EVENT);
      return;
    }

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
            startDate: e.getFirstPropertyValue('dtstart').toString(),
            endDate: e.getFirstPropertyValue('dtend').toString()
          };
        })
        .filter((e: ResultDate) => {
          return Date.parse(e.endDate) > Date.now()
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
  }, []);

  const [data, setData] = useState<{
    open: any; api: string, sensors: any, next_open: string
} | null>(null);

  useEffect(() => {
    if (DEBUG_MODE) {
      console.log('🔧 DEBUG MODE: Using mock space data');
      setData(MOCK_DATA);
      return;
    }

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
    <section className="header-section">
      <a className="hiddenLink" rel="me" href="https://chaos.social/@Hackzogtum">Mastodon</a>
      
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo">
          <Link href="/" title="Home" className="logo-link">
            <Image
              src={data != null && data?.open ? '/images/open.gif' : '/images/logo.png'}
              alt="Logo of hackzogtum"
              width={280}
              height={150}
              priority
            />
          </Link>
        </div>

        {/* Status & Info Section */}
        {data && (
          <div className='header-info'>
            {/* Space Status */}
            <div className="status-card">
              <div className="status-item">
                <FontAwesomeIcon icon={faDoorOpen} className="status-icon" />
                <span>Die Space Tür ist </span>
                <span className={`status-badge ${data.open ? 'status-open' : 'status-closed'}`}>
                  {data.open ? 'offen' : 'geschlossen'}
                </span>
              </div>

              {data.open && (
                <div className="status-item">
                  <FontAwesomeIcon icon={faPhone} className="status-icon" />
                  <span>Call our canphone: </span>
                  <a href="tel:+49221596192432" className="phone-link">
                    +49221596192432
                  </a>
                </div>
              )}

              {/* People Present */}
              {data.open && (
                <div className="status-item">
                  <FontAwesomeIcon icon={faUser} className="status-icon" />
                  <span>Anwesend: </span>
                  <div className="inline-flex flex-wrap gap-1">
                    {data.sensors["in space"].map((item: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => (
                      <span className="person-badge" key={index}>
                        {item}{index !== data.sensors["in space"].length - 1 && ','}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Event */}
              {nextEvent && (
                <div className="status-item">
                  <FontAwesomeIcon icon={faCalendar} className="status-icon" />
                  <span>Nächstes Event: </span>
                  <span className="event-title">{nextEvent.summary}</span>
                  <span className="event-date"> am {nextEvent.startDate} Uhr</span>
                </div>
              )}

              <a href="https://cumulus.hackzogtum-coburg.de/apps/calendar/p/YdJDi9ik8jRABobq" 
                 className="calendar-link" target="_blank" rel="noopener noreferrer">
                → Eventkalender
              </a>
            </div>
          </div>
        )}


        {/* Navigation */}
        <nav className="header-nav">
          <Link href="/info" className="nav-link" title="Info">
            Wer sind wir
          </Link>
          <Link href="/kontakt" className="nav-link" title="Kontakt">
            Kontakt
          </Link>
          <Link href="/impressum" className="nav-link" title="Impressum">
            Impressum
          </Link>
        </nav>
      </div>
    </section>

  )
}
