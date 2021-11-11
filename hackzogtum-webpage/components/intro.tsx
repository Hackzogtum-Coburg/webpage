import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhotoVideo, faInfoCircle, faCodeBranch, faAddressBook, faUserSecret } from "@fortawesome/free-solid-svg-icons"; 

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 headBorder">
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
      <h4 className="menuBtns">
        <div className="btnCluster">
          {' '}
          <Link href="/">
            <a className="underline hover:text-success duration-200 transition-colors">
              <div className="btn-menu">
              <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
              </div>
            </a>
          </Link>

          {' '}
          <Link href="/media">
            <a className="underline hover:text-success duration-200 transition-colors">
              <div className="btn-menu">
              <FontAwesomeIcon icon={faPhotoVideo}></FontAwesomeIcon>
              </div>
            </a>
          </Link>
        </div>

        <div className="btnCluster">
          {' '}
          <Link href="/info">
            <a className="underline hover:text-success duration-200 transition-colors">
              <div className="btn-menu">
              <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
              </div>
            </a>
          </Link>

          {' '}
          <Link href="/kontakt">
            <a className="underline hover:text-success duration-200 transition-colors">
              <div className="btn-menu">
              <FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>
              </div>
            </a>
          </Link>
        </div>

        <div className="btnCluster">
          {' '}
          <a href="https://github.com/Hackzogtum-Coburg" className="underline hover:text-success duration-200 transition-colors" target="_blank" rel="noreferrer">
            <div className="btn-menu">
            <FontAwesomeIcon icon={faCodeBranch}></FontAwesomeIcon>
            </div>
          </a>

          {' '}
          <Link href="/impressum">
            <a className="underline hover:text-success duration-200 transition-colors">
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
