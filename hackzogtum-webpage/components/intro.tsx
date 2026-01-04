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
      "in space": ["Alice", "Bob", "Eve"]
    },
    next_open: ""
  };

  const MOCK_EVENT : ResultDate[] = [{
    summary: "Test Hackathon",
    startDate: "15.12.2025, 19:00:00",
    endDate: "15.12.2025, 20:00:00",
    link: "https://hackzogtum-coburg.de"
  },
  {
    summary: "Test HackathonHackathon",
    startDate: "15.12.2025, 19:00:00",
    endDate: "15.12.2025, 20:00:00",
    link: "https://hackzogtum-coburg.de"
  },
  {
    summary: "Test Hackathon",
    startDate: "15.12.2025, 19:00:00",
    endDate: "15.12.2025, 20:00:00",
    link: "https://hackzogtum-coburg.de"
  }];

  interface ResultDate  {
      summary: string;
      startDate: string;
      endDate: string;
      link: string | null;
  }

  function getFirstFutureReoccurances(vevent: any) : ResultDate | null{
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

    // Check if we have valid dates
    if (!nextStartDate || !nextEndDate) {
      return null;
    }

    //go up until we are in the future
    while(nextEndDate && Date.parse(nextEndDate.toString()) < Date.now()){
      nextStartDate = startDates.next()
      nextEndDate = endDates.next()
      
      // If we run out of recurrences, return null
      if (!nextStartDate || !nextEndDate) {
        return null;
      }
    }

    //create at least 3 results to be flatmapped in the caller
    let results = [];

    for(var i=0; i<3; i++) {
      results.push({
        summary: vevent.getFirstPropertyValue('summary'),
        link: getLink(vevent),
        startDate: nextStartDate.toString(),
        endDate: nextEndDate.toString() 
      });
      
      nextStartDate = startDates.next()
      nextEndDate = endDates.next()

      if (!nextStartDate || !nextEndDate) {
        break;
      }
    }

    return results;
  }

  function getLink(vevent: any) : string | null {
    return vevent.getFirstPropertyValue('description')
      ?.split(/\r?\n/)
      .find((l: string) => l.startsWith("http"))
      ?.trim()
  }
    

  const [nextEvents, setNextEvents] = useState<ResultDate[]|null>(null);
  useEffect(() => {
    if (DEBUG_MODE) {
      console.log('🔧 DEBUG MODE: Using mock event data');
      setNextEvents(MOCK_EVENT);
      return;
    }

    fetch('https://cumulus.hackzogtum-coburg.de/remote.php/dav/public-calendars/YdJDi9ik8jRABobq/?export')
      .then(response => response.text())
      .then(icsData => {
        // Use ical.js or a parser to read .ics
        const jcalData = ICAL.parse(icsData);
        const comp = new ICAL.Component(jcalData);
        const events = comp.getAllSubcomponents("vevent");

        setNextEvents(
          events.flatMap((e : any)=> {
            if(e.getFirstProperty('rrule')){
              return getFirstFutureReoccurances(e)
            }
            return [{
              summary: e.getFirstPropertyValue('summary'),
              link: getLink(e),
              startDate: e.getFirstPropertyValue('dtstart').toString(),
              endDate: e.getFirstPropertyValue('dtend').toString()
            }];
          })
          .filter((e: ResultDate | null): e is ResultDate => {
            return e !== null && Date.parse(e.endDate) > Date.now()
          })
          .sort((a : ResultDate,b : ResultDate) => {
            return Date.parse(a.startDate) - Date.parse(b.startDate)
          })
          .slice(0,3)
          .map((e: ResultDate) => {
            console.log(e);
            return {
              summary: e.summary,
              link: e.link,
              startDate: new Date(Date.parse(e.startDate.toString())).toLocaleString("de-DE"),
              endDate: new Date(Date.parse(e.endDate.toString())).toLocaleString("de-DE")
            };
          })
        );
      })
      .catch(err => { setNextEvents(null); console.error('Failed to load calendar:', err)});
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
                    +49 221 596 192 432
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
              { nextEvents && (
                <>
                  <div className="status-item">
                    <FontAwesomeIcon icon={faCalendar} className="status-icon" />
                    <div>
<a href="https://cumulus.hackzogtum-coburg.de/apps/calendar/p/YdJDi9ik8jRABobq" 
                 className="calendar-link" target="_blank" rel="noopener noreferrer">
                Eventkalender:
              </a>

                    </div>
                  </div>
                  <table >
                  <tbody>
                    {
                      nextEvents.map((e : ResultDate) => {
                          return (
                            <tr key={e.startDate}>

                              <td className="event-title">
                              {
                                e.link ? (
                                  <a href={e.link}>{e.summary}</a> 
                                ) : (
                                  e.summary
                                )
                              }
                              </td>
                              <td className="event-date">{e.startDate} Uhr</td>
                            </tr>
                          )
                        }
                      )
                    }
                  </tbody>
                  </table>
                </>
                )
              }
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
