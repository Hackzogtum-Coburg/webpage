import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhotoVideo, faInfoCircle, faCodeBranch, faAddressBook, faUserSecret } from "@fortawesome/free-solid-svg-icons"; 
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';



export default function Intro() {

  const [data, setData] = useState<{ api: string, sensors: any } | null>(null);

  useEffect(() => {
    fetch('https://spaceapi.hackzogtum-coburg.de/')
      .then((response) => response.json())
      .then((data) => {
        // Hier kannst du mit den API-Daten arbeiten
        console.log(data);
        // Setze den API-Rückgabewert in einen State, um ihn in der Komponente anzuzeigen
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
          src="/images/logo.png"
          alt="Picture of the author"
          width={280}
          height={150}
        />
        </div>
      </h1>


      {data && (
        <div>
          {data.sensors["in space"].map((item: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => (
            <h1 key={index}>{item}</h1>
          ))}
        </div>
      )}


      <h4 className="menuBtns">
        <div className="btnCluster">
          {' '}
          <Link href="/">
            <a className="underline hover:text-success duration-200 transition-colors"
            title="Home">
              <div className="btn-menu">
              <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
              </div>
            </a>
          </Link>

          {' '}
          <Link href="/media">
            <a className="underline hover:text-success duration-200 transition-colors"
            title="Media">
              <div className="btn-menu">
              <FontAwesomeIcon icon={faPhotoVideo}></FontAwesomeIcon>
              </div>
            </a>
          </Link>
        </div>

        <div className="btnCluster">
          {' '}
          <Link href="/info">
            <a className="underline hover:text-success duration-200 transition-colors"
            title="Info">
              <div className="btn-menu">
              <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
              </div>
            </a>
          </Link>

          {' '}
          <Link href="/kontakt">
            <a className="underline hover:text-success duration-200 transition-colors"
            title="Kontakt">
              <div className="btn-menu">
              <FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>
              </div>
            </a>
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
          <Link href="/impressum">
            <a className="underline hover:text-success duration-200 transition-colors"
            title="Impressum">
              <div className="btn-menu">
              <FontAwesomeIcon icon={faUserSecret}></FontAwesomeIcon>
              </div>
            </a>
          </Link>
        </div>
      </h4>
    </section>
  )
}
