import Image from 'next/image'

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
          <a href="/" className="underline hover:text-success duration-200 transition-colors">
            <div className="btn-menu"></div>
          </a>

          {' '}
          <a href="/media" className="underline hover:text-success duration-200 transition-colors">
            <div className="btn-menu"></div>
          </a>
        </div>

        <div className="btnCluster">
          {' '}
          <a href="/info" className="underline hover:text-success duration-200 transition-colors">
            <div className="btn-menu"></div>
          </a>

          {' '}
          <a href="/kontakt" className="underline hover:text-success duration-200 transition-colors">
            <div className="btn-menu"></div>
          </a>
        </div>

        <div className="btnCluster">
          {' '}
          <a href="https://github.com/Hackzogtum-Coburg" className="underline hover:text-success duration-200 transition-colors">
            <div className="btn-menu"></div>
          </a>

          {' '}
          <a href="/impressum" className="underline hover:text-success duration-200 transition-colors">
            <div className="btn-menu"></div>
          </a>
        </div>
      </h4>
    </section>
  )
}
